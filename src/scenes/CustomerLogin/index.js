import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Fonts} from '../../theme/fonts';
import allActions from '../../redux/actions/index';
import {Form, Item, Label, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import DeviceInfo from 'react-native-device-info';
import AppHeader from '../../components/AppHeader';
import {useDispatch, useSelector} from 'react-redux';
import {errorMessage} from '../../redux/utils/alerts';
import {Formik} from 'formik';
import jwt_decode from 'jwt-decode';
import {validationSchemaLogin} from '../../redux/utils/validation';
import AppLoader from '../../components/AppLoader';
import storage from '../../redux/utils/storage';
import {isNull, isEmpty} from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import {setCredentials} from '../../redux/services/api';
import AppleSignInButton from '../../components/AppleSigninButton';
import PasswordTextBox from '../../components/PasswordTextBox';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

const KEY_CUSTOMER_USER_APPLE_EMAIL = 'KEY_CUSTOMER_USER_APPLE_EMAIL';
const KEY_CUSTOMER_USER_APPLE_FIRST_NAME = 'KEY_CUSTOMER_USER_APPLE_FIRST_NAME';
const KEY_CUSTOMER_USER_APPLE_LAST_NAME = 'KEY_CUSTOMER_USER_APPLE_LAST_NAME';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import FastImage from 'react-native-fast-image';
import ThemeContextProvider from '../../theme/ThemeContext';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isTablet = DeviceInfo.isTablet();
const isAndroid = Platform.OS === 'android';

const CustomerLogin = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const meta = useSelector((state) => state.auth.meta);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      RNSecureKeyStore.setResetOnAppUninstallTo(false);
    }

    storage
      .getData('isFirstTime')
      .then((isFirstTime) => {
        if (!isFirstTime) {
          resetToRoute('OnBoarding');
          setIsScreenLoaded(true);
          SplashScreen.hide();
        } else {
          storage
            .loadCredentials()
            .then(async (credentials) => {
              if (
                !isNull(credentials.access_token) &&
                !isEmpty(credentials.access_token)
              ) {
                setCredentials(credentials.access_token);

                try {
                  const isSocial = await storage.isSocial();
                  const isProfileCompleted = await storage.isProfileCompleted();

                  if (!isProfileCompleted) {
                    navigation.navigate('Profile', {
                      isProfileCompleted: isProfileCompleted,
                      isSocial: isSocial,
                    });
                  } else {
                    navigation.navigate('Customer');
                  }
                } catch (e) {
                  navigation.navigate('Customer');
                }
              }
            })
            .finally(() => {
              setIsScreenLoaded(true);
              SplashScreen.hide();
            });
        }
      })
      .catch((e) => {
        resetToRoute('OnBoarding');
        setIsScreenLoaded(true);
        SplashScreen.hide();
      });
  }, []);

  const resetToRoute = (route, params) => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: route, params: params})],
    });
    navigation.dispatch(resetAction);
  };

  const saveAppleCredentialsToKeychain = async (params) => {
    const {email, firstName, lastName} = params;
    try {
      await RNSecureKeyStore.set(KEY_CUSTOMER_USER_APPLE_EMAIL, email, {
        accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
      });
      await RNSecureKeyStore.set(
        KEY_CUSTOMER_USER_APPLE_FIRST_NAME,
        firstName,
        {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY},
      );
      await RNSecureKeyStore.set(KEY_CUSTOMER_USER_APPLE_LAST_NAME, lastName, {
        accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
      });
    } catch (e) {}
  };

  const getAppleCredentials = async () => {
    try {
      const email = await RNSecureKeyStore.get(KEY_CUSTOMER_USER_APPLE_EMAIL);
      const firstName = await RNSecureKeyStore.get(
        KEY_CUSTOMER_USER_APPLE_FIRST_NAME,
      );
      const lastName = await RNSecureKeyStore.get(
        KEY_CUSTOMER_USER_APPLE_LAST_NAME,
      );
      return {
        email,
        firstName,
        lastName,
      };
    } catch (e) {}

    return undefined;
  };

  const checkAppleCredentialsForEmail = async (params) => {
    const {email, firstName, lastName} = params;
    if (!email) {
      const credentials = await getAppleCredentials();
      return credentials;
    } else {
      await saveAppleCredentialsToKeychain({email, firstName, lastName});
      return params;
    }
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;
      const {email: emailToken} = jwt_decode(identityToken);
      let _email = undefined;
      if (!email) {
        _email = await storage.getData('email');
      }
      if (email || emailToken || _email) {
        await storage.setData('email', email || emailToken || _email);
        let params = {
          SocialPlatform: 'Apple',
          // Token: identityToken,
          email: email || emailToken || _email,
        };
        return handleSocialLogin(params);
      }

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        const {email, fullName, identityToken} = appleAuthRequestResponse;
        const {givenName, familyName} = fullName;

        const credentials = await checkAppleCredentialsForEmail({
          email: email,
          firstName: givenName,
          lastName: familyName,
        });

        if (credentials) {
          let params = {
            SocialPlatform: 'Apple',
            Token: identityToken,
            ...credentials,
          };
          handleSocialLogin(params);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleLoginPress = useCallback((values) => {
    dispatch(
      allActions.authActions.signIn({
        params: {
          userName: values.email,
          password: values.password,
          type: 'user',
        },
        onSuccess: async () => {
          try {
            const playerId = await storage.getData('playerId');
            if (playerId) {
              dispatch(
                allActions.authActions.updatePlayerId({
                  params: {playerId},
                  onSuccess: () => {},
                  onFail: () => {},
                }),
              );
            }
          } catch (e) {
            console.warn(e);
          }
          navigation.navigate('Customer');
        },
        onFail: (_error) => {
          if (_error.status === 418) {
            Alert.alert('', _error?.message || _error?.Message, [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('CustomerForgotPassword');
                },
              },
            ]);
          } else {
            errorMessage({
              message: _error?.message || _error?.Message,
            });
          }
        },
      }),
    );
  }, []);

  const handleSocialLogin = (params) => {
    dispatch(
      allActions.authActions.socialSignIn({
        params,
        onSuccess: async (response) => {
          try {
            const playerId = await storage.getData('playerId');
            if (playerId) {
              dispatch(
                allActions.authActions.updatePlayerId({
                  params: {playerId},
                  onSuccess: () => {},
                  onFail: () => {},
                }),
              );
            }
          } catch (e) {
            console.warn(e);
          }

          const {isProfileCompleted} = response.data;
          if (isProfileCompleted) {
            navigation.navigate('Customer');
          } else {
            navigation.navigate('Profile', {
              isProfileCompleted: isProfileCompleted,
              isSocial: true,
            });
          }
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  //Create response callback.
  const responseInfoCallback = async (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      const {email, first_name, last_name} = result;

      try {
        const data = await AccessToken.getCurrentAccessToken();

        const params = {
          email,
          firstName: first_name,
          lastName: last_name,
          SocialPlatform: 'Facebook',
          token: data.accessToken,
        };

        handleSocialLogin(params);
      } catch (error) {
        alert('Error fetching data: ' + error.toString());
      }
    }
  };

  const FbLoginHandler = () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
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
              responseInfoCallback,
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

  if (!isScreenLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader headerStyle={styles.customerLoginHeader}>
          <View style={styles.authHeader}>
            <FastImage
              resizeMode="contain"
              style={styles.customerLoginHeaderImage}
              source={
                colors.logo
                  ? {uri: colors.logo}
                  : require('../../../assets/img/app_icon_big.png')
              }
            />
          </View>
        </AppHeader>
        {meta.authLoading ? (
          <AppLoader />
        ) : (
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => handleLoginPress(values)}
            validationSchema={validationSchemaLogin}>
            {({values, handleChange, errors, touched, handleSubmit}) => (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                }}>
                <Form style={styles.formContainer}>
                  <Text style={styles.textLogin}>Login</Text>
                  <Item floatingLabel>
                    <Label style={styles.fieldLabel}>User ID/Email</Label>
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
                    label={'Password'}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />

                  {touched.password && errors.password ? (
                    <Text style={styles.fieldError}>{errors.password}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={{width: '100%', marginLeft: 30, marginVertical: 10}}
                    onPress={() =>
                      navigation.navigate('CustomerForgotPassword')
                    }>
                    <Text style={styles.textForgotPassword}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={[colors.lightOrange, colors.darkOrange]}
                    start={{y: 0.0, x: 1.0}}
                    style={{width: '97%', marginLeft: 10}}
                    end={{y: 0.0, x: 0.0}}>
                    <Button
                      text="Login"
                      buttonStyle={styles.buttonLogin}
                      textStyle={styles.buttonLoginText}
                      onPress={handleSubmit}
                    />
                  </LinearGradient>

                  <AppleSignInButton
                    style={{
                      width: '97%',
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    onPress={onAppleButtonPress}
                  />

                  <Button
                    text="Login with Facebook"
                    imageStyle={styles.imageFb}
                    image={require('../../../assets/img/facebook.png')}
                    buttonStyle={styles.buttonFb}
                    textStyle={styles.buttonLoginText}
                    onPress={() => FbLoginHandler()}
                  />
                  <View style={styles.signInContainer}>
                    <Text style={styles.haveAccountText}>
                      Don't Have an Account
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CustomerSignUp')}>
                      <Text style={styles.signInButtonText}>SignUp</Text>
                    </TouchableOpacity>
                  </View>
                </Form>
              </ScrollView>
            )}
          </Formik>
        )}
      </View>
    </KeyboardAvoidingView>
  );
});

export default CustomerLogin;

const _styles = (colors) =>
  StyleSheet.create({
    customerLoginHeader: {
      height: hasNotch && !isTablet ? 280 : !hasNotch && !isTablet ? 240 : 350,
    },
    customerLoginHeaderImage: {
      height: '100%',
      width: '100%',
    },
    authHeader: {
      flex: 1,
      width: '100%',
      alignContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    formContainer: {
      marginRight: 40,
      marginLeft: 25,
      justifyContent: isTablet ? 'space-evenly' : 'space-between',
      height: hasNotch ? '80%' : '100%',
      alignItems: 'center',
    },
    fieldLabel: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: colors.darkOrange,
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
    textLogin: {
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 30,
      marginTop: '8%',
      letterSpacing: 0.6,
      textAlign: 'center',
      color: colors.darkOrange,
      lineHeight: 46,
    },
    textForgotPassword: {
      fontFamily: Fonts.poppinsMedium,
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.steelBlue,
      marginVertical: 20,
      lineHeight: 21,
    },
    buttonFb: {
      height: 50,
      width: '97%',
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
    buttonLogin: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonLoginText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 16,
      textAlign: 'center',
      color: colors.white,
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
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.steelBlue,
      lineHeight: 21,
      fontFamily: Fonts.poppinsMedium,
    },
    signInButtonText: {
      marginLeft: 5,
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 16,
      letterSpacing: 0.3,
      color: colors.darkOrange,
    },
  });
