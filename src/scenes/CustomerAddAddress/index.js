import React, {memo, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Form, Item, Label, Input, CheckBox, Icon} from 'native-base';
import {Picker} from '@react-native-community/picker';
import Button from '../../components/Button';
import {Fonts} from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import {Cart} from '../../../assets/img/cart';
import GooglePlacesInput, {
  getAddressComponents,
} from '../../components/GooglePlacesInput';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {successMessage, errorMessage} from '../../redux/utils/alerts';
import {Formik} from 'formik';
import {validationSchemaAddress} from '../../redux/utils/validation';
import TextInputMask from 'react-native-text-input-mask';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const headerStyle =
  hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60;

const Properties = ['Residential', 'Commercial', 'Industry'];

const CustomerAddAddress = memo(({navigation}) => {
  const address = navigation.getParam('address');
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user?.user);

  const [primaryChecked, setPrimaryChecked] = useState(address?.isPrimary);
  const [latLong, setLatLong] = useState({
    lng: address?.lng,
    lat: address?.lat,
  });
  const [mainAddress, setMainAddress] = useState(address?.mainAddress);
  const [userPhoneNo, setUserPhoneNo] = useState(address?.phone);
  const [saveTapped, setSaveTapped] = useState(false);

  const primaryCheckCallback = useCallback(() => {
    setPrimaryChecked(!primaryChecked);
  }, [primaryChecked]);

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const form = {
    fields: {
      phoneNo: address?.phone,
      postalCode: address?.postalCode,
      suiteNumber: address?.suite,
      state: address?.state,
      city: address?.city,
      propertyType: address?.type,
      mainAddress: address?.mainAddress,
      buzzerCode: address?.buzzerCode,
    },
  };

  const generateErrors = (values) => {
    let errors = {};

    if (!values.mainAddress && !mainAddress) {
      errors.mainAddress = 'Main address is required';
    }
    if (!values.postalCode) {
      errors.postalCode = 'Postal code is required';
    }
    if (!values.phoneNo) {
      errors.phoneNo = 'Phone number is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.propertyType) {
      errors.propertyType = 'Property type is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }

    return errors;
  };

  const handleSavePress = (values) => {
    let errors = generateErrors(values);

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const params = {
      profile: user?.profile_id,
      mainAddress: mainAddress,
      type: values.propertyType,
      suite: values.suiteNumber,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      phone: userPhoneNo,
      lng: `${latLong.lng}`,
      lat: `${latLong.lat}`,
      isPrimary: primaryChecked,
      id: address?.id,
      buzzerCode: values.buzzerCode,
    };

    const onSuccess = () => {
      successMessage({
        message: `Address has been ${
          address ? 'updated' : 'added'
        } successfully`,
      });
      const from = navigation.getParam('from');
      from === 'pickAndDropScreen'
        ? navigation.goBack()
        : navigation.navigate('CustomerHome');
    };
    const onFail = (_error) => {
      errorMessage({
        message: _error?.message || _error?.Message,
      });
    };

    if (address) {
      dispatch(
        allActions.addressActions.updateUserAddress({
          params,
          onSuccess,
          onFail,
        }),
      );

      return;
    }

    dispatch(
      allActions.addressActions.saveUserAddress({
        params,
        onSuccess,
        onFail,
      }),
    );
  };

  const handleSelectedAddress = (value, setFieldValue, values) => {
    const {address_components, geometry} = value.details;
    setLatLong(geometry.location);
    setMainAddress(value.data.description);
    setFieldValue('mainAddress', value.data.description);
    setFieldValue(
      'postalCode',
      getAddressComponents(address_components, 'postal_code'),
    );
    setFieldValue(
      'state',
      getAddressComponents(address_components, 'administrative_area_level_1'),
    );
    setFieldValue('city', getAddressComponents(address_components, 'locality'));

    const vals = {
      ...values,
      mainAddress: value.data.description,
      talCode: getAddressComponents(address_components, 'postal_code'),
      state: getAddressComponents(
        address_components,
        'administrative_area_level_1',
      ),
      city: getAddressComponents(address_components, 'locality'),
    };

    const errors = generateErrors(vals);
    setFormErrors(errors);
  };

  const resetMainAddress = (setFieldValue, values) => {
    setMainAddress(undefined);
    setUserPhoneNo(undefined);
    setPrimaryChecked(false);
    setFieldValue('mainAddress', undefined);
    setFieldValue('postalCode', undefined);
    setFieldValue('state', undefined);
    setFieldValue('city', undefined);
    setFieldValue('suiteNumber', undefined);
    setFieldValue('phoneNo', undefined);
    setFieldValue('propertyType', undefined);
    setFieldValue('buzzerCode', undefined);

    const errors = generateErrors(values);
    setFormErrors({
      ...errors,
      mainAddress: undefined,
      postalCode: undefined,
      state: undefined,
      city: undefined,
      suiteNumber: undefined,
      phoneNo: undefined,
      propertyType: undefined,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <AppHeader
          headerTitle="Add Address"
          headerStyle={{height: headerStyle}}
          leftButtonImage={<BackArrow />}
          rightButtonImage={
            <View style={{minWidth: 25, height: 25}}>
              <Cart color={Colors.white} height={22} width={35} />
              {cart.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    left: -3,
                    paddingHorizontal: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: 15,
                    minWidth: 15,
                    borderRadius: 7.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'rgba(230,137,47,1)',
                      zIndex: 100,
                    }}>
                    {cart.length}
                  </Text>
                </View>
              )}
            </View>
          }
          onRightButtonPress={() => navigation.navigate('CustomerOrderBasket')}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <Formik
          enableReinitialize
          initialValues={form.fields}
          onSubmit={(values) => handleSavePress(values)}
          validationSchema={validationSchemaAddress}>
          {({values, setFieldValue}) => [
            <View style={{marginHorizontal: 35}} key={'main-address'}>
              <Item stackedLabel>
                <GooglePlacesInput
                  defaultValue={address?.mainAddress}
                  onTextDeleted={() => resetMainAddress(setFieldValue, values)}
                  address={(value) => {
                    handleSelectedAddress(value, setFieldValue, values);
                  }}
                />
              </Item>
            </View>,
            <View style={{paddingLeft: 25}}>
              {formErrors.mainAddress && (
                <Text style={styles.fieldError}>{formErrors.mainAddress}</Text>
              )}
            </View>,
            <ScrollView
              key={'main-components'}
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 10,
                paddingBottom: hasNotch ? 30 : 10,
              }}>
              <Form style={styles.formContainer}>
                <Item floatingLabel>
                  <Label style={styles.fieldLabel}>Suite Number</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.suiteNumber}
                    onChangeText={(text) => {
                      setFieldValue('suiteNumber', text);
                      if (saveTapped) {
                        setFormErrors(generateErrors(values));
                      }
                    }}
                  />
                </Item>
                {formErrors.suiteNumber && (
                  <Text style={styles.fieldError}>
                    {formErrors.suiteNumber}
                  </Text>
                )}
                <Item floatingLabel>
                  <Label style={styles.fieldLabel}>Postal Code</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.postalCode}
                    maxLength={6}
                    onChangeText={(text) => {
                      setFieldValue('postalCode', text);
                      if (saveTapped) {
                        setFormErrors(generateErrors(values));
                      }
                    }}
                  />
                </Item>
                {formErrors.postalCode && (
                  <Text style={styles.fieldError}>{formErrors.postalCode}</Text>
                )}
                <Item floatingLabel>
                  <Label style={styles.fieldLabel}>Province</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.state}
                    onChangeText={(text) => {
                      setFieldValue('state', text);
                      if (saveTapped) {
                        setFormErrors(generateErrors(values));
                      }
                    }}
                  />
                </Item>
                {formErrors.state && (
                  <Text style={styles.fieldError}>{formErrors.state}</Text>
                )}
                <Item floatingLabel>
                  <Label style={styles.fieldLabel}>City</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.city}
                    onChangeText={(text) => {
                      setFieldValue('city', text);
                      if (saveTapped) {
                        setFormErrors(generateErrors(values));
                      }
                    }}
                  />
                </Item>
                {formErrors.city && (
                  <Text style={styles.fieldError}>{formErrors.city}</Text>
                )}
                <Item stackedLabel>
                  <TextInputMask
                    value={values.phoneNo}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    style={{
                      ...styles.fieldInput,
                      width: Dimensions.get('window').width - 75,
                      marginTop: 20,
                      height: 40,
                      paddingBottom: 0,
                      fontSize: 12,
                    }}
                    onChangeText={(formatted, extracted) => {
                      console.log(formatted); // +1 (123) 456-78-90
                      console.log(extracted); // 1234567890
                      setUserPhoneNo(formatted);
                      setFieldValue('phoneNo', extracted);
                      if (saveTapped) {
                        setFormErrors(generateErrors(values));
                      }
                    }}
                    mask={'+1 ([000]) [000] [00] [00]'}
                  />
                </Item>
                {formErrors.phoneNo && (
                  <Text style={styles.fieldError}>{formErrors.phoneNo}</Text>
                )}
                <Item style={{marginTop: 25}}>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 2,
                      borderColor: 'rgba(148, 158, 174, 0.2)',
                    }}>
                    <Text style={styles.fieldLabel}>Property Type</Text>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="angle-down" type={'FontAwesome5'} />}
                      placeholder="Select Type"
                      style={{width: '95%'}}
                      placeholderStyle={{
                        fontFamily: Fonts.poppinsMedium,
                        fontSize: 14,
                        letterSpacing: 0.3,
                        color: '#2c436a',
                        lineHeight: 21,
                      }}
                      textStyle={{
                        left: -16,
                        fontFamily: Fonts.poppinsMedium,
                        fontSize: 14,
                        letterSpacing: 0.3,
                        color: '#2c436a',
                        lineHeight: 21,
                      }}
                      selectedValue={values.propertyType}
                      onValueChange={(value) => {
                        setFieldValue('propertyType', value);
                        if (saveTapped) {
                          setFormErrors(
                            generateErrors({
                              ...values,
                              propertyType: value,
                            }),
                          );
                        }
                      }}
                      placeholderIconColor="#007aff">
                      {Properties?.map((item, index) => (
                        <Picker.Item label={item} value={item} />
                      ))}
                    </Picker>
                  </View>
                </Item>
                {formErrors.propertyType && (
                  <Text style={styles.fieldError}>
                    {formErrors.propertyType}
                  </Text>
                )}

                <Item floatingLabel>
                  <Label style={styles.fieldLabel}>Buzzer Code</Label>
                  <Input
                    style={styles.fieldInput}
                    value={values.buzzerCode}
                    onChangeText={(text) => {
                      setFieldValue('buzzerCode', text);
                    }}
                  />
                </Item>

                <TouchableOpacity
                  onPress={primaryCheckCallback}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <CheckBox
                    disabled
                    style={{
                      borderRadius: 0,
                      backgroundColor: primaryChecked
                        ? '#ED8F31'
                        : 'transparent',
                      borderColor: primaryChecked ? 'transparent' : '#2c436a',
                    }}
                    checked={primaryChecked}
                  />
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 25,
                      fontFamily: Fonts.poppinsMedium,
                      fontSize: 14,
                      letterSpacing: 0.3,
                      color: '#2c436a',
                      lineHeight: 21,
                    }}>
                    Use as primary Address
                  </Text>
                </TouchableOpacity>
                <Button
                  text="Save"
                  buttonStyle={styles.signUpButton}
                  textStyle={styles.signUpButtonText}
                  onPress={() => {
                    setSaveTapped(true);
                    handleSavePress(values);
                  }}
                />
              </Form>
            </ScrollView>,
          ]}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
});

export default CustomerAddAddress;

const styles = StyleSheet.create({
  fieldLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    letterSpacing: 0.2,
    color: '#949EAE',
    lineHeight: 18,
  },
  fieldInput: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#2C436A',
    lineHeight: 21,
  },
  fieldError: {
    fontSize: 10,
    marginLeft: 15,
    top: 2,
    alignSelf: 'flex-start',
    color: 'red',
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  formContainer: {
    marginRight: 40,
    marginLeft: 25,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  signUpButton: {
    marginTop: 30,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#ED8F31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontFamily: Fonts.poppinsRegular,
    color: '#FFFFFF',
    lineHeight: 27,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    width: '87%',
  },
  haveAccountText: {
    color: '#2C436A',
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 21,
    fontFamily: Fonts.poppinsMedium,
  },
  signInButtonText: {
    marginLeft: 5,
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#ED8F31',
  },
});
