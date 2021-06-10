import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../theme/fonts';
import { Colors } from '../../theme/color';
import CircleImageView from '../CircleImageView';
import DeviceInfo from 'react-native-device-info';
import NumberCounter from '../NumberCounter';
import Button from '../../components/Button';

const isTablet = DeviceInfo.isTablet();

const MyBasketOrderItem = memo(
  ({
    serviceTitle,
    serviceCategory,
    serviceImage,
    serviceCharges,
    itemCount,
    onItemPress,
    minQty = 0,
    onDelete,
    ...rest
  }) => {
    return (
      <TouchableOpacity
        disabled={!onItemPress}
        style={styles.itemContainer}
        onPress={() => onItemPress && onItemPress()}>
        <CircleImageView source={serviceImage && serviceImage} />
        <View style={{ flex: 1, marginLeft: 10 }}>

          <Text style={styles.textServiceTitle}>
            {serviceTitle && serviceTitle}
          </Text>
          <Button
            buttonStyle={{ position: 'absolute', top: 5, right: 5 }}
            image={require('../../../assets/img/garbage.png')}
            imageStyle={{ height: 18, width: 16 }}
            onPress={onDelete}
          />

          <Text
            style={styles.textServiceDesc}
            numberOfLines={2}
            ellipsizeMode="tail">
            {serviceCategory && serviceCategory}
          </Text>
          <Text style={[styles.textServiceDesc, { fontSize: 10, fontWeight: "600" }]}>Min Quantity: {minQty}</Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.textServiceCharges}>
              {serviceCharges && serviceCharges}
              <Text style={[styles.textServiceDesc, { fontSize: 11 }]}> / Item</Text>
            </Text>
            <View style={styles.itemNumberContainer}>
              <NumberCounter
                {...rest}
                minValue={minQty}
                counterValue={itemCount}
                counterTextStyle={{ marginHorizontal: 0 }}
                counterContainerStyle={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default MyBasketOrderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '2%',
    height: 100,
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
    width: isTablet ? '15%' : '32%',
    paddingRight: 5,
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
