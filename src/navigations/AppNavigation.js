import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomerLogin from '../scenes/CustomerLogin';
import CustomerHome from '../scenes/CustomerHome';
import CustomerSignUp from '../scenes/CustomerSignUp';
import LaundryServices from '../scenes/LaundryServices';
import DriverLogin from '../scenes/DriverLogin';
import CustomerForgotPassword from '../scenes/CustomerForgotPassword';
import CustomerOrderHistory from '../scenes/CustomerOrderHistory';
import LaundryServiceDetails from '../scenes/LaundryServiceDetails';
import {Drawer} from '../components/Drawer';
import CustomerOrderDetails from '../scenes/CustomerOrderDetails';
import CreatePassword from '../scenes/CreatePassword';
import CustomerAddAddress from '../scenes/CustomerAddAddress';
import CustomerChangePassword from '../scenes/CustomerChangePassword';
import CustomerTrackOrder from '../scenes/CustomerTrackOrder';
import CustomerViewProfile from '../scenes/CustomerViewProfile';
import CustomerOrderBasket from '../scenes/CustomerOrderBasket';
import CustomerPickAndDropOrder from '../scenes/CustomerPickAndDropOrder';
import CustomerOrderReview from '../scenes/CustomerOrderReview';
import CustomerLegal from '../scenes/CustomerLegal';
import CustomerPaymentDetails from '../scenes/CustomerPaymentDetails';
import CustomerPaymentDone from '../scenes/CustomerPaymentDone';
import FlashMessage from 'react-native-flash-message';
import DriverOrders from '../scenes/DriverOrders';
import CreditCardsListing from '../scenes/CreditCardsListing';
import AddressListing from '../scenes/AddressListing';
import DriverOrderDetail from '../scenes/DriverOrderDetail';
import CustomerMakePayment from '../scenes/CustomerMakePayment';
import TermsAndPrivacy from '../scenes/TermsAndPrivacy';
import OnBoarding from '../scenes/OnBoarding';

import storage from '../redux/utils/storage';
import DriverSignUp from '../scenes/DriverSignUp';

const initialRouteName = 'CustomerLogin';
// const initialRouteName = 'DriverLogin';

storage.setData('routeName', initialRouteName).then(() => {});

const AuthNavigation = createStackNavigator(
  {
    CustomerSignUp: {
      screen: CustomerSignUp,
    },
    DriverSignUp: {
      screen: DriverSignUp,
    },
    CustomerLogin: {
      screen: CustomerLogin,
    },
    CustomerForgotPassword: {
      screen: CustomerForgotPassword,
    },
    DriverLogin: {
      screen: DriverLogin,
    },
    CreatePassword: {
      screen: CreatePassword,
    },
    TermsAndPrivacy: {
      screen: TermsAndPrivacy,
    },
    OnBoarding: {
      screen: OnBoarding,
    },
  },
  {
    initialRouteName: initialRouteName,
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const CustomerHomeStack = createStackNavigator(
  {
    CustomerHome: {
      screen: CustomerHome,
    },
    LaundryServices: {
      screen: LaundryServices,
    },
    CustomerOrderHistory: {
      screen: CustomerOrderHistory,
    },
    CustomerOrderDetails: {
      screen: CustomerOrderDetails,
    },
    LaundryServiceDetails: {
      screen: LaundryServiceDetails,
    },
    CustomerAddAddress: {
      screen: CustomerAddAddress,
    },
    CustomerChangePassword: {
      screen: CustomerChangePassword,
    },
    CustomerTrackOrder: {
      screen: CustomerTrackOrder,
    },
    CustomerViewProfile: {
      screen: CustomerViewProfile,
    },
    CustomerOrderBasket: {
      screen: CustomerOrderBasket,
    },
    CustomerPickAndDropOrder: {
      screen: CustomerPickAndDropOrder,
    },
    CustomerOrderReview: {
      screen: CustomerOrderReview,
    },
    CustomerLegal: {
      screen: CustomerLegal,
      params: {title: 'Terms & Conditions'},
    },
    CustomerPaymentDetails: {
      screen: CustomerPaymentDetails,
    },
    CustomerPaymentDone: {
      screen: CustomerPaymentDone,
    },
    CreditCardsListing: {
      screen: CreditCardsListing,
    },
    AddressListing: {
      screen: AddressListing,
    },
    CustomerMakePayment: {
      screen: CustomerMakePayment,
    },
  },
  {
    initialRouteName: 'CustomerHome',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const DriverHomeStack = createStackNavigator(
  {
    DriverOrders: {
      screen: DriverOrders,
    },
    DriverOrderDetail: {
      screen: DriverOrderDetail,
    },
    CustomerOrderDetails: {
      screen: CustomerOrderDetails,
    },
  },
  {
    initialRouteName: 'DriverOrders',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const CustomerDrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: CustomerHomeStack,
    },
    OrderHistory: {
      screen: CustomerOrderHistory,
    },
    DeliveryAddress: {
      screen: CustomerAddAddress,
    },
    PaymentSetting: {
      screen: CustomerPaymentDetails,
    },
    FAQs: {
      screen: CustomerLegal,
      params: {title: 'FAQs'},
    },
    ContactUs: {
      screen: CustomerOrderHistory,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: (props) => <Drawer {...props} />,
  },
);

const Navigation = createSwitchNavigator(
  {
    Auth: {
      screen: AuthNavigation,
    },
    Customer: {
      screen: CustomerDrawerStack,
    },
    Driver: {
      screen: DriverHomeStack,
    },
    Profile: {
      screen: CustomerViewProfile,
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

export const AppContainer = createAppContainer(Navigation);

export const App = () => {
  return (
    <React.Fragment>
      <AppContainer />
      <FlashMessage position="top" />
    </React.Fragment>
  );
};
