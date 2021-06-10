import SeamlessImmutable from 'seamless-immutable';
import storage from '../../redux/utils/storage';

const INITIAL_STATE = SeamlessImmutable({
  cart: [],
});

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CART_SUCCEEDED':
      return {
        ...state,
        cart: action.cart,
      };
    case 'ADD_ALL_ITEMS_TO_CART':
      const updatedCart = state.cart.concat({
        ...action.product,
        quantity: action.quantity,
      });
      storage.updateCart(updatedCart);
      action.onSuccess && action.onSuccess();
      return {
        ...state,
        cart: updatedCart,
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cart;
