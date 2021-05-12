import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 5000;

/*
? Nota: Mongoose Connection.
* first param database URL: 'mongodb://localhost/amazona'

TODO: Learn second param for options:
* useNewUrlParser: true = for get 'warnings',
* for duplicates in mongodb collection.
*/

/*
app.get("/api/products/:id", (req, res) => {
  ? Nota: (/:id) for (req.params.id), to user (input).
  * The (product) is received in actions and reducers folder,
  * ... for (product List and Details) in Action and Reducer.

  const product = data.products.find((x) => x._id === req.params.id);

  * Check (product) exist
  if (product) {
    res.send(product);
  } else {
    * Create custom (message) for error
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
*/

const urlMongodb = "mongodb://mongodb:27017/amazona";
const optMongodb = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URL || urlMongodb, optMongodb);

//* Response a router from (routers folder).
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

/*
? Nota: Send message error to (front).
* Show (error) messages from (routers folder), 
* ... (middleware) error catcher.
TODO: Try the message error key (name).
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
