import React, {memo} from 'react';
import {StyleSheet, View, Platform, Text, Image} from 'react-native';
import {Colors} from '../../theme/color';
import DeviceInfo from 'react-native-device-info';
import AppHeader from '../../components/AppHeader';
import {Fonts} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';
const headerHeight =
  hasNotch && !isAndroid ? 375 : !hasNotch && !isAndroid ? 220 : 303;

const CustomerPaymentDone = memo(({navigation}) => {
  const orderAmount = navigation.getParam('orderAmount', 0);

  return (
    <View style={styles.screenContainer}>
      <AppHeader headerStyle={{height: headerHeight}}>
        <Text style={styles.headerTitle}>Payment</Text>
      </AppHeader>
      <View style={styles.container}>
        <Image
          style={styles.titleImage}
          source={require('../../../assets/img/payment_received.png')}
        />
        <Text style={styles.amount}>${orderAmount?.toFixed(2)}</Text>
        <Text style={styles.title}>
          {`Payment has been done on behalf of `}
          <Text
            style={{
              fontFamily: Fonts.poppinsSemiBold,
            }}>
            ID: {navigation.getParam('orderNumber')}
          </Text>
        </Text>
        <LinearGradient
          colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
          start={{y: 0.0, x: 1.0}}
          style={{width: '100%', marginTop: 30}}
          end={{y: 0.0, x: 0.0}}>
          <Button
            text="Close"
            buttonStyle={styles.buttonClose}
            textStyle={styles.buttonCloseText}
            onPress={() => navigation.navigate('CustomerHome')}
          />
        </LinearGradient>
      </View>
    </View>
  );
});

export default CustomerPaymentDone;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    paddingVertical: 50,
    paddingHorizontal: 40,
    marginHorizontal: 25,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(44, 67, 106, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 5.3,
    shadowOpacity: 1,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 30,
    letterSpacing: 0.6,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: headerHeight * 0.5,
    lineHeight: 46,
  },
  titleImage: {
    height: 68,
    width: 69,
    marginBottom: 20,
    tintColor: Colors.darkOrange,
  },
  amount: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 30,
    letterSpacing: 0.6,
    textAlign: 'left',
    color: '#ed8f31',
    lineHeight: 46,
  },
  title: {
    width: 250,
    fontFamily: Fonts.poppinsRegular,
    fontSize: 16,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#2c436a',
    lineHeight: 25,
  },
  buttonClose: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCloseText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 27,
  },
});
