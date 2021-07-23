import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

/* ==> ( Middleware ) <== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ( Sample )
? Url: ( /:id ) for Request Params Id by user input.
* Product data used in actions, reducers by product List and Details.

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
*/

/* ==> ( Mongoose ) <==
? Use New Url Parser: true, for get duplicates WARNINGS in collection.
TODO: Test second field for options.
*/
const mongodbOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/amazona",
  mongodbOpt
);

/* ==> ( Screen Router ) <== */
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

/* ==> ( Upload Router ) <== */
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

/* ==> ( Middleware Catcher ) <==
? Send message to Front for show all errors generated in routers.
*/
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
