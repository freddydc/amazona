import React from "react";
import Product from "./components/Product";
import data from "./data";

function App() {
    return (
        <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">
                        magazine
                    </a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign In</a>
                </div>
            </header>
            <main>
                <div className="row center">
                    {data.products.map((my_product) => (
                        <Product
                            key={my_product._id}
                            set_product={my_product}
                        ></Product>
                    ))}
                </div>
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
    );
}

export default App;
