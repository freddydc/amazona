import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

/* ==> tag <Route> <==
? - <Route exact> if url is exact to (/) render (Home-Screen).
* - (/cart/:id?) the last (?) in (/:id?) for view
*     (localhost:3000/cart/3?qty=8) on browser (Cart-Screen).
*/
function App() {
  //? ==> Get access to (data info it contain) by (redux-store).
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //! info.
  // console.log(`cart items: ${cartItems.length} ${cartItems}`);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

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
            {/* (Badge-Add-Cart-Item) for show quantity (icon) */}
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                {/* User Name Menu */}
                <Link to="#">
                  {userInfo.name} <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* Sign-Out Menu */}
                  <li>
                    <Link to="#signout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              //? ==> Sign-In Menu.
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
