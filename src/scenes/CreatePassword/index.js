import React, {memo} from 'react';
import {StyleSheet, View, Text, Image, Platform} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import {Form, Item, Label, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import DeviceInfo from 'react-native-device-info';
import AppHeader from '../../components/AppHeader';
import FastImage from 'react-native-fast-image';

const hasNotch = DeviceInfo.hasNotch();
const isTablet = DeviceInfo.isTablet();
const isAndroid = Platform.OS === 'android';

const CreatePassword = memo(({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader headerStyle={styles.customerCreatePasswordHeader}>
        <View style={styles.authHeader}>
          <FastImage
            style={styles.customerCreatePasswordHeaderImage}
            source={require('../../../assets/img/app_icon_big.png')}
          />
        </View>
      </AppHeader>
      <View style={{flex: 1}}>
        <Text style={styles.textCreatePassword}>Create Password</Text>
        <Form style={styles.formContainer}>
          <Item floatingLabel>
            <Label style={styles.fieldLabel}>New Password</Label>
            <Input style={styles.fieldInput} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.fieldLabel}>Re-enter New Password</Label>
            <Input style={styles.fieldInput} />
          </Item>
          <LinearGradient
            colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
            start={{y: 0.0, x: 1.0}}
            style={{width: '100%', marginTop: 10, marginLeft: 7}}
            end={{y: 0.0, x: 0.0}}>
            <Button
              text="Submit"
              buttonStyle={styles.buttonCreatePassword}
              textStyle={styles.buttonCreatePasswordText}
              onPress={() => navigation.goBack()}
            />
          </LinearGradient>
        </Form>
      </View>
    </View>
  );
});

export default CreatePassword;

const styles = StyleSheet.create({
  customerCreatePasswordHeader: {
    height: hasNotch && !isTablet ? 280 : !hasNotch && !isTablet ? 240 : 350,
  },
  customerCreatePasswordHeaderImage: {
    height: isTablet ? '85%' : isAndroid ? '79%' : '81%',
    width: isTablet ? '42%' : '53.5%',
  },
  authHeader: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginRight: 40,
    marginLeft: 25,
    justifyContent: 'space-between',
    height: 255,
  },
  fieldLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    letterSpacing: 0.2,
    color: Colors.fieldLabel,
    lineHeight: 18,
  },
  fieldInput: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 14,
    letterSpacing: 0.3,
    color: Colors.steelBlue,
    lineHeight: 21,
  },
  textCreatePassword: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 30,
    marginTop: '8%',
    letterSpacing: 0.6,
    textAlign: 'center',
    color: Colors.darkOrange,
    lineHeight: 46,
  },
  buttonCreatePassword: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCreatePasswordText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 27,
  },
});
