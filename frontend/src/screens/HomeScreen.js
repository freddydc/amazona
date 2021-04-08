import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
    const dispatch = useDispatch();
    //? Get "productList" data from redux "src/store.js"
    const productList = useSelector((state) => state.productList);
    //* "loading", "error", "products", to get data from "store.js".
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

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
