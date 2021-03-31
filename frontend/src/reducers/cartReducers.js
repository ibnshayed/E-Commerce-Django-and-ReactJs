
import { ADD_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM } from './../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }
    
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
  
    default:
      return state;
  }
}