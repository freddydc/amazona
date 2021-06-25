import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

/* ==> ( Product List ) <== API */
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

/* ==> ( Seed Products ) <== API */
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

/* ==> ( Product Details ) <== API
? Input Parameter: ( /:id ) used by findById( ):
*  Response promise set ( await ).
*/
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found Mongo" });
    }
  })
);

/* ==> ( Create Product ) <== API */
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: `Some name ${Date.now()}`,
      image: "/images/camera-p1.jpg",
      price: 0,
      category: "Some category",
      brand: "Some brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "Some description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

export default productRouter;
