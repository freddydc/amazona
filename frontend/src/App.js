import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { listProductCategories } from "./actions/productActions";
import { signOut } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import SearchBox from "./components/SearchBox";
import SellerRoute from "./components/SellerRoute";
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
import SearchScreen from "./screens/SearchScreen";
import SellerScreen from "./screens/SellerScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";

/* ==> ( Route ) <== TAG
? Field: < Route exact > if url is EXACT to path ( / ) render HOME SCREEN.
* Path: ( /cart/:id? ) last mark ( ? ) in ( /:id? ) show:
?  localhost:3000/cart/3?qty=8 CART SCREEN.
*/
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  // console.log(`cart items: ${cartItems.length} ${cartItems}`); //! info.

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              magazine
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            {/* ( BADGE ADD CART ) show quantity ICON */}
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
            {/* ==> ( SELLER MENU ) <== */}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/product-list/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/order-list/seller">Orders</Link>
                  </li>
                </ul>
              </div>
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
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li className="sidebar-header">
              <span>
                <strong>Categories</strong>
              </span>
              <div>
                <button
                  type="button"
                  className="close-sidebar"
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </li>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <Link
                  key={c}
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <li className="sidebar-content">
                    <span>{c}</span>
                    <span>
                      <i className="fas fa-angle-right"></i>
                    </span>
                  </li>
                </Link>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
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
          <Route
            path={`/search/name/:name?`}
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path={`/search/category/:category`}
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path={`/search/category/:category/name/:name`}
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path={`/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber`}
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path={"/map"} component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/product-list"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/product-list/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/order-list"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/user-list" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path={"/dashboard"}
            component={DashboardScreen}
          ></AdminRoute>
          <SellerRoute
            path="/product-list/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/order-list/seller"
            component={OrderListScreen}
          ></SellerRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
