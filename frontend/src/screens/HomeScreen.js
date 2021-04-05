import React from "react";
import Product from "../components/Product";
import data from "../data";

export default function HomeScreen() {
    return (
        <div className="row center">
            {data.products.map((my_product) => (
                <Product
                    key={my_product._id}
                    set_product={my_product}
                ></Product>
            ))}
        </div>
    );
}
