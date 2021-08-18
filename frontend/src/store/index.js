import {combineReducers, createStore, applyMiddleware} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {createLogger} from 'redux-logger';
// reducers

import {
  categoryReducer,
  locationReducer,
  authReducer,
  serviceReducer,
  faqReducer,
  voucherReducer,
  orderReducer,
  driverReducer,
  profileReducer,
} from './reducers';

import {HttpService} from './services/HttpService';
import {AuthTypes} from './action-types/AuthTypes';

// epics
import {
  CategoryEpics,
  LocationEpics,
  AuthEpics,
  ServiceEpics,
  FaqEpics,
  VoucherEpics,
  OrderEpics,
  DriverEpics,
} from './epics';
import {RefreshTokenService} from './services/RefreshTokenService';
import {hist} from '../routes';

const loggerMiddleware = createLogger();
// Application Reducers
const appReducer = combineReducers({
  category: categoryReducer,
  location: locationReducer,
  auth: authReducer,
  service: serviceReducer,
  faq: faqReducer,
  voucher: voucherReducer,
  order: orderReducer,
  driver: driverReducer,
  profile: profileReducer,
});
const rootReducer = (state, action) => {
  if (action.type === AuthTypes.SIGNOUT_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootEpic = combineEpics(
  // more epics functions go here
  AuthEpics.signin,
  AuthEpics.signup,
  AuthEpics.getNewAccessToken,
  AuthEpics.getAllUsers,
  AuthEpics.resetPassword,
  AuthEpics.editProfile,
  AuthEpics.stripeConnect,

  CategoryEpics.getCategories,
  CategoryEpics.addCateogry,
  CategoryEpics.editCateogry,
  CategoryEpics.delCateogry,

  OrderEpics.getOrders,
  OrderEpics.getOrder,
  OrderEpics.postOrder,
  OrderEpics.editOrder,
  OrderEpics.updateOrderStatus,
  OrderEpics.getCSVData,
  OrderEpics.getLov,
  OrderEpics.getAddresses,
  OrderEpics.cancelOrder,
  OrderEpics.checkSelectedDropoffSlot,
  OrderEpics.checkSelectedPickupSlot,

  LocationEpics.getLocations,
  LocationEpics.addLocation,
  LocationEpics.editLocation,
  LocationEpics.delLocation,

  ServiceEpics.getServices,
  ServiceEpics.getServicesByCategory,
  ServiceEpics.addService,
  ServiceEpics.editService,
  ServiceEpics.delService,

  FaqEpics.getFaqs,
  FaqEpics.addFaq,
  FaqEpics.editFaq,
  FaqEpics.delFaq,

  DriverEpics.getDrivers,
  DriverEpics.addDriver,
  DriverEpics.editDriver,
  DriverEpics.delDriver,
  DriverEpics.getDriverHistory,

  VoucherEpics.getVouchers,
  VoucherEpics.addVoucher,
  VoucherEpics.editVoucher,
  VoucherEpics.delVoucher,
);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    ajaxGet: HttpService.get,
    ajaxPost: HttpService.post,
    ajaxPut: HttpService.put,
    ajaxDel: HttpService.delete,
    getRefreshToken: RefreshTokenService.getRefreshToken,
    history: hist,
  },
});
// eslint-disable-next-line no-undef
let middlewares =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(epicMiddleware)
    : applyMiddleware(epicMiddleware, loggerMiddleware);
const createStoreWithMiddleware = middlewares;

export let store = createStore(rootReducer, createStoreWithMiddleware);
epicMiddleware.run(rootEpic);
