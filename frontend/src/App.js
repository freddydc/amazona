import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  //* Get access to the 'cart items' from redux store.
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //! Console
  console.log("cart items:", cartItems.length, cartItems);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              magazine
            </Link>
          </div>
          <div>
            {/* Badge cart add item, for view 'qty' icon */}
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          {/*
          //? Note: "exact", si url is exact to "/", render "HomeScreen"
          //? Note: '/cart/:id?' the last '?' in '/:id?', for view "localhost:3000/cart/3?qty=8" in URL.
          */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
