import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Form, Item, Label, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {isNull, isEmpty} from 'lodash';
import {Formik} from 'formik';
import SplashScreen from 'react-native-splash-screen';
import {validationSchemaDriverLogin} from '../../redux/utils/validation';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../components/AppHeader';
import {Fonts} from '../../theme/fonts';
import Button from '../../components/Button';
import storage from '../../redux/utils/storage';
import {setCredentials} from '../../redux/services/api';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import AppLoader from '../../components/AppLoader';
import {NavigationEvents} from 'react-navigation';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isTablet = DeviceInfo.isTablet();

const DriverLogin = memo(({navigation}) => {
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const dispatch = useDispatch();
  const [driverSignUp, setDriverSignUp] = useState(false);
  const meta = useSelector((state) => state.auth.meta);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);

  useEffect(() => {
    storage
      .loadCredentials()
      .then((credentials) => {
        if (
          !isNull(credentials.access_token) &&
          !isEmpty(credentials.access_token)
        ) {
          setCredentials(credentials.access_token);
          navigation.navigate('Driver');
        }
      })
      .finally(() => {
        setIsScreenLoaded(true);
        SplashScreen.hide();
      });
  }, [navigation]);

  const getDriverSignUp = () => {
    dispatch(
      allActions.userActions.getDriverSignUp({
        onSuccess: (response) => {
          setDriverSignUp(response.value === '1');
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleLoginPress = useCallback(
    (values) => {
      dispatch(
        allActions.authActions.signIn({
          params: {
            licence: values.userId,
            type: 'driver',
          },
          onSuccess: (response) => {
            storage.setDriverData(response).then(() => {
              navigation.navigate('Driver');
            });
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

  if (!isScreenLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={() => getDriverSignUp()} />
      <AppHeader headerStyle={styles.customerLoginHeader}>
        <View style={styles.authHeader}>
          <FastImage
            style={styles.customerLoginHeaderImage}
            source={require('../../../assets/img/app_icon_big.png')}
            resizeMode="contain"
          />
        </View>
      </AppHeader>

      {meta.authLoading ? (
        <AppLoader />
      ) : (
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.contentView}>
            <Text style={styles.textLogin}>Driver Login</Text>

            <Formik
              initialValues={{userId: ''}}
              onSubmit={(values) => handleLoginPress(values)}
              validationSchema={validationSchemaDriverLogin}>
              {({values, handleChange, errors, touched, handleSubmit}) => (
                <Form style={styles.formContainer}>
                  <Item floatingLabel style={{width: '100%', marginLeft: 0}}>
                    <Label style={styles.fieldLabel}>Enter License Id</Label>
                    <Input
                      style={styles.fieldInput}
                      value={values.userId}
                      autoCapitalize="none"
                      onChangeText={handleChange('userId')}
                    />
                  </Item>
                  {touched.userId && errors.userId ? (
                    <Text style={styles.fieldError}>{errors.userId}</Text>
                  ) : null}

                  <LinearGradient
                    colors={[colors.lightOrange, colors.darkOrange]}
                    start={{y: 0.0, x: 1.0}}
                    style={{width: '100%', marginTop: 30}}
                    end={{y: 0.0, x: 0.0}}>
                    <Button
                      text="Login"
                      buttonStyle={styles.buttonLogin}
                      textStyle={styles.buttonLoginText}
                      onPress={handleSubmit}
                    />
                  </LinearGradient>
                  {driverSignUp ? (
                    <View style={styles.signInContainer}>
                      <Text style={styles.haveAccountText}>
                        Don't Have an Account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('DriverSignUp')}>
                        <Text style={styles.signInButtonText}>SignUp</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </Form>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
});

export default DriverLogin;

const _styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    scrollView: {
      flexGrow: 1,
      paddingBottom: hasNotch ? 0 : 80,
    },
    contentView: {
      flex: 1,
    },
    authHeader: {
      flex: 1,
      width: '100%',
      alignContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    customerLoginHeaderImage: {
      height: '100%',
      width: '100%',
    },
    customerLoginHeader: {
      height: hasNotch && !isTablet ? 280 : !hasNotch && !isTablet ? 240 : 350,
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
    formContainer: {
      marginHorizontal: 40,
      alignItems: 'center',
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
      color: 'red',
    },
    buttonLogin: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonLoginText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
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
