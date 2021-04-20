import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      /*
      ? Note:
      * Make sure if already the 'item' exist in 'cart items'
      * 'id' = product: Make sure if already Item 'id' added into 'cart items'.
      */
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //! Console
      console.log("existItem:", existItem);

      //* If already item has added into cart items.
      if (existItem) {
        /*
        ? Note:
        * Updating 'cartItems' with new 'item'.
        ? cartItems: Not change any items, only updated already exists 'item'.
        * "x" previous value & "item" new value.
        */
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        /*
        ? Note:
        * If item is 'new' and not exist in cart items.
        ? Inside [ ...state.cartItems, item ], merge: 'cartItems' & 'item'.
        * Adding new 'item' to empty 'cart items'.
        */
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
