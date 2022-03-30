import React, {memo, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Form, Item, Label, Input, CheckBox, Icon} from 'native-base';
import {Picker} from '@react-native-community/picker';
import {Fonts} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import {Formik} from 'formik';
import {validationSchemaCreditCard} from '../../redux/utils/validation';
import moment from 'moment';
import {errorMessage} from '../../redux/utils/alerts';
import {BackArrow} from '../../../assets/img/backArrow';
import {useDispatch} from 'react-redux';
import allActions from '../../redux/actions';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CustomerPaymentDetails = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const isStatic = navigation.getParam('static', false);
  const card = navigation.getParam('card', {});

  const {cardNumber = '', cvvNumber = '', expiryMonth, expiryYear} = card;

  const handleSavePress = useCallback(async (values) => {
    const params = {
      // mandatory
      cardNumber: values.cardNumber,
      expiryMonth: Number(values.month),
      expiryYear: Number(values.year),
      cvvNumber: values.cvv,
      rememberDetails: true,
    };

    dispatch(
      allActions.paymentActions.addCard({
        params,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
        onSuccess: () => {
          dispatch(allActions.paymentActions.fetchAllCards({}));
          navigation.goBack();
        },
      }),
    );
  }, []);

  const getYears = () => {
    const years = [];
    const dateStart = moment();
    const dateEnd = moment().add(15, 'y');
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      years.push(dateStart.format('YYYY'));
      dateStart.add(1, 'year');
    }
    return years;
  };

  const form = {
    fields: {
      cardNumber: cardNumber,
      month: expiryMonth ? `${expiryMonth}` : '',
      year: expiryYear ? `${expiryYear}` : '',
      cvv: cvvNumber,
    },
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        headerTitle="Payment Details"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<BackArrow />}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={form.fields}
        onSubmit={(values) => handleSavePress(values)}
        validationSchema={validationSchemaCreditCard}>
        {({values, handleChange, errors, touched, handleSubmit}) => (
          <Form style={styles.formContainer}>
            <View
              style={{
                marginLeft: 15,
                borderBottomWidth: 0.3,
                borderBottomColor: '#949eae',
                paddingBottom: 10,
              }}>
              <Text style={styles.fieldLabel}>Card Number</Text>
              <TextInput
                style={styles.fieldInput}
                value={
                  isStatic
                    ? `XXXX XXXX XXXX ${values.cardNumber}`
                    : values.cardNumber
                }
                keyboardType="numeric"
                onChangeText={handleChange('cardNumber')}
              />
              <View
                style={{flexDirection: 'row', marginTop: 10, marginLeft: -3}}>
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_5.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_4.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_3.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_2.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_7.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_6.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_8.png')}
                />
                <Image
                  style={{height: 14}}
                  resizeMode="contain"
                  source={require('../../../assets/img/payment_1.png')}
                />
              </View>
            </View>
            {touched.cardNumber && errors.cardNumber ? (
              <Text style={styles.fieldError}>{errors.cardNumber}</Text>
            ) : null}

            <Text
              style={{
                fontFamily: Fonts.poppinsRegular,
                fontSize: 16,
                letterSpacing: 0.3,
                marginLeft: 15,
                textAlign: 'left',
                marginVertical: 10,
                color: colors.darkOrange,
                lineHeight: 25,
              }}>
              Expiry
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 15}}>
              <View
                style={{
                  justifyContent: 'center',
                  borderBottomWidth: 2,
                  borderColor: 'rgba(148, 158, 174, 0.2)',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.poppinsRegular,
                    fontSize: 12,
                    letterSpacing: 0.2,
                    color: '#949eae',
                    lineHeight: 18,
                  }}>
                  Month
                </Text>
                <Picker
                  enabled={!isStatic}
                  mode="dropdown"
                  iosIcon={
                    <Icon
                      name="angle-down"
                      type={'FontAwesome5'}
                      style={{position: 'absolute', marginLeft: 130}}
                    />
                  }
                  style={{width: isAndroid ? 155 : 150}}
                  placeholder="Select Month"
                  selectedValue={values.month}
                  onValueChange={handleChange('month')}
                  placeholderStyle={{
                    fontFamily: Fonts.poppinsMedium,
                    fontSize: 14,
                    letterSpacing: 0.3,
                    color: colors.steelBlue,
                    lineHeight: 21,
                    width: isAndroid ? 155 : 150,
                  }}
                  textStyle={{
                    left: -16,
                    fontFamily: Fonts.poppinsMedium,
                    fontSize: 14,
                    letterSpacing: 0.3,
                    color: colors.steelBlue,
                    lineHeight: 21,
                  }}
                  placeholderIconColor="#007aff">
                  {monthNames.map((item, index) => (
                    <Picker.Item label={item} value={`${index + 1}`} />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  marginLeft: 25,
                  borderBottomWidth: 2,
                  borderColor: 'rgba(148, 158, 174, 0.2)',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.poppinsRegular,
                    fontSize: 12,
                    letterSpacing: 0.2,
                    textAlign: 'left',
                    color: '#949eae',
                  }}>
                  Year
                </Text>
                <Picker
                  enabled={!isStatic}
                  mode="dropdown"
                  iosIcon={
                    <Icon
                      name="angle-down"
                      type={'FontAwesome5'}
                      style={{position: 'absolute', marginLeft: 130}}
                    />
                  }
                  placeholder="Select Year"
                  style={{width: isAndroid ? 155 : 150}}
                  placeholderStyle={{
                    fontFamily: Fonts.poppinsMedium,
                    fontSize: 14,
                    letterSpacing: 0.3,
                    color: colors.steelBlue,
                    lineHeight: 21,
                    width: isAndroid ? 155 : 150,
                  }}
                  textStyle={{
                    left: -16,
                    fontFamily: Fonts.poppinsMedium,
                    fontSize: 14,
                    letterSpacing: 0.3,
                    color: colors.steelBlue,
                    lineHeight: 21,
                  }}
                  selectedValue={values.year}
                  onValueChange={handleChange('year')}
                  placeholderIconColor="#007aff">
                  {getYears()?.map((item) => (
                    <Picker.Item label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{...styles.fieldError, flex: 1}}>
                {errors.month}
              </Text>
              <Text style={{...styles.fieldError, flex: 1}}>{errors.year}</Text>
            </View>
            <Item
              floatingLabel
              style={{
                marginTop: 15,
                marginBottom: 15,
              }}>
              <Label style={styles.fieldLabel}>CVV</Label>
              <Input
                disabled={isStatic}
                style={styles.fieldInput}
                value={values.cvv}
                keyboard="numeric"
                onChangeText={handleChange('cvv')}
              />
            </Item>
            {touched.cvv && errors.cvv ? (
              <Text style={styles.fieldError}>{errors.cvv}</Text>
            ) : null}

            {!isStatic ? (
              <LinearGradient
                colors={[colors.lightOrange, colors.darkOrange]}
                start={{y: 0.0, x: 1.0}}
                style={{marginLeft: 10, marginTop: 20}}
                end={{y: 0.0, x: 0.0}}>
                <Button
                  text={navigation.getParam('buttonTitle')}
                  buttonStyle={styles.buttonSave}
                  textStyle={styles.buttonSaveText}
                  onPress={handleSubmit}
                />
              </LinearGradient>
            ) : null}
          </Form>
        )}
      </Formik>

      <View style={{flex: 1}} />

      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={[
            styles.fieldLabel,
            {fontSize: 11, width: 150, textAlign: 'center'},
          ]}>
          Secured By
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Image
            style={{height: 35}}
            resizeMode="contain"
            source={require('../../../assets/img/secure_by_2.png')}
          />
          <View style={{width: 20}} />
          <Image
            style={{height: 35}}
            resizeMode="contain"
            source={require('../../../assets/img/secure_by_1.png')}
          />
        </View>
        <View style={{height: 20}} />
      </SafeAreaView>
    </View>
  );
});

export default CustomerPaymentDetails;

const _styles = (colors) =>
  StyleSheet.create({
    formContainer: {
      marginRight: 40,
      marginLeft: 25,
      paddingVertical: 15,
    },
    fieldLabel: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: colors.fieldLabel,
      lineHeight: 18,
    },
    fieldInput: {
      fontFamily: Fonts.poppinsMedium,
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.steelBlue,
      lineHeight: 21,
    },
    fieldError: {
      fontSize: 10,
      alignSelf: 'flex-start',
      marginLeft: 15,
      color: 'red',
    },
    buttonSave: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonSaveText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 27,
    },
  });
