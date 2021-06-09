import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();

/* ==> ( Middleware ) <==
TODO: - Learn express ( GET and POST ) method.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==> ( Before Mongodb ) <==
? - Url: ( /:id ) for ( req.params.id ) by user ( input ).
* - Product data is used by ( actions and reducers )
*    - for ( product list and details ).

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  * - Check ( product ).
  if (product) {
    res.send(product);
  } else {
    * - Create custom error ( message ).
    res.status(404).send({ message: "Product Not Found" });
  }
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
*/

/* ==> ( Mongoose ) <==
* - First parameter URL: 'mongodb://localhost/amazona'
TODO: - Learn second parameter options:
* - Use-New-Url-Parser: true ==> for get ( warnings )
*    - for duplicates in mongodb collection.
*/
const { MONGODB_HOSTNAME, MONGODB_PORT, MONGO_DB } = process.env;
const urlMongodb = `mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGO_DB}`;
const optMongodb = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.connect(urlMongodb || "mongodb://localhost/amazona", optMongodb);

/* ==> ( Routers ) <== */
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

/* ==> ( Middleware ) <==
? - Send error message to ( Front Client ) for
?    - view all errors generated in routers by ( Middleware ) catcher.
TODO: - Test key name ( message ).
*/
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
