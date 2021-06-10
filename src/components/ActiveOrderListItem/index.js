import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import {statusTitle, progressColor} from '../../redux/utils/orderUtil';

const ActiveOrderListItem = memo(
  ({
    orderNumber,
    orderDateTime,
    orderStatus,
    itemCount,
    progressColor,
    progressCount,
    progressImage,
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
        </View>
        <View style={styles.itemNumberContainer}>
          <Text style={styles.textItemCount}>{itemCount && itemCount}</Text>
          <Text style={styles.textItems}>Items</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default ActiveOrderListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    height: 77,
    marginBottom: 5,
    marginTop: 5,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
});
