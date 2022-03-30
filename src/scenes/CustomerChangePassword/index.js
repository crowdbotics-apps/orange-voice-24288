import React, {memo} from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import {Form, Item, Label, Input} from 'native-base';
import Button from '../../components/Button';
import {Fonts} from '../../theme/fonts';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import {useDispatch} from 'react-redux';
import allActions from '../../redux/actions';
import {successMessage, errorMessage} from '../../redux/utils/alerts';
import {Formik} from 'formik';
import {validationSchemaChangePassword} from '../../redux/utils/validation';
import PasswordTextBox from '../../components/PasswordTextBox';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerChangePassword = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);

  const form = {
    fields: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  };

  const handleChangePasswordPress = (values) => {
    dispatch(
      allActions.userActions.resetUserPassword({
        params: {
          newPassword: values.password,
        },
        onSuccess: () => {
          successMessage({
            message: 'Password updated successfully',
          });
          navigation.goBack();
        },
        onFail: (_error) => {
          _error.errors.map((error) => {
            errorMessage({
              message: _error?.message || _error?.Message,
            });
          });
        },
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        headerTitle="Change Password"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<BackArrow />}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={form.fields}
        onSubmit={(values) => handleChangePasswordPress(values)}
        validationSchema={validationSchemaChangePassword}>
        {({values, handleChange, errors, touched, handleSubmit}) => (
          <View style={styles.container}>
            <Form style={styles.formContainer}>
              <PasswordTextBox
                label="Old Password"
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
              />

              {touched.oldPassword && errors.oldPassword ? (
                <Text style={styles.fieldError}>{errors.oldPassword}</Text>
              ) : null}

              <PasswordTextBox
                label="New Password"
                value={values.password}
                onChangeText={handleChange('password')}
              />

              {touched.password && errors.password ? (
                <Text style={styles.fieldError}>{errors.password}</Text>
              ) : null}

              <PasswordTextBox
                label="Re-enter New Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />

              {touched.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.fieldError}>{errors.confirmPassword}</Text>
              ) : null}
            </Form>
            <Button
              text="Change Password"
              buttonStyle={styles.signUpButton}
              textStyle={styles.signUpButtonText}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
});

export default CustomerChangePassword;

const _styles = (colors) =>
  StyleSheet.create({
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
      marginLeft: 15,
      top: 5,
      alignSelf: 'flex-start',
      color: 'red',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
    },
    formContainer: {
      marginRight: 40,
      marginLeft: 25,
      alignItems: 'center',
    },
    signUpButton: {
      width: '90%',
      marginLeft: 2,
      marginTop: 70,
      height: 50,
      backgroundColor: colors.darkOrange,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signUpButtonText: {
      fontSize: 18,
      textAlign: 'center',
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
      color: colors.steelBlue,
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
      color: colors.darkOrange,
    },
  });
