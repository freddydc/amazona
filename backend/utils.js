import jwt from "jsonwebtoken";
import mg from "mailgun-js";

/* ==> ( TOKEN GENERATOR ) <== */
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || "SecretKey",
    {
      expiresIn: "30d",
    }
  );
};

/* ==> ( USER AUTHENTICATION ) <== middleware */
export const isAuth = (req, res, next) => {
  //* ==> AUTHORIZATION from HEADERS request.
  const authorization = req.headers.authorization;
  if (authorization) {
    /* ( TOKEN )
    ? - Get user ( token ) authorization starting at seventh index:
    *    For this format: "Bearer 7token...".
    */
    const token = authorization.slice(7, authorization.length);
    /* ( DECRYPT TOKEN )
    * - Fields:
    ?    decode: Contain user token information.
    */
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        /* ( USER REQUEST )
        ? - For the USER request data is received in ( ORDER ROUTER ).
        * - next( ): Pass USER request data to next middleware.
        TODO: Learn the next( ) usage in middleware.
        */
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

/* ==> ( Admin ) <== MIDDLEWARE */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //? ==> Pass the request to the next MIDDLEWARE.
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

/* ==> ( Seller Or Admin ) <== MIDDLEWARE */
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Or Seller Token" });
  }
};

/* ==> ( Mailgun ) <== API */
export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  const emailTemplate = `
    <h1>THANKS FOR SHOPPING WITH US</h1>
    <p>Hi ${order.user.name}, We have finished processing your order.</p>
    <h2>
      Order: ${order._id.toString().substring(0, 8)} ( ${order.createdAt
    .toString()
    .substring(0, 10)} )
    </h2>
    <table>
      <thead>
        <tr>
          <td>
            <strong>PRODUCT</strong>
          </td>
          <td>
            <strong>QUANTITY</strong>
          </td>
          <td align="right">
            <strong>PRICE</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        ${order.orderItems
          .map(
            (item) => `
              <tr>
                <td>${item.name}</td>
                <td align="center">${item.qty}</td>
                <td align="right">$${item.price.toFixed(2)}</td>
              </tr>
            `
          )
          .join("\n")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Items price:</td>
          <td align="right">$${order.itemsPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Tax price:</td>
          <td align="right">$${order.taxPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Shipping price:</td>
          <td align="right">$${order.shippingPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2">Payment method:</td>
          <td align="right">${order.paymentMethod}</td>
        </tr>
        <tr>
          <td colspan="2">
            <strong>Total price:</strong>
          </td>
          <td align="right">
            <strong>$${order.totalPrice.toFixed(2)}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
    <h2>Shipping Address</h2>
    <p>
      Name: ${order.shippingAddress.fullName} <br />
      Address: ${order.shippingAddress.address} <br />
      City: ${order.shippingAddress.city} <br />
      Country: ${order.shippingAddress.country} <br />
      Postal Code: ${order.shippingAddress.postalCode}
    </p>
    <hr />
    <p>Thanks for shopping with us.</p>
  `;
  return emailTemplate;
};
