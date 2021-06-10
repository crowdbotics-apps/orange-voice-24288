import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import moment from 'moment';

const DriverTaskItem = memo(({onItemPress, order, jobType, assignedDate}) => {
  const {orderNumber, deliveryAddress, phoneNo} = order;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      disabled={!onItemPress}
      onPress={() => onItemPress && onItemPress()}>
      <View style={{flex: 1, height: '100%', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.orderIdLabel}>Order Id: </Text>
          <Text style={styles.orderId}>{orderNumber}</Text>
        </View>
        <Text style={styles.pickup(jobType)}>
          {jobType === 'PickUp' ? 'Pick Up From' : 'Drop Off To'}
        </Text>
        <Text style={styles.address}>{deliveryAddress}</Text>
      </View>

      <View style={{flex: 1, height: '100%'}}>
        <Text style={styles.time}>
          {moment.utc(assignedDate).local().format('hh:mm A')}
        </Text>
        <Text style={styles.phone}>{phoneNo}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default DriverTaskItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: '5%',
    paddingVertical: 15,
    flex: 1,
    backgroundColor: Colors.white,
    shadowColor: Colors.boxShadow,
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
    top: 2,
    textAlign: 'left',
    color: type === 'PickUp' ? '#ab15f6' : '#2cd285',
  }),

  address: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    width: 220,
    color: '#2c436a',
    top: 5,
  },
  time: {
    alignItems: 'flex-end',
    fontFamily: Fonts.poppinsBold,
    fontWeight: 'bold',
    letterSpacing: 0.11,
    textAlign: 'right',
    color: '#ed8f31',
    fontSize: 16,
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
