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
import ProgressCircle from 'react-native-progress-circle';
import PinOrange from '../../../assets/img/pin.svg';
import Calendar from '../../../assets/img/Calendar';
import Clock from '../../../assets/img/Clock';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import AppLoader from '../../components/AppLoader';
import moment from 'moment';
import {
  statusTitle,
  progressColor,
  progressCount,
  progressImageLarge,
} from '../../redux/utils/orderUtil';
import TPFlatList from '../../components/TPFlatList';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';
const headerHeight =
  hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60;

const CustomerOrderDetails = memo(({navigation}) => {
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const orderId = navigation.getParam('orderId');
  const isDriver = navigation?.getParam('isDriver', false);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.cart);
  const meta = order?.meta;

  const fetchOrderById = () => {
    dispatch(
      allActions.orderActions.fetchOrderById({
        params: orderId,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const cancelOrderById = () => {
    dispatch(
      allActions.orderActions.cancelOrder({
        params: orderId,
        onSuccess: () => {
          navigation.goBack();
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  useEffect(() => {
    fetchOrderById();
  }, []);

  const getListViewFooter = () => {
    const {
      taxPercentage,
      orderAmount,
      discountAmount,
      totalAmount,
      status,
    } = order.orderById;

    const taxAmount = (orderAmount * (taxPercentage / 100))?.toFixed(2);

    return (
      <View
        style={{
          marginTop: 40,
          paddingBottom: 30,
        }}>
        <View style={styles.receiptView}>
          <Text style={styles.receiptTitle}>Total Amount</Text>
          <Text style={styles.receiptValue}>${orderAmount}</Text>
        </View>
        <View style={{...styles.receiptView, marginVertical: 20}}>
          <Text style={styles.receiptTitle}>HST {taxPercentage}%</Text>
          <Text style={styles.receiptValue}>
            ${`${taxAmount}`.slice(0, `${taxAmount}`.indexOf('.') + 3)}
          </Text>
        </View>
        {discountAmount > 0 ? (
          <View style={styles.discountContainer}>
            <Text style={styles.receiptTitle}>Discount</Text>
            <Text style={styles.receiptValue}>
              ${discountAmount?.toFixed(2)}
            </Text>
          </View>
        ) : null}

        <View style={styles.grandTotalContainer}>
          <Text style={{...styles.receiptTitle, color: colors.white}}>
            Grand Total
          </Text>
          <Text style={{...styles.receiptValue, color: colors.white}}>
            ${totalAmount}
          </Text>
        </View>
        {status === 'OrderPlaced' ? (
          <LinearGradient
            colors={[colors.lightOrange, colors.darkOrange]}
            start={{y: 0.0, x: 1.0}}
            style={{width: '90%', alignSelf: 'center', marginTop: 18}}
            end={{y: 0.0, x: 0.0}}>
            <Button
              text="Cancel Order"
              buttonStyle={styles.buttonOrder}
              textStyle={styles.buttonOrderText}
              onPress={() => cancelOrderById()}
            />
          </LinearGradient>
        ) : null}
      </View>
    );
  };

  const getListViewHeader = () => {
    const {
      id: orderNumber,
      orderDate,
      status,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      deliveryAddress,
      address,
    } = order.orderById;

    const {buzzerCode, suite} = address || {};

    const isBlankString = (str) => {
      return !str || /^\s*$/.test(str);
    };

    return (
      <View style={{flex: 1}}>
        <View style={styles.itemContainer}>
          <ProgressCircle
            percent={Number(progressCount[status]) || 0}
            radius={60}
            borderWidth={6}
            color={progressColor[status]}
            shadowColor={colors.progressShadow}
            bgColor={colors.white}>
            {progressImageLarge[status]}
          </ProgressCircle>
          <View style={{flex: 1, marginLeft: 30}}>
            <Text>
              <Text style={styles.textOrderId}>Order Id: </Text>
              <Text style={styles.textOrderNumber}>{orderNumber}</Text>
            </Text>
            <Text style={styles.textOrderDateTime}>
              {moment.utc(orderDate).local().format('hh:mm A, MM-DD-YYYY')}
            </Text>
            <Text style={styles.textOrderStatus(status)}>
              {statusTitle[status]}
            </Text>
            {!isDriver ? (
              <LinearGradient
                colors={[colors.lightOrange, colors.darkOrange]}
                style={{height: 36, width: 113, marginTop: 10}}
                start={{y: 0.0, x: 1.0}}
                end={{y: 0.0, x: 0.0}}>
                <Button
                  text="Track Order"
                  buttonStyle={styles.buttonOrderHistory}
                  textStyle={styles.buttonOrderHistoryText}
                  onPress={() =>
                    navigation.navigate('CustomerTrackOrder', {
                      orderById: order.orderById,
                    })
                  }
                />
              </LinearGradient>
            ) : null}
          </View>
        </View>
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
              Pick Up Date & Time
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
                {moment(pickupDate).format('ddd, DD MMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
                width: 150,
                alignItems: 'center',
              }}>
              <Clock fill={colors.steelBlue} />
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  flex: 1,
                  paddingLeft: 10,
                  color: colors.steelBlue,
                }}>
                {pickupTime}
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
              Drop Off Date & Time
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
                {moment(dropoffDate).format('ddd, DD MMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Clock fill={colors.steelBlue} />
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
                {dropoffTime}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.3,
            borderColor: '#332c436a',
            borderTopWidth: 0.3,
          }}>
          {isDriver && !isBlankString(buzzerCode) ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingRight: 25,
                marginTop: 10,
                borderBottomWidth: 0.3,
                borderColor: '#332c436a',
                paddingBottom: 10,
              }}>
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
                Buzzer Code
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  textAlign: 'left',
                  marginLeft: 10,
                  color: colors.steelBlue,
                  lineHeight: 18,
                  fontWeight: 'bold',
                }}>
                {buzzerCode ?? ''}
              </Text>
            </View>
          ) : null}

          {isDriver && !isBlankString(suite) ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingRight: 25,
                marginTop: 10,
                borderBottomWidth: 0.3,
                borderColor: '#332c436a',
                paddingBottom: 10,
              }}>
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
                Suite Number
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 12,
                  letterSpacing: 0.2,
                  textAlign: 'left',
                  marginLeft: 10,
                  color: colors.steelBlue,
                  lineHeight: 18,
                  fontWeight: 'bold',
                }}>
                {suite ?? ''}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
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
              {deliveryAddress}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        headerTitle="Order Details"
        headerStyle={{
          height: headerHeight,
        }}
        leftButtonImage={<BackArrow />}
        rightButtonImage={
          !isDriver ? (
            <View style={{minWidth: 25, height: 25}}>
              <Cart color={colors.white} height={22} width={35} />
              {cart.length > 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    left: -3,
                    paddingHorizontal: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: 15,
                    minWidth: 15,
                    borderRadius: 7.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'rgba(230,137,47,1)',
                      zIndex: 100,
                    }}>
                    {cart.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : undefined
        }
        onRightButtonPress={
          !isDriver
            ? () => navigation.navigate('CustomerOrderBasket')
            : undefined
        }
        onLeftButtonPress={() => navigation.goBack()}
      />

      {meta?.loading ? (
        <AppLoader />
      ) : (
        <View style={styles.listContainer}>
          <TPFlatList
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            ListHeaderComponent={() => getListViewHeader()}
            ListFooterComponent={() => getListViewFooter()}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={order.orderById.order_details}
            getItemLayout={(data, index) => ({
              length: 90,
              offset: 90 * index,
              index,
            })}
            renderItem={({item}) => (
              <View style={{flex: 1, marginHorizontal: 22}}>
                <OrderListItem
                  serviceTitle={item.service.title}
                  orderNumber={item.id}
                  itemCount={item.quantity}
                  serviceImage={item.service.image}
                  serviceCategory={item.service.category.title}
                  serviceCharges={`$${item.amount}`}
                />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
});

export default CustomerOrderDetails;

const _styles = (colors) =>
  StyleSheet.create({
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
    textOrderStatus: (status) => ({
      fontFamily: Fonts.poppinsRegular,
      fontSize: 14,
      letterSpacing: 0.2,
      textAlign: 'left',
      color: progressColor[status],
      lineHeight: 18,
    }),
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
