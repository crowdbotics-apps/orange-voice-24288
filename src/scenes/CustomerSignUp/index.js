import React, {memo, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {Form, Item, Label, Input} from 'native-base';
import Button from '../../components/Button';
import {Fonts} from '../../theme/fonts';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Formik} from 'formik';
import AppLoader from '../../components/AppLoader';
import {errorMessage, successMessage} from '../../redux/utils/alerts';
import {useDispatch, useSelector} from 'react-redux';
import {validationSchemaSignUp} from '../../redux/utils/validation';
import allActions from '../../redux/actions/index';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';
import PasswordTextBox from '../../components/PasswordTextBox';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();

const CustomerSignUp = memo(({navigation}) => {
  const [userPhoneNo, setUserPhoneNo] = useState();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);

  const dispatch = useDispatch();
  const meta = useSelector((state) => state.auth.meta);
  const form = {
    fields: {
      email: '',
      password: '',
      lName: '',
      fName: '',
      phoneNo: '',
      postalCode: '',
    },
  };
  const handleSignUpPress = useCallback((values) => {
    const params = {
      email: values.email,
      password: values.password,
      firstName: values.fName,
      lastName: values.lName,
      phone_number: '+1' + values.phoneNo,
      postal_code: values.postalCode,
      type: 'customer',
    };

    if (values.referralCode) {
      params.referral_code = values.referralCode;
    }

    dispatch(
      allActions.authActions.signUp({
        params,
        onSuccess: () => {
          successMessage({
            message: 'You have been registered to LaundrEZ successfully',
          });
          navigation.navigate('CustomerLogin');
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  }, []);

  const FbLoginHandler = (setFieldValue) => {
    LoginManager.logInWithPermissions(['public_profile, email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            const infoRequest = new GraphRequest(
              '/me?fields=email,first_name,last_name',
              null,
              async (error, result) => {
                if (error) {
                  alert('Error fetching data: ' + error.toString());
                } else {
                  const {email, first_name, last_name} = result;
                  setFieldValue('email', email);
                  setFieldValue('fName', first_name);
                  setFieldValue('lName', last_name);
                  LoginManager.logOut();
                }
              },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handlePress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
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
            enableReinitialize={true}
            initialValues={form.fields}
            onSubmit={(values) => handleSignUpPress(values)}
            validationSchema={validationSchemaSignUp}>
            {({
              values,
              handleChange,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
            }) => (
              <ScrollView
                style={{flex: 1}}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <Form style={styles.formContainer}>
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>First Name</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.fName}
                      onChangeText={handleChange('fName')}
                    />
                  </Item>
                  {touched.fName && errors.fName ? (
                    <Text style={styles.fieldError}>{errors.fName}</Text>
                  ) : null}
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>Last Name</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.lName}
                      onChangeText={handleChange('lName')}
                    />
                  </Item>
                  {touched.lName && errors.lName ? (
                    <Text style={styles.fieldError}>{errors.lName}</Text>
                  ) : null}
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
                      }}
                      mask={'+1 ([000]) [000] [00] [00]'}
                    />
                  </Item>
                  {touched.phoneNo && errors.phoneNo ? (
                    <Text style={styles.fieldError}>{errors.phoneNo}</Text>
                  ) : null}
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
                  {touched.email && errors.email ? (
                    <Text style={styles.fieldError}>{errors.email}</Text>
                  ) : null}

                  <PasswordTextBox
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />

                  {touched.password && errors.password ? (
                    <Text style={styles.fieldError}>{errors.password}</Text>
                  ) : null}
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>Postal Code</Label>
                    <Input
                      style={styles.fieldInput}
                      maxLength={6}
                      value={values.postalCode}
                      onChangeText={handleChange('postalCode')}
                    />
                  </Item>
                  {touched.postalCode && errors.postalCode ? (
                    <Text style={styles.fieldError}>{errors.postalCode}</Text>
                  ) : null}

                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>Referral Code</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.referralCode}
                      onChangeText={handleChange('referralCode')}
                    />
                  </Item>

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
                    colors={[colors.lightOrange, colors.darkOrange]}
                    start={{y: 0.0, x: 1.0}}
                    style={{width: '100%', marginLeft: 12, marginTop: 5}}
                    end={{y: 0.0, x: 0.0}}>
                    <Button
                      text="SignUp"
                      buttonStyle={styles.signUpButton}
                      textStyle={styles.signUpButtonText}
                      onPress={handleSubmit}
                    />
                  </LinearGradient>

                  <Button
                    text="Sign Up with Facebook"
                    imageStyle={styles.imageFb}
                    image={require('../../../assets/img/facebook.png')}
                    buttonStyle={styles.buttonFb}
                    textStyle={styles.buttonLoginText}
                    onPress={() => FbLoginHandler(setFieldValue)}
                  />
                </Form>
                <Text style={styles.haveAccountText}>
                  Already Have an Account{' '}
                  <Text
                    onPress={() => navigation.goBack()}
                    style={styles.signInButtonText}>
                    Sign In
                  </Text>
                </Text>
              </ScrollView>
            )}
          </Formik>
        )}
      </View>
    </KeyboardAvoidingView>
  );
});

export default CustomerSignUp;

const _styles = (colors) =>
  StyleSheet.create({
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
      color: colors.steelBlue,
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
      flex: 1,
      justifyContent: 'space-between',
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
      color: colors.steelBlue,
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
      color: colors.darkOrange,
    },
    buttonFb: {
      height: 50,
      width: '100%',
      marginTop: 15,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.fbBlue,
    },
    imageFb: {
      height: 15,
      resizeMode: 'contain',
      marginRight: 10,
      top: -2,
    },
    buttonLoginText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 16,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 27,
    },
  });
