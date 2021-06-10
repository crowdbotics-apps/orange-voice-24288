import React, {memo, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import {Form, Item, Label, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import AppHeader from '../../components/AppHeader';
import {BackArrow} from '../../../assets/img/backArrow';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import {Formik} from 'formik';
import {validationSchemaEmail} from '../../redux/utils/validation';
import AppLoader from '../../components/AppLoader';

const hasNotch = DeviceInfo.hasNotch();
const isTablet = DeviceInfo.isTablet();
const isAndroid = Platform.OS === 'android';

const CustomerForgotPassword = memo(({navigation}) => {
  const dispatch = useDispatch();
  const meta = useSelector((state) => state.auth.meta);

  const handleSubmitPress = useCallback((values) => {
    dispatch(
      allActions.authActions.forgotPassword({
        params: {
          email: values.email.toLowerCase(),
          type: 'User',
        },
        onSuccess: () => {
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

  return (
    <View style={{flex: 1}}>
      <AppHeader
        leftButtonImage={<BackArrow />}
        onLeftButtonPress={() => navigation.goBack()}
        headerStyle={styles.customerForgotPasswordHeader}>
        <View style={styles.authHeader}>
          <Image
            resizeMode={'contain'}
            style={styles.customerForgotPasswordHeaderImage}
            source={require('../../../assets/img/app_icon_big.png')}
          />
        </View>
      </AppHeader>

      {meta.authLoading ? (
        <AppLoader />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View style={styles.container}>
              <Text style={styles.textForgotPassword}>Forgot Password</Text>
              <Text style={styles.textSubHeading}>
                Enter registered email to receive password reset link
              </Text>
              <Formik
                initialValues={{email: ''}}
                onSubmit={(values) => handleSubmitPress(values)}
                validationSchema={validationSchemaEmail}>
                {({values, handleChange, errors, touched, handleSubmit}) => (
                  <Form style={styles.formContainer}>
                    <Item floatingLabel>
                      <Label style={styles.fieldLabel}>Enter Email</Label>
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
                    <LinearGradient
                      colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
                      start={{y: 0.0, x: 1.0}}
                      style={{width: '100%', marginTop: '20%', marginLeft: 15}}
                      end={{y: 0.0, x: 0.0}}>
                      <Button
                        text="Submit"
                        buttonStyle={styles.buttonSubmit}
                        textStyle={styles.buttonSubmitText}
                        onPress={handleSubmit}
                      />
                    </LinearGradient>
                  </Form>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
});

export default CustomerForgotPassword;

const styles = StyleSheet.create({
  customerForgotPasswordHeader: {
    height: hasNotch && !isTablet ? 280 : !hasNotch && !isTablet ? 240 : 350,
  },
  customerForgotPasswordHeaderImage: {
    height: isTablet ? '91%' : isAndroid ? '79%' : '86%',
    width: isTablet ? '42%' : '51%',
  },
  authHeader: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  formContainer: {
    marginRight: 40,
    marginLeft: 25,
    marginTop: '15%',
    width: '80%',
    alignItems: 'center',
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
  fieldError: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 10,
    color: 'red',
  },
  textForgotPassword: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 30,
    marginTop: '8%',
    letterSpacing: 0.6,
    textAlign: 'center',
    color: Colors.darkOrange,
    lineHeight: 46,
  },
  buttonSubmit: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSubmitText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 27,
  },
  textSubHeading: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 14,
    width: '55%',
    marginTop: 5,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#2c436a',
    lineHeight: 21,
  },
});
