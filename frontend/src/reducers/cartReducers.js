import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

/* ==> (cart) actions <==
* ==> case: CART_ADD_ITEM <==
? ==> (make sure) item data.
* - Make sure if already the (item) exist in (cart-items).
* - (id = product): Make sure if already item (id)
*     is added into (cart-items).

? ==> if (exist-item) condition.
* - Already (exist-item) is has added into (cart-items).
* - Updating old (cart-items) data information
*     with new (item) data.
* - (cart-items): Not change any items only update
*     already exists (item).
* - (x = previous) and (item = new) value information.

? ==> else (exist-item) condition.
* - Item is new and not exist in (cart-items).
* - Inside: [...state.cartItems, item ] merge old (cart-items)
*     with new (item) data information.
* - Adding (new item) if (cart-items) is empty.

* ==> case: CART_REMOVE_ITEM <==
? - From (remove-from-cart) action defined get
*     an item with (id = action.payload) for remove.
*/
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //! Info.
      // console.log(`Exist item: ${existItem}`);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      /* Update previous state with payment method */
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
