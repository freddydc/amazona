import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
    return (
        <BrowserRouter>
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
                    {/*
                    //* Note: "exact", si url is exact to "/", render "HomeScreen"
                    //* Note: '/cart/:id?' the last '?' in '/:id?', for view "/cart/3?qty=8" in URL.
                    */}

                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route
                        path="/product/:id"
                        component={ProductScreen}
                    ></Route>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
