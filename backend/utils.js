import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "SecretKey",
    {
      expiresIn: "30d",
    }
  );
};

/* ==> ( User Authenticate Middleware ) <==
TODO: Learn next() usage on middleware.
*/
export const isAuth = (req, res, next) => {
  //? Set authorization fields by headers request.
  const authorization = req.headers.authorization;
  if (authorization) {
    /*
    ? - Get authorization that start on 7 index = ("Bearer 7xx...") format.
    */
    const token = authorization.slice(7, authorization.length);
    /* ==> Decrypt User Token <== decode = contain user token data */
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        /* By ( Order Router ) request, user data is get */
        req.user = decode;
        next(); //? Pass user request data to next middleware.
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
