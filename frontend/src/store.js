import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers";

const initialState = {};

/*
    * Use without reducers need import "data.js" for return "state" = products.
    * STATE: before: "empty" => later: "products"
    * ACTION: type: "INIT"
    const reducer = (state, action) => {
        return { products: data.products };
    };
*/

//? Redux store from "reducers"
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

//? "composeEnhancer" update default "compose()" function , to show redux "store".
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
