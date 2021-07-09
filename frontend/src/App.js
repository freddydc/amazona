import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import UserListScreen from "./screens/UserListScreen";

/* ==> ( Route ) <== tag
? - Field: < Route exact > if url is EXACT to path ( / ) render ( HOME SCREEN ).
* - Path: ( /cart/:id? ) last mark ( ? ) in ( /:id? ) to show:
?    localhost:3000/cart/3?qty=8 ( CART SCREEN ) in browser.
*/
function App() {
  //? ==> Get access to ( DATA INFORMATION ) from ( REDUX STORE ).
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(`cart items: ${cartItems.length} ${cartItems}`); //! info.

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
            {/* ( BADGE ADD TO CART ) to show quantity ICON */}
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {/* ==> ( USER MENU ) <== */}
            {userInfo ? (
              <div className="dropdown">
                {/* Name */}
                <Link to="#">
                  {userInfo.name} <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* Profile */}
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  {/* Order History */}
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  {/* Sign-Out */}
                  <li>
                    <Link to="#signout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              /* Sign-In */
              <Link to="/signin">Sign In</Link>
            )}
            {/* ==> ( ADMIN MENU ) <== */}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/product-list">Products</Link>
                  </li>
                  <li>
                    <Link to="/order-list">Orders</Link>
                  </li>
                  <li>
                    <Link to="/user-list">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/product-list"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/order-list"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path="/user-list" component={UserListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
