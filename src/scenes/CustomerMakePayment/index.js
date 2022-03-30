import React, {memo, useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Form, Item, Label, Input, CheckBox, Icon} from 'native-base';
import {Picker} from '@react-native-community/picker';
import {Fonts} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import TickOrange from '../../../assets/img/tick_orange.svg';
import {Formik} from 'formik';
import {validationSchemaCreditCard} from '../../redux/utils/validation';
import moment from 'moment';
import {errorMessage} from '../../redux/utils/alerts';
import {BackArrow} from '../../../assets/img/backArrow';
import {useDispatch, useSelector} from 'react-redux';
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

const CustomerMakePayment = memo(({navigation}) => {
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const [rememberDetails, setRememberDetails] = useState(false);
  const [cardSelected, setCardSelected] = useState(null);

  const formRef = useRef(null);

  const form = {
    fields: {
      cardNumber: undefined,
      month: undefined,
      year: undefined,
      cvv: undefined,
    },
  };

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.payment.cards);

  useEffect(() => {
    fetchAllCards();
  }, []);

  useEffect(() => {
    form.fields.cardNumber = undefined;
    form.fields.month = undefined;
    form.fields.year = undefined;
    form.fields.cvv = undefined;
  }, [cardSelected]);

  const fetchAllCards = () => {
    dispatch(
      allActions.paymentActions.fetchAllCards({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleOrderPayment = (cardId) => {
    dispatch(
      allActions.orderActions.makeOrderPayment({
        params: {
          totalAmount: navigation.getParam('totalAmount'),
          orderNumber: navigation.getParam('orderNumber'),
          orderId: navigation.getParam('orderId'),
          cardId,
        },
        onSuccess: () => {
          dispatch({
            type: 'CLEAR_ALL',
            onSuccess: () => {
              navigation.navigate('CustomerPaymentDone', {
                orderAmount: navigation.getParam('totalAmount'),
                orderNumber: navigation.getParam('orderNumber'),
              });
            },
            onFail: () => {
              errorMessage({
                message: 'Some error occured. Please try again.',
              });
            },
          });
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleSavePress = useCallback(async (values) => {
    const params = {
      // mandatory
      cardNumber: values.cardNumber,
      expiryMonth: Number(values.month),
      expiryYear: Number(values.year),
      cvvNumber: values.cvv,
      rememberDetails: rememberDetails,
    };

    dispatch(
      allActions.paymentActions.addCard({
        params,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
        onSuccess: (response) => {
          handleOrderPayment(response.cardId);
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

  const renderFooter = () => {
    return (
      <View>
        <Text
          style={{
            fontFamily: Fonts.poppinsRegular,
            fontSize: 14,
            letterSpacing: 0.3,
            marginLeft: 30,
            textAlign: 'left',
            marginTop: 20,
            color: colors.darkOrange,
            lineHeight: 25,
            marginBottom: 10,
          }}>
          Add New Card
        </Text>

        <Formik
          innerRef={formRef}
          enableReinitialize={true}
          initialValues={form.fields}
          onSubmit={(values) => handleSavePress(values)}
          validationSchema={validationSchemaCreditCard}>
          {({values, handleChange, errors, touched, handleSubmit}) => [
            <View pointerEvents={!cardSelected ? 'auto' : 'none'}>
              <Form style={styles.formContainer}>
                <View
                  style={{
                    marginLeft: 15,
                    borderBottomWidth: 0.3,
                    borderBottomColor: '#949eae',
                    paddingBottom: 10,
                    marginBottom: 20,
                  }}>
                  <Text style={styles.fieldLabel}>Card Number</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={values.cardNumber}
                    keyboardType="numeric"
                    onChangeText={handleChange('cardNumber')}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: -3,
                    }}>
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
                      mode="dropdown"
                      iosIcon={
                        <Icon
                          name="arrow-down"
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
                  <Text style={{...styles.fieldError, flex: 1}}>
                    {errors.year}
                  </Text>
                </View>
                <Item
                  floatingLabel
                  style={{
                    marginTop: 15,
                    marginBottom: 15,
                  }}>
                  <Label style={styles.fieldLabel}>CVV</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.cvv}
                    keyboard="numeric"
                    onChangeText={handleChange('cvv')}
                  />
                </Item>
                {touched.cvv && errors.cvv ? (
                  <Text style={styles.fieldError}>{errors.cvv}</Text>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    //setOldValues(values);
                    setRememberDetails(!rememberDetails);
                  }}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    alignItems: 'center',
                    marginVertical: 30,
                  }}>
                  <CheckBox
                    disabled
                    style={{
                      borderRadius: 0,
                      backgroundColor: rememberDetails
                        ? colors.darkOrange
                        : 'transparent',
                      borderColor: rememberDetails ? 'transparent' : colors.steelBlue,
                    }}
                    checked={rememberDetails}
                  />
                  <Text style={styles.rememberDetails}>Remember Details</Text>
                </TouchableOpacity>
              </Form>
            </View>,
            <LinearGradient
              colors={[colors.lightOrange, colors.darkOrange]}
              start={{y: 0.0, x: 1.0}}
              end={{y: 0.0, x: 0.0}}
              style={{marginLeft: 30, marginRight: 30, marginTop: 10}}>
              <Button
                text="Proceed"
                buttonStyle={styles.buttonSave}
                onPress={() => {
                  cardSelected
                    ? handleOrderPayment(cardSelected.cardId)
                    : handleSubmit();
                }}
                textStyle={styles.buttonSaveText}
              />
            </LinearGradient>,
          ]}
        </Formik>

        <SafeAreaView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
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
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
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

        <ScrollView style={{flex: 1}}>
          <FlatList
            style={{marginTop: 20}}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
            }}
            keyExtractor={(item, index) => `list-cards${index}`}
            data={cards}
            ListHeaderComponentStyle={{width: '83%'}}
            ListHeaderComponent={() => (
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 14,
                  letterSpacing: 0.3,
                  textAlign: 'left',
                  color: colors.darkOrange,
                  lineHeight: 25,
                }}>
                Select Card
              </Text>
            )}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: Fonts.poppinsRegular,
                  fontSize: 14,
                  paddingTop: 5,
                  letterSpacing: 0.3,
                  lineHeight: 25,
                }}>
                No Card Available
              </Text>
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setCardSelected(cardSelected !== item ? item : null);

                  if (formRef && formRef.current) {
                    setRememberDetails(false);
                    formRef.current.resetForm();
                  }
                }}
                style={styles.cardRowContainer(cardSelected === item)}>
                <View style={{flex: 1}}>
                  <Label style={styles.fieldLabel}>Card {index + 1}</Label>
                  <Text style={styles.fieldInput}>
                    XXXX XXXX XXXX {item.cardNumber}
                  </Text>
                </View>
                {cardSelected === item ? (
                  <TickOrange height={20} width={20} />
                ) : null}
              </TouchableOpacity>
            )}
          />
          {renderFooter()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
});

export default CustomerMakePayment;

const _styles = (colors) =>
  StyleSheet.create({
    formContainer: {
      marginRight: 40,
      marginLeft: 25,
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
    rememberDetails: {
      flex: 1,
      marginLeft: 25,
      fontFamily: Fonts.poppinsMedium,
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.steelBlue,
      lineHeight: 21,
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
    cardRowContainer: (selected) => ({
      width: '80%',
      marginVertical: 5,
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: selected ? colors.darkOrange : 'transparent',
      borderWidth: 2,
      padding: 10,
      borderStyle: 'dashed',
    }),
  });
