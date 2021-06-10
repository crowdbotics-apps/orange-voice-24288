import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import {progressColor, statusTitle} from '../../redux/utils/orderUtil';

const isTablet = DeviceInfo.isTablet();

const OrderHistoryListItem = memo(
  ({
    orderNumber,
    orderDateTime,
    orderStatus,
    itemCount,
    progressColor,
    progressCount,
    progressImage,
    serviceCharges,
    onRepeatOrder,
    onItemPress,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress && onItemPress()}
        style={styles.itemContainer}>
        <ProgressCircle
          percent={progressCount ? Number(progressCount) : 0}
          radius={30}
          borderWidth={3}
          color={progressColor ? progressColor : Colors.lightBlue}
          shadowColor={Colors.progressShadow}
          bgColor={Colors.white}>
          {progressImage && progressImage}
        </ProgressCircle>
        <View style={{flex: 1, marginLeft: 20}}>
          <Text>
            <Text style={styles.textOrderId}>Order Id: </Text>
            <Text style={styles.textOrderNumber}>
              {orderNumber && orderNumber}
            </Text>
          </Text>
          <Text style={styles.textOrderDateTime}>
            {orderDateTime && orderDateTime}
          </Text>
          <Text style={styles.textOrderStatus(orderStatus)}>
            {orderStatus && statusTitle[orderStatus]}
          </Text>
          {serviceCharges && (
            <Text style={styles.textServiceCharges}>{serviceCharges}</Text>
          )}
        </View>
        <View style={styles.itemNumberContainer}>
          <Text style={styles.textItemCount}>{itemCount && itemCount}</Text>
          <Text style={styles.textItems}>Items</Text>
          {orderStatus === 'Delivered' && (
            <LinearGradient
              colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
              style={{height: 20, width: 68, marginTop: 20}}
              start={{y: 0.0, x: 1.0}}
              end={{y: 0.0, x: 0.0}}>
              <Button
                text="Repeat Order"
                buttonStyle={styles.buttonOrderHistory}
                textStyle={styles.buttonOrderHistoryText}
                onPress={() => onRepeatOrder && onRepeatOrder()}
              />
            </LinearGradient>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

export default OrderHistoryListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    height: 100,
    marginTop: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 3,
    shadowColor: Colors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 5.3,
    shadowOpacity: 1,
    elevation: 2,
  },
  textOrderId: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 14,
    letterSpacing: 0.3,
    color: Colors.steelBlue,
    lineHeight: 21,
  },
  textOrderNumber: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 14,
    color: Colors.steelBlue,
    lineHeight: 21,
  },
  textOrderDateTime: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    letterSpacing: 0.2,
    color: Colors.steelBlue,
    lineHeight: 18,
  },
  textOrderStatus: (status) => ({
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    color: progressColor[status],
  }),
  itemNumberContainer: {
    justifyContent: 'space-between',
    width: isTablet ? '5%' : '15%',
    alignItems: 'center',
  },
  textItemCount: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 16,
    color: Colors.darkOrange,
  },
  textItems: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 10,
    color: Colors.darkOrange,
  },
  textServiceCharges: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: Colors.darkOrange,
    lineHeight: 25,
  },
  buttonOrderHistory: {
    height: 20,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrderHistoryText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 8,
    color: Colors.white,
    lineHeight: 18,
  },
});
