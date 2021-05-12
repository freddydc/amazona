import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

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

export default userRouter;
