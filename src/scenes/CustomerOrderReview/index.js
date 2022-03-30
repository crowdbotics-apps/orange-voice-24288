import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import {Cart} from '../../../assets/img/cart';
import OrderListItem from '../../components/OrderListItem';
import {Fonts} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Calendar from '../../../assets/img/Calendar';
import Clock from '../../../assets/img/clock.svg';
import PinOrange from '../../../assets/img/pin.svg';
import {Textarea, Form} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {successMessage, errorMessage} from '../../redux/utils/alerts';
import allActions from '../../redux/actions';
import moment from 'moment';
import storage from '../../redux/utils/storage';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';
const headerHeight =
  hasNotch && !isAndroid ? 230 : !hasNotch && !isAndroid ? 220 : 170;

const CustomerOrderReview = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const cart = useSelector((state) => state.cart.cart);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const coupon = useSelector((state) => state.coupon.coupon);
  const config = useSelector((state) => state.products.config);
  const user = useSelector((state) => state.user.user);

  const handleSubmitOrder = async () => {
    const orderResponse = await storage.getOrderResponse();

    const params = {
      profile: user?.profile_id,
      orderNumber: orderResponse?.orderNumber,
      id: orderResponse?.id,
      orderDate: moment.utc(Date.now()),
      pickupDate:
        moment(orderDetails.pickUpDate, 'DD-MM-YYYY').format('YYYY-MM-DD') +
        'T00:00:00.000Z',
      pickupTime: orderDetails.pickUpTime,
      dropoffDate:
        moment(orderDetails.dropOffDate, 'DD-MM-YYYY').format('YYYY-MM-DD') +
        'T00:00:00.000Z',
      dropoffTime: orderDetails.dropOffTime,
      address: orderDetails.location?.id,
      deliveryAddress: orderDetails.location?.mainAddress,
      description: orderDetails.driverInstructions,
      taxPercentage: Number(config?.system?.HSTPercentage),
      couponId: coupon?.id,
      couponCode: coupon?.code,
      couponType: coupon?.couponType,
      orderAmount: Number(orderDetails.total),
      discountAmount:
        orderDetails?.discountValue &&
        Number(orderDetails?.discountValue?.toFixed(2)),
      totalAmount: Number(orderDetails.grandTotal),
      order_details: cart.map((cartItem) => ({
        service: cartItem.id,
        quantity: cartItem.quantity,
        unitPrice: Number(cartItem?.serviceCharges?.replace('$', '')),
        amount:
          Number(cartItem?.serviceCharges?.replace('$', '')) *
          Number(cartItem?.quantity),
      })),
    };

    const onSuccess = async (response) => {
      successMessage({
        message: orderResponse
          ? 'Order updated successfully'
          : 'Order added successfully',
      });

      await storage.saveOrderResponse(response);

      navigation.navigate('CustomerMakePayment', {
        orderNumber: response.orderNumber,
        orderId: response.id,
        totalAmount: Number(orderDetails.grandTotal),
      });
    };

    const onFail = (_error) => {
      errorMessage({
        message: _error?.message || _error?.Message,
      });
    };

    if (orderResponse) {
      dispatch(
        allActions.orderActions.updateSavedOrder({
          params,
          onSuccess,
          onFail,
        }),
      );
    } else {
      dispatch(
        allActions.orderActions.saveUserOrder({
          params,
          onSuccess,
          onFail,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch({
      type: 'FETCH_ORDER_DETAILS',
    });
    dispatch({
      type: 'FETCH_CART',
    });
  }, []);

  const getListViewFooter = () => {
    const {
      location,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      driverInstructions,
    } = orderDetails;
    return (
      <View style={{flex: 1, paddingBottom: 40}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 25,
            marginVertical: 20,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontFamily: Fonts.poppinsRegular,
                fontSize: 14,
                letterSpacing: 0.3,
                color: colors.darkOrange,
                marginVertical: 10,
              }}>
              Pickup Date & Time
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Calendar fill={colors.steelBlue} />
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  flex: 1,
                  paddingLeft: 10,
                  color: colors.steelBlue,
                }}>
                {pickUpDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Clock />
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  flex: 1,
                  paddingLeft: 10,
                  color: colors.steelBlue,
                }}>
                {pickUpTime}
              </Text>
            </View>
          </View>
          <View
            style={{width: 1, backgroundColor: '#cdd9ec', marginVertical: 10}}
          />
          <View>
            <Text
              style={{
                fontFamily: Fonts.poppinsRegular,
                fontSize: 14,
                marginVertical: 10,
                letterSpacing: 0.3,
                color: colors.darkOrange,
              }}>
              Dropoff Date & Time
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Calendar fill={colors.steelBlue} />
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  flex: 1,
                  paddingLeft: 10,
                  color: colors.steelBlue,
                }}>
                {dropOffDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Clock />
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  flex: 1,
                  paddingLeft: 10,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  marginVertical: 10,
                  color: colors.steelBlue,
                }}>
                {dropOffTime}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 0.3,
            alignItems: 'center',
            borderTopWidth: 0.3,
            paddingVertical: 20,
            marginBottom: 10,
            marginHorizontal: 25,
          }}>
          <PinOrange />
          <Text
            style={{
              fontFamily: Fonts.poppinsRegular,
              fontSize: 12,
              letterSpacing: 0.2,
              textAlign: 'left',
              marginLeft: 10,
              color: colors.steelBlue,
              lineHeight: 18,
            }}>
            {location?.mainAddress}
          </Text>
        </View>
        <Form
          style={{
            marginHorizontal: 15,
            marginTop: 10,
          }}>
          <Textarea
            disabled
            value={driverInstructions}
            rowSpan={3}
            style={{
              fontFamily: Fonts.poppinsRegular,
              fontSize: 12,
            }}
            placeholder="Driver Instructions"
          />
        </Form>

        <View
          style={{
            borderWidth: 0.5,
            opacity: 0.5,
            marginHorizontal: 25,
            borderColor: '#000',
          }}
        />
        <Button
          svg={<Cart />}
          onPress={() => navigation.navigate('CustomerHome')}
          buttonStyle={{alignSelf: 'center', marginTop: 25}}
          text="Add More to Basket"
          textStyle={{
            fontFamily: Fonts.poppinsRegular,
            marginHorizontal: 7,
            fontSize: 16,
            letterSpacing: 0.3,
            lineHeight: 20,
            color: colors.darkOrange,
          }}
        />
        <LinearGradient
          colors={[colors.lightOrange, colors.darkOrange]}
          start={{y: 0.0, x: 1.0}}
          style={{width: '90%', alignSelf: 'center', marginTop: 18}}
          end={{y: 0.0, x: 0.0}}>
          <Button
            text="Continue"
            buttonStyle={styles.buttonOrder}
            textStyle={styles.buttonOrderText}
            onPress={() => handleSubmitOrder()}
          />
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        headerTitle="Order Review"
        headerTitleStyle={{marginRight: 20}}
        headerStyle={{height: headerHeight}}
        leftButtonImage={<BackArrow />}
        onRightButtonPress={() => navigation.navigate('CustomerOrderBasket')}
        onLeftButtonPress={() => navigation.goBack()}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontFamily: Fonts.poppinsRegular,
              fontSize: 30,
              letterSpacing: 0.6,
              color: '#ffffff',
              lineHeight: 46,
            }}>
            Payable Amount
          </Text>
          <Text
            style={{
              fontFamily: Fonts.poppinsBold,
              fontSize: 40,
              letterSpacing: 0.8,
              color: '#ffffff',
              lineHeight: 60,
            }}>
            {'$' + orderDetails.grandTotal}
          </Text>
        </View>
      </AppHeader>
      <View style={styles.listContainer}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          ListFooterComponent={() => getListViewFooter()}
          keyExtractor={(item) => item.orderNumber}
          showsVerticalScrollIndicator={false}
          data={cart}
          renderItem={({item}) => (
            <View style={{flex: 1, marginHorizontal: 22}}>
              <OrderListItem
                serviceTitle={item.serviceTitle}
                orderNumber={item.orderNumber}
                itemCount={item.quantity}
                serviceImage={item.serviceImage}
                serviceCategory={item.categoryTitle}
                serviceCharges={item.serviceCharges}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
});

