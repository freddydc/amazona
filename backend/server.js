import express from "express";
import data from "./data.js";
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/products/:id", (req, res) => {
    //? Nota: "/:id" for "req.params.id", to user "input".
    //* The "product" is received in reducers "Product Details".
    const product = data.products.find((x) => x._id === req.params.id);

    //? Check "product" exist
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

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
