import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
    //* Initial default "products" data empty array
    //* Before "setProducts" set data to "products"
    const [products, setProducts] = useState([]);
    //? Console
    // console.log("products:", products, "\nsetProducts:", setProducts);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //* Two params, second "array" accept node dependencies
    useEffect(() => {
        const fecthData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/products");
                setLoading(false);
                //? Console
                // console.log("data:", data);
                setProducts(data);
            } catch (err) {
                //** Nota, err.message: "Request failed with status code 500"
                setError(err.message);
                setLoading(false);
            }
        };
        fecthData();
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map((my_product) => (
                        <Product
                            key={my_product._id}
                            set_product={my_product}
                        ></Product>
                    ))}
                </div>
            )}
        </div>
    );
}
