import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 5000;

/*
? NOTA: Mongoose Connection.
* first param database URL: 'mongodb://localhost/amazona'
TODO: 'Learn' second param for options:
* 'useNewUrlParser: true' = get 'warnings' for duplicates in mongodb collection.
*/

const mongodbUrl = "mongodb://mongodb:27017/amazona";

mongoose.connect(process.env.MONGODB_URL || mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/api/products/:id", (req, res) => {
  /*
  ? NOTA: "/:id" for "req.params.id", to user "input".
  * The "product" is received in reducers "Product Details".
  */

  const product = data.products.find((x) => x._id === req.params.id);

  //* Check "product" exist
  if (product) {
    res.send(product);
  } else {
    //* Create custom "message" for error
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//* Responses to router from 'routers', for 'User Router' in mongodb.

app.use("/api/users", userRouter);

/*
? NOTA: Send message error to client.
* Show 'error messages' from 'routers' UserRouter, 'middleware' error catcher.
TODO: Try the message error key 'name'.
*/

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