export default CustomerOrderReview;

const _styles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      marginVertical: 10,
    },
    buttonOrder: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonOrderText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 27,
    },
    receiptView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      marginHorizontal: 22,
      borderBottomColor: '#332c436a',
      paddingBottom: 12,
    },
    receiptTitle: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: colors.steelBlue,
    },
    receiptValue: {
      fontFamily: Fonts.poppinsBold,
      fontSize: 14,
      color: colors.steelBlue,
    },
    grandTotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: '#357bf3',
    },
    discountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      paddingBottom: 12,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 25,
    },
    textOrderId: {
      fontFamily: Fonts.poppinsMedium,
      fontSize: 18,
      letterSpacing: 0.3,
      textAlign: 'left',
      color: colors.steelBlue,
      lineHeight: 21,
    },
    textOrderNumber: {
      fontFamily: Fonts.poppinsBold,
      fontSize: 18,
      textAlign: 'left',
      color: colors.steelBlue,
      lineHeight: 21,
    },
    textOrderDateTime: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 14,
      letterSpacing: 0.2,
      textAlign: 'left',
      color: colors.steelBlue,
      lineHeight: 18,
    },
    textOrderStatus: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 14,
      letterSpacing: 0.2,
      textAlign: 'left',
      color: '#2cd285',
      lineHeight: 18,
    },
    itemNumberContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItemCount: {
      fontFamily: Fonts.poppinsBold,
      fontSize: 16,
      color: colors.darkOrange,
    },
    textItems: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 10,
      color: colors.darkOrange,
    },
    buttonOrderHistory: {
      height: 36,
      width: 113,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonOrderHistoryText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      textAlign: 'left',
      color: '#ffffff',
      lineHeight: 18,
    },
  });
