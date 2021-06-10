import {combineReducers} from 'redux';
import auth from './authReducer';
import products from './productReducer';
import cart from './cartReducer';
import order from './orderReducer';
import user from './userReducer';
import address from './addressReducer';
import coupon from './couponReducer';
import payment from './paymentsReducer';

const allReducers = combineReducers({
  auth,
  products,
  cart,
  order,
  user,
  address,
  coupon,
  payment
});

export default allReducers;
