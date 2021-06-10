import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';

const DriverOrderDetailHeader = memo(({onItemPress, style, order, jobType}) => {
  const {
    orderNumber,
    deliveryAddress,
    status,
    pickupTime,
    dropoffTime,
    phoneNo,
    firstName,
    lastName,
  } = order;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, style]}
      disabled={!onItemPress}
      onPress={() => onItemPress && onItemPress()}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text style={styles.customerName}>{`${firstName} ${lastName}`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.orderIdLabel}>Order Id: </Text>
          <Text style={styles.orderId}>{orderNumber}</Text>
        </View>
        <Text style={styles.pickup(jobType)}>
          {jobType === 'PickUp' ? 'Pick Up From' : 'Drop Off to'}
        </Text>
        <Text style={styles.address}>{deliveryAddress}</Text>
      </View>

      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.time}>
          {jobType === 'PickUp' ? pickupTime : dropoffTime}
        </Text>
        <Text style={styles.phone}>{phoneNo}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default DriverOrderDetailHeader;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.boxShadow,
    marginHorizontal: 3,
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 5.3,
    shadowOpacity: 1,
    elevation: 3,
  },
  orderIdLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.09,
    textAlign: 'left',
    color: '#2c436a',
  },
  orderId: {
    fontFamily: Fonts.poppinsBold,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#2c436a',
  },
  pickup: (type) => ({
    fontFamily: Fonts.poppinsRegular,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 12,
    letterSpacing: 0.08,
    textAlign: 'left',
    color: type === 'PickUp' ? '#ab15f6' : '#2cd285',
  }),
  customerName: {
    fontFamily: Fonts.poppinsBold,
    fontWeight: 'bold',
    letterSpacing: 0.11,
    color: '#ed8f31',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  address: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    width: 300,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.08,
    textAlign: 'left',
    color: '#2c436a',
  },
  time: {
    alignItems: 'flex-end',
    fontFamily: Fonts.poppinsBold,
    fontWeight: 'bold',
    letterSpacing: 0.11,
    textAlign: 'right',
    color: '#ed8f31',
    fontSize: 14,
  },
  phone: {
    alignItems: 'flex-end',
    fontFamily: Fonts.poppinsRegular,
    fontWeight: 'normal',
    letterSpacing: 0.08,
    textAlign: 'right',
    color: '#357bf3',
    fontSize: 12,
  },
});