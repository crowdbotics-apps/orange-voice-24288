import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import OrangeRectangle from '../../../assets/img/orange_rectangle.svg';
import Coupon from '../../../assets/img/coupon.svg';
import AppHeader from '../../components/AppHeader';
import {hasNotch} from 'react-native-device-info';
import {Menu} from '../../../assets/img/menu';
import {Fonts} from '../../theme/fonts';
import MyBasketOrderItem from '../../components/MyBasketOrderItem';
import Button from '../../components/Button';
import {Cart} from '../../../assets/img/cart';
import {Input, Item, CheckBox, Text as NBText} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {isEqual} from 'lodash';
import {calculateTotal} from '../../redux/utils/helper';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import useDebounce from '../../redux/utils/useDebounce';
import useCustomTheme from '../../theme/useTheme';

const isAndroid = Platform.OS === 'android';
const headerHeight =
  hasNotch && !isAndroid ? 277 : !hasNotch && !isAndroid ? 350 : 235;

const CustomerOrderBasket = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const cart = useSelector((state) => state.cart.cart);
  const coupon = useSelector((state) => state.coupon.coupon);
  const config = useSelector((state) => state.products.config);

  const [couponValue, setCouponValue] = useState();
  const [isRefferal, setIsRefferal] = useState(false);
  const [refferalCoupon, setRefferalCoupon] = useState({});
  const [referralChecked, setRefferalChecked] = useState(false);
  const debouncedPromoCode = useDebounce(couponValue, 700);

  const getDiscountValue = (total) => {
    let discountValue = 0;

    if (referralChecked) {
      const {offerType, offerValue} = refferalCoupon || {};
      discountValue = isEqual(offerType, 'Percentage')
        ? total * (offerValue / 100)
        : offerValue;
    } else {
      discountValue = isEqual(coupon?.offerType, 'Percentage')
        ? total * (coupon?.offerValue / 100)
        : coupon?.offerValue;
    }

    return discountValue || 0;
  };

  let total = Number(calculateTotal(cart))?.toFixed(2);
  let discountValue = getDiscountValue(total);
  let discount = total - (discountValue || 0);
  let HST = Math.trunc(discount * config?.system?.HSTPercentage) / 100;
  let deliveryFee = Math.trunc(config?.system?.DeliveryFee);
  let grandTotal = Number(discount + HST + deliveryFee)?.toFixed(2);
  const {minAmount = 0, minProduct = 0} = refferalCoupon || {};

  useEffect(() => {
    setCouponValue(couponValue);
    if (cart.length > 0) {
      validatePromoCode(couponValue);
    }
    if (getReferralError()) {
      setRefferalChecked(false);
    }
  }, [cart, couponValue, getReferralError, validatePromoCode]);

  useEffect(() => {
    validateCouponReferral();
  }, [validateCouponReferral]);

  const validateCouponReferral = useCallback(() => {
    dispatch(
      allActions.couponActions.validateCouponReferral({
        onSuccess: (response) => {
          if (response.result && response.result.length > 0) {
            const obj = response.result[0] || {};
            const {coupon} = obj || {};
            const {
              minProduct = 0,
              minAmount = 0,
              offerType,
              offerValue,
            } = coupon;
            setIsRefferal(true);
            setRefferalCoupon({
              minAmount,
              minProduct,
              offerType,
              offerValue,
            });
          }
        },
      }),
    );
  }, [dispatch]);

  const validatePromoCode = useCallback(
    (code) => {
      if (code) {
        let quantity = 0;
        cart?.map((item) => {
          quantity = quantity + Number(item.quantity);
        });

        dispatch(
          allActions.couponActions.validateCoupon({
            params: {
              couponCode: code,
              amount: Number(total),
              quantity,
            },
            onFail: (_error) =>
              code?.length > 0 &&
              errorMessage({
                message: _error?.message || _error?.Message,
              }),
          }),
        );
      }
    },
    [cart, dispatch, total],
  );

  useEffect(() => {
    validatePromoCode(debouncedPromoCode);
  }, [debouncedPromoCode, validatePromoCode]);

  const handleItemCountChange = (value, product) => {
    if (!isEqual(value, product.quantity) && value > 0) {
      dispatch({
        type: 'CHANGE_QUANTITY',
        productId: product.id,
        value: value - product.quantity,
      });
    } else if (isEqual(value, 0)) {
      dispatch({
        type: 'REMOVE_ITEM',
        productId: product.id,
      });
    }
  };

  const handlePlaceOrder = () => {
    dispatch({
      type: 'PLACE_ORDER_DETAILS',
      order: {
        grandTotal,
        total,
        HST,
        discountValue,
        discount,
      },
      onSuccess: () => {
        navigation.navigate('CustomerPickAndDropOrder');
      },
      onFail: () => {},
    });
  };

  const getReferralError = useCallback(() => {
    let quantity = 0;
    cart.map((item) => {
      quantity = quantity + Number(item.quantity);
    });

    if (quantity < minProduct && total < minAmount) {
      return `Min number of items for referal coupon is ${minProduct} and Min amount is $${minAmount}`;
    } else if (quantity < minProduct && total >= minAmount) {
      return `Min number of items for referal coupon is ${minProduct}`;
    } else if (quantity >= minProduct && total < minAmount) {
      return `Min amount for referal coupon is $${minAmount}`;
    }
    return undefined;
  }, [cart, minAmount, minProduct, total]);

  const onRefferalChecked = () => {
    if (getReferralError()) {
      setRefferalChecked(false);
    } else {
      setRefferalChecked(!referralChecked);
    }
  };

  const printableDiscount = () => {
    if (referralChecked) {
      const {offerType, offerValue} = refferalCoupon || {};
      return isEqual(offerType, 'Percentage')
        ? `${offerValue}%`
        : `$${offerValue}`;
    } else {
      return isEqual(coupon?.offerType, 'Percentage')
        ? `${coupon?.offerValue}%`
        : `$${coupon?.offerValue}`;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <ScrollView
        style={{flex: 1}}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <AppHeader
            headerTitle="My Basket"
            headerTitleStyle={{marginRight: 20}}
            headerStyle={{height: headerHeight}}
            leftButtonImage={<Menu />}
            onRightButtonPress={() =>
              navigation.navigate('CustomerOrderBasket')
            }
            onLeftButtonPress={() => navigation.openDrawer()}>
            <View style={styles.headerContainer}>
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 30,
                  letterSpacing: 0.6,
                  color: '#ffffff',
                }}>
                Grand Total
              </Text>

              <Text
                style={{
                  fontFamily: Fonts.poppinsBold,
                  fontSize: 40,
                  letterSpacing: 0.8,
                  color: '#ffffff',
                }}>
                {'$' + grandTotal}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: discountValue ? '90%' : '100%',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.poppinsRegular,
                      fontSize: 14,
                      color: '#ffffff',
                    }}>
                    Total Amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.poppinsBold,
                      fontSize: 18,
                      color: '#ffffff',
                    }}>
                    {'$' + total}
                  </Text>
                </View>
                {discountValue > 0
                  ? [
                      <Text
                        style={{
                          fontFamily: Fonts.poppinsBold,
                          fontSize: 35,
                          color: '#ffffff',
                        }}>
                        -
                      </Text>,
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.poppinsRegular,
                            fontSize: 14,
                            color: '#ffffff',
                          }}>
                          Discount
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts.poppinsBold,
                            fontSize: 18,
                            color: '#ffffff',
                          }}>
                          {printableDiscount()}
                        </Text>
                      </View>,
                    ]
                  : null}
                <Text
                  style={{
                    fontFamily: Fonts.poppinsBold,
                    fontSize: 35,
                    color: '#ffffff',
                  }}>
                  +
                </Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.poppinsRegular,
                      fontSize: 14,
                      color: '#ffffff',
                    }}>
                    HST {config?.system?.HSTPercentage}%
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.poppinsBold,
                      fontSize: 21,
                      color: '#ffffff',
                    }}>
                    {'$' + HST?.toFixed(2)}
                  </Text>
                </View>
                {deliveryFee ? (
                  <>
                    <Text
                      style={{
                        fontFamily: Fonts.poppinsBold,
                        fontSize: 35,
                        color: '#ffffff',
                      }}>
                      +
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.poppinsRegular,
                          fontSize: 14,
                          color: '#ffffff',
                        }}>
                        Delivery Fee
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.poppinsBold,
                          fontSize: 21,
                          color: '#ffffff',
                        }}>
                        {'$' + deliveryFee?.toFixed(2)}
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </AppHeader>
          <View style={styles.listContainer}>
            <FlatList
              nestedScrollEnabled={false}
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1}}
              keyExtractor={(item, index) => `list-cart-item-${index}`}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Cart height={117} width={140} />
                  <Text
                    style={{
                      fontFamily: Fonts.poppinsBold,
                      fontSize: 16,
                      letterSpacing: 0.3,
                      marginTop: 15,
                      color: colors.darkOrange,
                      lineHeight: 25,
                    }}>
                    Your cart is empty
                  </Text>
                  <Text
                    style={{
                      width: 270,
                      marginTop: 10,
                      fontFamily: Fonts.poppinsMedium,
                      fontSize: 14,
                      letterSpacing: 0.3,
                      textAlign: 'center',
                      color: colors.steelBlue,
                      lineHeight: 21,
                    }}>
                    Start adding items by tapping add item button below
                  </Text>
                </View>
              )}
              data={cart || []}
              getItemLayout={(data, index) => ({
                length: 100,
                offset: 100 * index,
                index,
              })}
              renderItem={({item}) => (
                <View
                  style={{flex: 1, marginHorizontal: 22, paddingBottom: 10}}>
                  <MyBasketOrderItem
                    onDelete={() => handleItemCountChange(0, item)}
                    minQty={item.minQty}
                    serviceTitle={item.serviceTitle}
                    orderNumber={item.id}
                    itemCount={item.quantity}
                    serviceImage={item.serviceImage}
                    serviceCategory={item.categoryTitle}
                    serviceCharges={item.serviceCharges}
                    onValueChanged={(value) =>
                      handleItemCountChange(value, item)
                    }
                  />
                </View>
              )}
            />

            <View style={{alignItems: 'center', marginTop: 20}}>
              <Button
                svg={<Cart />}
                text={`Add ${!(cart.length > 0) ? 'Item' : 'More'} to Basket`}
                onPress={() => navigation.navigate('CustomerHome')}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: colors.darkOrange,
                  padding: 10,
                  borderStyle: 'dashed',
                }}
                textStyle={{
                  fontFamily: Fonts.poppinsRegular,
                  marginHorizontal: 5,
                  fontSize: 16,
                  letterSpacing: 0.3,
                  color: colors.darkOrange,
                }}
              />
              {isRefferal && cart.length > 0 ? (
                <View style={{width: '85%'}}>
                  <TouchableOpacity
                    onPress={() => onRefferalChecked()}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                      marginLeft: -10,
                    }}>
                    <CheckBox
                      disabled
                      checked={referralChecked}
                      style={{
                        borderRadius: 0,
                        backgroundColor: referralChecked
                          ? colors.darkOrange
                          : 'transparent',
                        borderColor: referralChecked
                          ? 'transparent'
                          : colors.steelBlue,
                      }}
                    />
                    <NBText
                      style={{
                        color: 'black',
                        marginLeft: 20,
                        fontSize: 14,
                      }}>
                      Coupon Refferal
                    </NBText>
                  </TouchableOpacity>
                  {getReferralError() ? (
                    <Text
                      numberOfLines={2}
                      style={{
                        color: 'red',
                        fontSize: 10,
                        alignSelf: 'flex-start',
                        marginTop: 5,
                      }}>
                      {getReferralError()}
                    </Text>
                  ) : null}
                </View>
              ) : null}
              {cart.length > 0 ? (
                <Item
                  disabled={referralChecked}
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderColor: referralChecked ? '#ddd' : colors.darkOrange,
                    marginTop: 20,
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    width: '85%',
                  }}>
                  <OrangeRectangle />
                  <View
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: 35,
                      marginLeft: 18,
                    }}>
                    <Coupon />
                  </View>

                  <Input
                    editable={!referralChecked}
                    placeholder="Add Promo Code"
                    placeholderTextColor={colors.steelBlue}
                    inlineLabel
                    returnKeyType={'done'}
                    value={couponValue}
                    onChangeText={(value) => setCouponValue(value)}
                  />
                </Item>
              ) : null}
              <LinearGradient
                colors={[colors.lightOrange, colors.darkOrange]}
                start={{y: 0.0, x: 1.0}}
                style={{width: '85%', marginVertical: 25}}
                end={{y: 0.0, x: 0.0}}>
                <Button
                  disabled={!(cart.length > 0)}
                  text="Place Order"
                  buttonStyle={styles.buttonPlaceOrder}
                  textStyle={styles.buttonPlaceOrderText}
                  onPress={() => handlePlaceOrder()}
                />
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default CustomerOrderBasket;

const _styles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      flex: 1,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerHeading: {
      marginTop: 20,
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 33,
      letterSpacing: 0.6,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 46,
    },
    listContainer: {
      flex: 1,
    },
    buttonPlaceOrder: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonPlaceOrderText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 27,
    },
  });
