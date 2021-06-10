import AsyncStorage from '@react-native-async-storage/async-storage';
import {some, isUndefined} from 'lodash';

const USER_CREDENTIALS = 'USER_CREDENTIALS';
const APPLE_CREDENTIALS = 'APPLE_CREDENTIALS';
const CUSTOMER_CART = 'CUSTOMER_CART';
const PLACE_ORDER_DETAILS = 'PLACE_ORDER_DETAILS';
const ORDER_RESPONSE = 'ORDER_RESPONSE';
const SET_DRIVER_DATA = 'SET_DRIVER_DATA';

const isProfileCompleted = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${'isProfileCompleted'}:key`);
    if (value !== null && value !== 'false') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const setIsProfileCompleted = async (value) => {
  try {
    await AsyncStorage.setItem(`@${'isProfileCompleted'}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

const isSocial = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${'isSocial'}:key`);
    if (value !== null && value !== 'false') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const setIsSocial = async (value) => {
  try {
    await AsyncStorage.setItem(`@${'isSocial'}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

const saveCredentials = async (type, access_token, refreshToken, userEmail) => {
  try {
    await AsyncStorage.setItem(
      `@${USER_CREDENTIALS}:key`,
      `${type}:${access_token}:${refreshToken}:${userEmail}`,
    );
    return true;
  } catch (error) {
    return false;
  }
};

const saveAppleCredentials = async (payload) => {
  try {
    await AsyncStorage.setItem(
      `@${APPLE_CREDENTIALS}:key`,
      JSON.stringify(payload),
    );
    return true;
  } catch (error) {
    return false;
  }
};

const clearCredentials = async () => {
  try {
    await AsyncStorage.removeItem(`@${USER_CREDENTIALS}:key`);
    return true;
  } catch (error) {
    return false;
  }
};

const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(`@${PLACE_ORDER_DETAILS}:key`);
    await AsyncStorage.removeItem(`@${CUSTOMER_CART}:key`);
    await AsyncStorage.removeItem(`@${ORDER_RESPONSE}:key`);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidCredentials = (type, access_token, refreshToken, userEmail) => {
  return !some([type, access_token, refreshToken, userEmail], isUndefined);
};

const loadCredentials = async () => {
  let credentials = {};

  try {
    const value = await AsyncStorage.getItem(`@${USER_CREDENTIALS}:key`);
    if (value !== null) {
      const [type, access_token, refreshToken, userEmail] = value.split(':');

      if (isValidCredentials(type, access_token, refreshToken, userEmail)) {
        credentials = {
          type: type,
          access_token: access_token,
          refresh_token: refreshToken,
          user_email: userEmail,
        };
      }
    }
  } catch (error) {}

  return credentials;
};

const loadAppleCredentials = async () => {
  let credentials = {};

  try {
    const value = await AsyncStorage.getItem(`@${APPLE_CREDENTIALS}:key`);
    if (value !== null) {
      const payload = JSON.parse(value);
      credentials = {
        ...payload,
      };
    }
  } catch (error) {}

  return credentials;
};

const updateCart = async (cart = []) => {
  await AsyncStorage.setItem(`@${CUSTOMER_CART}:key`, JSON.stringify(cart));
};

const getCart = async () => {
  const cart = await AsyncStorage.getItem(`@${CUSTOMER_CART}:key`);
  return cart ? JSON.parse(cart) : [];
};

const saveOrderDetails = async (order) => {
  await AsyncStorage.removeItem(`@${PLACE_ORDER_DETAILS}:key`);
  await AsyncStorage.setItem(
    `@${PLACE_ORDER_DETAILS}:key`,
    JSON.stringify(order),
  );
};

const saveOrderResponse = async (order) => {
  await AsyncStorage.setItem(`@${ORDER_RESPONSE}:key`, JSON.stringify(order));
};

const getOrderResponse = async () => {
  const orderResponse = await AsyncStorage.getItem(`@${ORDER_RESPONSE}:key`);
  return orderResponse ? JSON.parse(orderResponse) : null;
};

const getOrderDetails = async () => {
  const orderDetails = await AsyncStorage.getItem(
    `@${PLACE_ORDER_DETAILS}:key`,
  );
  return orderDetails ? JSON.parse(orderDetails) : [];
};

const setDriverData = async (driver) => {
  await AsyncStorage.setItem(`@${SET_DRIVER_DATA}:key`, JSON.stringify(driver));
};

const getDriverData = async () => {
  const driverData = await AsyncStorage.getItem(`@${SET_DRIVER_DATA}:key`);
  return driverData ? JSON.parse(driverData) : null;
};

const storage = {
  setData,
  getData,
  saveCredentials,
  clearCredentials,
  loadCredentials,
  updateCart,
  getCart,
  saveOrderDetails,
  getOrderDetails,
  clearCart,
  saveOrderResponse,
  getOrderResponse,
  saveAppleCredentials,
  loadAppleCredentials,
  isProfileCompleted,
  setIsProfileCompleted,
  isSocial,
  setIsSocial,
  setDriverData,
  getDriverData,
};

export default storage;
