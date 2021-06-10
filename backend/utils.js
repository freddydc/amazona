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

/* ==> ( Authenticate User Request Middleware ) <==
TODO: - Learn next() usage in middleware.
*/
export const isAuth = (req, res, next) => {
  //? - Fields authorization by headers request.
  const authorization = req.headers.authorization;
  if (authorization) {
    /*
    ? - Get authorization ( token ) that start in 7 index for this format:
    ?    - ("Bearer 7xx...").
    */
    const token = authorization.slice(7, authorization.length);
    /* ==> ( Decrypt User Token ) <==
    ? - ( decode ) = contain user ( token ) data.
    */
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        //* - For the ( Order Router ) request user data is get.
        req.user = decode;
        next(); //? - Pass user request data to next middleware.
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
