import React, {memo, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Clipboard,
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import storage from '../../redux/utils/storage';
import {Form, Item, Label, Input, Icon} from 'native-base';
import Button from '../../components/Button';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import {Edit} from '../../../assets/img/edit';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {successMessage, errorMessage} from '../../redux/utils/alerts';
import allActions from '../../redux/actions';
import {validationSchemaProfile} from '../../redux/utils/validation';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerViewProfile = memo(({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const address = useSelector((state) => state.address.address);
  const isProfileCompleted = navigation.getParam('isProfileCompleted', true);
  const isSocial = navigation.getParam('isSocial', false);

  const [isEditable, setIsEditable] = useState(false);
  const [userPhoneNo, setUserPhoneNo] = useState(user.user.phoneNo);

  const form = {
    fields: {
      email: user.user.email,
      lName: user.user.lastName,
      fName: user.user.firstName,
      phoneNo: user.user.phoneNo ?? '',
      postalCode: user.user.postalCode ?? '',
      referralCode: user.user.referralCode,
    },
  };

  const fetchAllAddress = () => {
    dispatch(
      allActions.addressActions.fetchUserAddress({
        profile_id: user.user.profile_id,
        onFail: (_error) => {
          errorMessage({
            message: _error.message,
          });
        },
      }),
    );
  };

  const copyToClipboard = (text) => {
    if (text) {
      Clipboard.setString(text);
      successMessage({
        message: 'Copied to clipboard',
      });
    }
  };

  const getUserProfile = () => {
    dispatch(
      allActions.userActions.fetchUserProfile({
        params: {
          userType: 'user',
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleUpdatePress = (values) => {
    dispatch(
      allActions.userActions.updateUserProfile({
        params: {
          profile_id: user.user.profile_id,
          firstName: values.fName,
          lastName: values.lName,
          email: values.email,
          phoneNo: userPhoneNo,
          postalCode: values.postalCode,
        },
        onSuccess: () => {
          successMessage({
            message: 'Your profile has been updated successfully',
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
  };

  useEffect(() => {
    getUserProfile();
    fetchAllAddress();
  }, []);

  useEffect(() => {
    if (!isProfileCompleted) {
      setIsEditable(true);
    }
  }, []);

  const handleLogOut = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          LoginManager.logOut();
          AsyncStorage.clear().then(() => {
            storage.setData('isFirstTime', 'no').then(() => {});
            navigation.navigate('CustomerLogin');
          });
        },
      },
    ]);
  };

  // rightButtonImage={
  //   <Image source={require('../../../assets/img/power_white.png')} />
  // }
  // onRightButtonPress={() => handleLogOut()}

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader
        headerTitle="Customer Profile"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={isProfileCompleted && <BackArrow />}
        rightButtonImage={
          isProfileCompleted ? (
            <Edit width={24} height={24} />
          ) : (
            <Image source={require('../../../assets/img/power_white.png')} />
          )
        }
        onRightButtonPress={
          isProfileCompleted
            ? () => setIsEditable(!isEditable)
            : () => handleLogOut()
        }
        onLeftButtonPress={
          isProfileCompleted ? () => navigation.goBack() : undefined
        }
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: hasNotch ? 30 : 10,
        }}>
        <Formik
          enableReinitialize={true}
          initialValues={form.fields}
          onSubmit={(values) => handleUpdatePress(values)}
          validationSchema={validationSchemaProfile}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form style={styles.formContainer}>
              <Item floatingLabel>
                <Label style={styles.fieldLabel}>First Name</Label>
                <Input
                  style={styles.fieldInput}
                  value={values.fName}
                  disabled={!isEditable}
                  onChangeText={handleChange('fName')}
                />
              </Item>
              {touched.fName && errors.fName && (
                <Text style={styles.fieldError}>{errors.fName}</Text>
              )}
              <Item floatingLabel>
                <Label style={styles.fieldLabel}>Last Name</Label>
                <Input
                  style={styles.fieldInput}
                  value={values.lName}
                  disabled={!isEditable}
                  onChangeText={handleChange('lName')}
                />
              </Item>
              {touched.lName && errors.lName && (
                <Text style={styles.fieldError}>{errors.lName}</Text>
              )}

              <Item stackedLabel>
                <TextInputMask
                  editable={isEditable}
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

              {touched.phoneNo && errors.phoneNo && (
                <Text style={styles.fieldError}>{errors.phoneNo}</Text>
              )}
              <Item floatingLabel>
                <Label style={styles.fieldLabel}>Email Address</Label>
                <Input
                  style={styles.fieldInput}
                  value={values.email}
                  disabled
                />
              </Item>

              {!isSocial && (
                <View
                  style={{
                    marginTop: 10,
                    width: Math.round(Dimensions.get('window').width) - 52,
                    paddingLeft: 18,
                  }}>
                  <Label style={styles.fieldLabel}>Password</Label>
                  <Text
                    style={{
                      fontSize: 60,
                      marginTop: -35,
                      fontWeight: 'bold',
                    }}>
                    ..........
                  </Text>
                  <Button
                    onPress={() =>
                      navigation.navigate('CustomerChangePassword', {
                        email: values.email,
                      })
                    }
                    buttonStyle={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(148, 158, 174, 0.2)',
                      paddingBottom: 10,
                    }}
                    textStyle={{
                      fontFamily: Fonts.poppinsSemiBold,
                      fontSize: 16,
                      letterSpacing: 0.3,
                      color: '#ed8f31',
                    }}
                    text="Change Password"
                  />
                </View>
              )}

              <Item floatingLabel>
                <Label style={styles.fieldLabel}>Postal Code</Label>
                <Input
                  style={styles.fieldInput}
                  value={values.postalCode}
                  disabled={!isEditable}
                  maxLength={6}
                  onChangeText={handleChange('postalCode')}
                />
              </Item>
              {touched.postalCode && errors.postalCode && (
                <Text style={styles.fieldError}>{errors.postalCode}</Text>
              )}

              <View
                style={{
                  borderBottomWidth: 0.3,
                  borderBottomColor: '#949eae',
                  width: '98%',
                  marginLeft: 20,
                  paddingBottom: 5,
                  marginRight: 0,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 5,
                  }}>
                  <Text style={styles.fieldLabel}>Referral Code</Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(values.referralCode)}
                    style={{marginLeft: 10}}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: 'rgba(238,145,35,1)',
                      }}
                      resizeMode="contain"
                      source={require('../../../assets/img/ic_copy.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.fieldInput}>{values.referralCode}</Text>
              </View>

              <FlatList
                style={{marginTop: 20, marginLeft: 25, width: '100%'}}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                keyExtractor={(item, index) => `list-address${index}`}
                data={address}
                ListFooterComponent={() =>
                  isEditable && (
                    <Button
                      text="Add New Address"
                      textStyle={styles.addCardBtnTxt}
                      onPress={() => {
                        navigation.navigate('CustomerAddAddress', {
                          buttonTitle: 'Save',
                        });
                      }}
                    />
                  )
                }
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    disabled={!isEditable}
                    style={styles.cardRowContainer}
                    onPress={() =>
                      navigation.navigate('CustomerAddAddress', {
                        address: item,
                      })
                    }>
                    <View style={{flex: 1, width: '100%'}}>
                      <Label style={styles.fieldLabel}>
                        Address {index + 1}
                      </Label>
                      <Text style={styles.fieldInput}>{item.mainAddress}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Button
                text="Update"
                disabled={!isEditable}
                buttonStyle={styles.editButton}
                textStyle={styles.editButtonText}
                onPress={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
});

export default CustomerViewProfile;

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
    marginLeft: 20,
    alignSelf: 'flex-start',
    color: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  formContainer: {
    marginRight: 40,
    marginLeft: 20,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    width: '100%',
    marginTop: 30,
    marginLeft: 15,
    height: 50,
    backgroundColor: '#ED8F31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.poppinsRegular,
    color: '#FFFFFF',
    lineHeight: 27,
  },
  addCardBtnTxt: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: Colors.darkOrange,
    lineHeight: 25,
  },
  cardRowContainer: {
    marginBottom: 15,
    paddingBottom: 5,
    alignItems: 'center',
    borderBottomColor: 'rgba(148, 158, 174, 0.2)',
    borderBottomWidth: 1,
  },
});
