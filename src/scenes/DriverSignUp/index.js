import React, {memo, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {Form, Item, Label, Input} from 'native-base';
import Button from '../../components/Button';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Formik} from 'formik';
import AppLoader from '../../components/AppLoader';
import {errorMessage, successMessage} from '../../redux/utils/alerts';
import {useDispatch, useSelector} from 'react-redux';
import {validationDriverSchemaSignUp} from '../../redux/utils/validation';
import allActions from '../../redux/actions/index';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';

const hasNotch = DeviceInfo.hasNotch();

const DriverSignUp = memo(({navigation}) => {
  const refFormik = useRef(null);
  const dispatch = useDispatch();
  const meta = useSelector((state) => state.auth.meta);
  const form = {
    fields: {
      email: '',
      fName: '',
      phoneNo: '',
    },
  };
  const handleSignUpPress = useCallback(
    (values) => {
      const params = {
        email: values.email,
        name: values.fName,
        contactNumber: values.phoneNo,
        licence: Math.floor(Math.random() * 899999 + 100000),
        type: 'driver',
      };

      if (values.referralCode) {
        params.referralCode = values.referralCode;
      }

      dispatch(
        allActions.authActions.driverSignUp({
          params,
          onSuccess: () => {
            successMessage({
              message: 'You have been registered to LaundrEZ successfully',
            });
            navigation.navigate('DriverLogin');
          },
          onFail: (_error) => {
            errorMessage({
              message: _error?.message || _error?.Message,
            });
          },
        }),
      );
    },
    [dispatch, navigation],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <AppHeader headerStyle={{height: hasNotch ? 192 : 150}}>
          <View style={styles.registerHeader}>
            <Text style={styles.textGetRegistered}>Get Register with</Text>
            <Text style={styles.textLaundrEZ}>LaundrEZ</Text>
          </View>
        </AppHeader>

        {meta.authLoading ? (
          <AppLoader />
        ) : (
          <Formik
            innerRef={refFormik}
            enableReinitialize={true}
            initialValues={form.fields}
            onSubmit={(values) => handleSignUpPress(values)}
            validationSchema={validationDriverSchemaSignUp}>
            {({values, handleChange, errors, touched, setFieldValue}) => (
              <View style={{flex: 1}}>
                <Form style={styles.formContainer}>
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>Full Name</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.fName}
                      onChangeText={handleChange('fName')}
                    />
                  </Item>
                  {touched.fName && errors.fName && (
                    <Text style={styles.fieldError}>{errors.fName}</Text>
                  )}
                  <Item stackedLabel>
                    <TextInputMask
                      value={values.phoneNo}
                      placeholder="Phone Number"
                      keyboardType="number-pad"
                      style={[{...styles.fieldInput}, styles.phoneNumField]}
                      onChangeText={(extracted) => {
                        setFieldValue('phoneNo', extracted);
                      }}
                      mask={'+1 ([000]) [000] [00] [00]'}
                    />
                  </Item>
                  {touched.phoneNo && errors.phoneNo && (
                    <Text style={styles.fieldError}>{errors.phoneNo}</Text>
                  )}
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>Email Address</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                    />
                  </Item>
                  {touched.email && errors.email && (
                    <Text style={styles.fieldError}>{errors.email}</Text>
                  )}
                </Form>
                <View style={styles.bottomView}>
                  <Text style={{...styles.haveAccountText, marginVertical: 15}}>
                    By signing up, you accept our{' '}
                    <Text
                      onPress={() =>
                        navigation.navigate('TermsAndPrivacy', {type: 'terms'})
                      }
                      style={styles.signInButtonText}>
                      Terms and Conditions{' '}
                    </Text>
                    and{' '}
                    <Text
                      onPress={() =>
                        navigation.navigate('TermsAndPrivacy', {
                          type: 'privacy',
                        })
                      }
                      style={styles.signInButtonText}>
                      Privacy Policy
                    </Text>
                  </Text>
                  <LinearGradient
                    colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
                    start={{y: 0.0, x: 1.0}}
                    style={{width: '100%', marginLeft: 12, marginTop: 5}}
                    end={{y: 0.0, x: 0.0}}>
                    <Button
                      text="SignUp"
                      buttonStyle={styles.signUpButton}
                      textStyle={styles.signUpButtonText}
                      onPress={() => refFormik.current.handleSubmit()}
                    />
                  </LinearGradient>
                  <Text style={styles.haveAccountText}>
                    Already Have an Account{' '}
                    <Text
                      onPress={() => navigation.goBack()}
                      style={styles.signInButtonText}>
                      Sign In
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        )}
      </View>
    </KeyboardAvoidingView>
  );
});

export default DriverSignUp;

const styles = StyleSheet.create({
  textGetRegistered: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 21,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 38,
  },
  textLaundrEZ: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 40,
    letterSpacing: 0.8,
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 42,
  },
  registerHeader: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
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
    marginLeft: 20,
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
  },
  signUpButton: {
    height: 50,
    width: '100%',
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
    marginVertical: 30,
  },
  haveAccountText: {
    color: '#2C436A',
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 21,
    fontFamily: Fonts.poppinsMedium,
    textAlign: 'center',
    marginVertical: 25,
    marginLeft: 10,
  },
  signInButtonText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 12,
    letterSpacing: 0.3,
    color: '#ED8F31',
  },
  buttonLoginText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 27,
  },
  bottomView: {
    bottom: 0,
    left: 25,
    right: 50,
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
  },
  phoneNumField: {
    width: Dimensions.get('window').width - 75,
    marginTop: 20,
    height: 40,
    paddingBottom: 0,
    fontSize: 12,
  },
});
