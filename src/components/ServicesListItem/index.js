import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import CircleImageView from '../CircleImageView';
import Button from '../Button';
import {Cart} from '../../../assets/img/cart';

const ServicesListItem = memo(
  ({
    serviceTitle,
    serviceDesc,
    serviceImage,
    serviceCharges,
    onCartPress,
    onItemPress,
  }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
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
            {serviceDesc && serviceDesc}
          </Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.textServiceCharges}>
              {serviceCharges && serviceCharges}
            </Text>
            <Button
              buttonStyle={{height: 17, width: 20}}
              imageStyle={{height: 17, width: 20}}
              svg={<Cart />}
              onPress={() => onCartPress && onCartPress()}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default ServicesListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
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
    color: Colors.steelBlue,
    lineHeight: 21,
  },
  textServiceDesc: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 10,
    color: Colors.steelBlue,
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  textServiceCharges: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: Colors.darkOrange,
    lineHeight: 25,
  },
});
