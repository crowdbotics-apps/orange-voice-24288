import {all} from 'redux-saga/effects';
import {
  watchSignIn,
  watchForgotPassword,
  watchSignUp,
  watchSocialSignIn,
  watchUpdatePlayerId,
  watchDriverSignUp,
  watchSignOut,
} from './authSaga';
import {
  watchFetchAllCategories,
  watchFetchAllServices,
  watchFetchAllFAQs,
  watchFetchFAQsById,
  watchFetchAllLovs,
} from './productSaga';
import {
  watchFetchCart,
  watchAddToCart,
  watchChangeQuantity,
  watchRemoveItem,
  watchClear,
} from './cartSaga';
import {
  watchOrderDetails,
  watchFetchOrderDetails,
  watchFetchAllOrders,
  watchFetchOrderHistory,
  watchFetchOrderById,
  watchSaveUserOrder,
  watchCancelOrder,
  watchMakeOrderPayment,
  watchFetchAllAcitveOrders,
  watchUpdateSavedUserOrder,
  watchFetchAllDriverTasks,
  watchUpdateTaskStatus,
  watchValidateOrderTimeSlot,
  watchNotifyUserProgress,
} from './orderSaga';
import {
  watchResetUserPassword,
  watchFetchUserProfile,
  watchUpdateUserProfile,
  watchGetDriverSignUp,
} from './userSaga';
import {
  watchFetchUserAddress,
  watchUpdateUserAddress,
  watchSaveUserAddress,
  watchDeleteUserAddress,
} from './addressSaga';
import {
  watchFetchAllCoupons,
  watchFetchCouponById,
  watchValidateCoupon,
  watchClearCoupon,
  watchValidateCouponRefferal,
} from './couponSaga';
import {
  watchFetchAllCards,
  watchAddCard,
  watchDeleteCard,
} from './paymentsSaga';
import {watchFetchDomain} from './domainSaga';

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchForgotPassword(),
    watchFetchAllCategories(),
    watchFetchAllServices(),
    watchFetchCart(),
    watchAddToCart(),
    watchChangeQuantity(),
    watchRemoveItem(),
    watchClear(),
    watchFetchDomain(),
    watchOrderDetails(),
    watchFetchOrderDetails(),
    watchFetchUserProfile(),
    watchResetUserPassword(),
    watchUpdateUserProfile(),
    watchFetchUserAddress(),
    watchUpdateUserAddress(),
    watchSaveUserAddress(),
    watchFetchAllFAQs(),
    watchFetchFAQsById(),
    watchDeleteUserAddress(),
    watchFetchAllLovs(),
    watchFetchAllOrders(),
    watchFetchOrderHistory(),
    watchFetchOrderById(),
    watchSaveUserOrder(),
    watchFetchAllCoupons(),
    watchFetchCouponById(),
    watchValidateCoupon(),
    watchFetchAllCards(),
    watchAddCard(),
    watchDeleteCard(),
    watchCancelOrder(),
    watchMakeOrderPayment(),
    watchFetchAllAcitveOrders(),
    watchClearCoupon(),
    watchUpdateSavedUserOrder(),
    watchValidateCouponRefferal(),
    watchSocialSignIn(),
    watchFetchAllDriverTasks(),
    watchUpdateTaskStatus(),
    watchUpdatePlayerId(),
    watchValidateOrderTimeSlot(),
    watchNotifyUserProgress(),
    watchDriverSignUp(),
    watchGetDriverSignUp(),
    watchSignOut(),
  ]);
}
