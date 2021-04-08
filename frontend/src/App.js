import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
                    {/* Nota: "exact" Si url is exact to "/" render HomeScreen */}
                    <Route path="/" component={HomeScreen} exact></Route>
                    {/* Nota: The url colon parameter "/:id" get the "id" of products, this "id" is used in "ProductScreen" to evaluated "id" */}
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
