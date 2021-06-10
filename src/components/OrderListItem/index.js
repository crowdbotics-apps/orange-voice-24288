import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import CircleImageView from '../CircleImageView';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const OrderListItem = memo(
  ({
    serviceTitle,
    serviceCategory,
    serviceImage,
    serviceCharges,
    itemCount,
    onItemPress,
  }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        disabled={!onItemPress}
        onPress={() => onItemPress && onItemPress()}>
        <CircleImageView source={serviceImage && serviceImage} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.textServiceTitle}>
            {serviceTitle && serviceTitle}
          </Text>
          <Text
            style={styles.textServiceDesc}
            numberOfLines={2}
            ellipsizeMode="tail">
            {serviceCategory && serviceCategory}
          </Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.textServiceCharges}>
              {serviceCharges && serviceCharges}
            </Text>
          </View>
        </View>
        <View style={styles.itemNumberContainer}>
          <Text style={styles.textItemCount}>{itemCount && itemCount}</Text>
          <Text style={styles.textItems}>Items</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default OrderListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    height: 90,
    marginTop: 10,
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
  textServiceTitle: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#2c436a',
  },
  textServiceDesc: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    letterSpacing: 0.2,
    color: '#949eae',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textServiceCharges: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#ed8f31',
    lineHeight: 25,
  },
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
});