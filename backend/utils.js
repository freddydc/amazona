import jwt from "jsonwebtoken";

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
