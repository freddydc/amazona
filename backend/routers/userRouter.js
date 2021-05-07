import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

/*
? NOTA:
* Get method create '/seed' API & Create two users sample.
? To get errors message use: 'express-async-handler' library.
* Express Async Handler: send errors messages to 'middleware' error catcher in server.
TODO: 'Learn' because mongoose operation: use 'async' function.
? User insertMany(): accept an array collection.
? NOTA: 'createdUsers' = insert users data collection in mongodb.
TODO: 'Learn' remove old mongodb data using:
* await User.remove({});
*/

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
  // async (req, res) => {
  //   const createdUsers = await User.insertMany(data.users);
  //   res.send({ createdUsers });
  // }
);

export default userRouter;
