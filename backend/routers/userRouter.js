import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

/*
? Nota:
* Get method create (/seed) API and create two (users) sample.
? For get errors message use: (express-async-handler) library.

* Express Async Handler: send errors messages to (middleware),
* ... defined in (server file) error catcher.

TODO: Learn because mongoose operation: use 'async' function.
? User insertMany(): accept an (array) collection.

* Nota: (createdUsers) = insert (users data) collection in mongodb.

TODO: Learn remove (old) mongodb data using:
* ... await User.remove({});
*/

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    //* Compare email in mongodb.
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;
