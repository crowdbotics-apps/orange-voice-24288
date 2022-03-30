import React, {memo, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Right,
  Body,
  Left,
  Picker,
} from 'native-base';
import {Fonts} from '../../theme/fonts';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import MapView, {Marker} from 'react-native-maps';
import {Pin} from '../../../assets/img/pin';
import Calendar from '../../../assets/img/Calendar';
import Clock from '../../../assets/img/clock.svg';
import PinOrange from '../../../assets/img/pin.svg';
import TickOrange from '../../../assets/img/tick_orange.svg';
import {Form, Textarea} from 'native-base';
import moment from 'moment';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Picker as RNPickerSelect} from '@react-native-community/picker';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import {NavigationEvents} from 'react-navigation';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerPickAndDropOrder = memo(({navigation, dropOfThreshold}) => {
  const DATE_FORMAT = 'DD MMM YYYY';
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.order);
  const address = useSelector((state) => state.address.address);
  const user = useSelector((state) => state.user.user);
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const mapRef = useRef(null);
  const config = useSelector((state) => state.products.config);

  const timeslots = config?.timeslots?.map((item) => ({
    label: item.value,
    value: item.value,
  }));

  const [selectedAddress, setSelectedAddress] = useState(-1);
  const [pickUpDates, setPickUpDates] = useState([]);
  const [dropOffDates, setDropOffDates] = useState([]);
  const [pickUpDate, setPickUpDate] = useState(undefined);
  const [pickUpDateSelected, setPickUpDateSelected] = useState('');
  const [pickUpTime, setPickUpTime] = useState(undefined);
  const [pickUpTimeSelected, setPickUpTimeSelected] = useState('');
  const [dropOffDate, setDropOffDate] = useState(undefined);
  const [dropOffDateSelected, setDropOffDateSelected] = useState('');
  const [dropOffTime, setDropOffTime] = useState(undefined);
  const [dropOffTimeSelected, setDropOffTimeSelected] = useState('');
  const [dropOffTimeSlots, setDropOffTimeSlots] = useState(timeslots);
  const [driverInstructions, setDriverInstructions] = useState();
  const [validPickup, setValidPickup] = useState(false);
  const [validDropoff, setValidDropoff] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (address && address.length > 0) {
      const primaryAddress = address.filter((i) => i.isPrimary);
      if (primaryAddress.length > 0) {
        setSelectedAddress(primaryAddress[0]);
      }
    }
  }, [address]);

  useEffect(() => {
    if (!pickUpTime) {
      setDropOffTimeSlots(timeslots);
    } else {
      const index = timeslots.findIndex((slot) => slot.label === pickUpTime);
      if (index >= 0) {
        setDropOffTimeSlots(timeslots.filter((item, i) => i >= index));
      }
    }
  }, [pickUpTime]);

  useEffect(() => {
    if (pickUpDate && pickUpTime) {
      const date = moment(pickUpDate).format('YYYY-MM-DD');
      validateTimeSlot({
        date,
        time: pickUpTime,
        type: 'PickUp',
      });
    }
  }, [pickUpDate, pickUpTime]);

  useEffect(() => {
    if (dropOffDate && dropOffTime) {
      const date = moment(dropOffDate).format('YYYY-MM-DD');
      validateTimeSlot({
        date,
        time: dropOffTime,
        type: 'DropOff',
      });
    }
  }, [dropOffDate, dropOffTime]);

  const validateTimeSlot = ({date, time, type}) => {
    if (date && time) {
      const params = {
        date,
        time,
        status: type,
      };

      dispatch(
        allActions.orderActions.validateOrderTimeSlot({
          params,
          onSuccess: () => {
            if (type === 'PickUp') {
              setValidPickup(true);
            }
            if (type === 'DropOff') {
              setValidDropoff(true);
            }
          },
          onFail: (_error) => {
            setServerError(_error?.message || _error?.Message);

            if (type === 'PickUp') {
              if (isAndroid && !validPickup) {
                onAndroidPickerDonePressed('pickup');
              }
              setValidPickup(false);
            }
            if (type === 'DropOff') {
              if (isAndroid && !validDropoff) {
                onAndroidPickerDonePressed('dropoff');
              }
              setValidDropoff(false);
            }
          },
        }),
      );
    }
  };

  useEffect(() => {
    onAndroidPickerDonePressed('pickup');
  }, [validPickup]);

  useEffect(() => {
    onAndroidPickerDonePressed('dropoff');
  }, [validDropoff]);

  useEffect(() => {
    getPickUpDates();
  }, []);

  const fetchAllAddress = () => {
    dispatch(
      allActions.addressActions.fetchUserAddress({
        profile_id: user?.profile_id,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const isSunday = (date) => {
    const day = date.format('dddd');
    return day === 'Sunday';
  };

  const getNextDay = (date) => {
    let start = moment(date);
    start = start.add(1, 'days');
    if (isSunday(start)) {
      start = start.add(1, 'days');
    }
    return start;
  };

  const getPickUpDates = (startingDate) => {
    const allowedDaysThreshold = 7;
    let allowedDates = [];
    let start = moment().add(1, 'days');

    while (allowedDates.length < allowedDaysThreshold) {
      allowedDates.push({
        label: start.format(DATE_FORMAT),
        value: start.format(DATE_FORMAT),
      });

      start = getNextDay(start.toDate());
    }

    setPickUpDates(allowedDates);
  };

  useEffect(() => {
    if (pickUpDate) {
      let extraHours = 0;
      const dayString = moment(pickUpDate.toDate()).format('dddd');
      if (dayString === 'Saturday') {
        extraHours = 24;
      }

      const dropoffStartHours = Number(dropOfThreshold);
      const allowedDaysThreshold = 7;
      let dropOffMinDate = moment(pickUpDate.toDate()).add(
        dropoffStartHours + extraHours,
        'hours',
      );
      let allowedDates = [];

      if (isSunday(dropOffMinDate)) {
        let s = moment(dropOffMinDate.toDate());
        dropOffMinDate = s.add(1, 'days');
      }

      while (allowedDates.length < allowedDaysThreshold) {
        allowedDates.push({
          label: dropOffMinDate.format(DATE_FORMAT),
          value: dropOffMinDate.format(DATE_FORMAT),
        });

        dropOffMinDate = getNextDay(dropOffMinDate.toDate());
      }

      setDropOffDates(allowedDates);
    }
  }, [pickUpDate]);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ORDER_DETAILS',
    });
  }, []);

  useEffect(() => {
    // mapRef?.animateToCoordinate(
    //   {
    //     latitude: parseInt(selectedAddress.lat),
    //     longitude: parseInt(selectedAddress.lng),
    //   },
    //   3000,
    // );
  }, [selectedAddress]);

  const handlePlaceOrder = () => {
    if (
      !pickUpDate ||
      !pickUpTime ||
      !dropOffDate ||
      !dropOffTime ||
      selectedAddress === -1
    ) {
      alert('Please fill all the values');
    } else {
      const order = {
        grandTotal: orderDetails.grandTotal,
        location: address.find((x) => x.id === selectedAddress.id),
        pickUpDate: pickUpDate.format('DD-MM-YYYY'),
        pickUpTime: pickUpTime,
        dropOffDate: dropOffDate.format('DD-MM-YYYY'),
        dropOffTime: dropOffTime,
        driverInstructions,
      };

      dispatch({
        type: 'PLACE_ORDER_DETAILS',
        order,
        onSuccess: () => {
          navigation.navigate('CustomerOrderReview');
        },
        onFail: () => {},
      });
    }
  };

  const onPickerDonePressed = (type) => {
    console.log('DROP DOWN STATUS');
    console.log(type);
    console.log(pickUpDate);
    console.log(pickUpTime);
    console.log(dropOffDate);
    console.log(dropOffTime);
    console.log(validPickup);
    if (type === 'pickup') {
      if (pickUpDate && pickUpTime) {
        if (!validPickup) {
          if (serverError) {
            errorMessage({
              message: serverError,
            });
          }
        }
      }
    }
    if (type === 'dropoff') {
      if (dropOffDate && dropOffTime) {
        if (!validDropoff) {
          if (serverError) {
            errorMessage({
              message: serverError,
            });
          }
        }
      }
    }
  };

  const onAndroidPickerDonePressed = (type) => {
    if (isAndroid) {
      onPickerDonePressed(type);
    }
  };

  const RenderSelectHeader = ({backAction, title}) => {
    return (
      <Header style={{backgroundColor: colors.lightOrange}}>
        <Left>
          <TouchableOpacity
            style={{marginLeft: 18}}
            transparent
            onPress={backAction}>
            <BackArrow />
          </TouchableOpacity>
        </Left>
        <Body style={{flex: 3}}>
          <Title style={{color: '#fff'}}>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <NavigationEvents onDidFocus={() => fetchAllAddress()} />
        <AppHeader
          headerTitle="Pick and Drop"
          headerStyle={{
            height:
              hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
          }}
          leftButtonImage={<BackArrow />}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <MapView ref={mapRef} style={{flex: 1}} showsUserLocation>
            {/* <Marker
              coordinate={{
                latitude: selectedAddress === -1 ? 0 : selectedAddress?.lat,
                longitude: selectedAddress === -1 ? 0 : selectedAddress?.lng,
              }}>
              <Pin />
            </Marker> */}
          </MapView>
          <ScrollView
            style={styles.overlayContainer}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.pickAndDropContainer}>
              <Text style={styles.pickAndDropTitle}>Pickup Date & Time</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 15,
                }}>
                <View style={styles.dateTimeContainer}>
                  <Calendar fill={colors.steelBlue} />
                  <Picker
                    renderHeader={(backAction) => (
                      <RenderSelectHeader
                        backAction={backAction}
                        title="Select Date"
                      />
                    )}
                    style={{width: '100%'}}
                    placeholder="Select Date"
                    selectedValue={pickUpDateSelected}
                    placeholderStyle={{color: colors.steelBlue}}
                    textStyle={{fontSize: 12}}
                    onValueChange={(value) => {
                      setPickUpDateSelected(value);
                      setDropOffDates([]);
                      setDropOffDate(undefined);
                      if (value !== null) {
                        const selectedDate = moment.utc(value, DATE_FORMAT);
                        // console.log('PICUP DATE VALUE ' + value);
                        // console.log('PICKUP DATE SELECTED ' + selectedDate);
                        setPickUpDate(selectedDate);
                      } else {
                        setPickUpDate(undefined);
                      }
                    }}>
                    {pickUpDates.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={item.value}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={styles.separator} />
                <View style={styles.dateTimeContainer}>
                  <Clock />
                  <View style={{width: 2}} />
                  <Picker
                    placeholder="Select Time"
                    placeholderStyle={{color: colors.steelBlue}}
                    selectedValue={pickUpTimeSelected}
                    renderHeader={(backAction) => (
                      <RenderSelectHeader
                        backAction={backAction}
                        title="Select Time"
                      />
                    )}
                    onValueChange={(value) => {
                      setPickUpTimeSelected(value);
                      value !== null
                        ? setPickUpTime(value)
                        : setPickUpTime(undefined);
                      onPickerDonePressed('pickup');
                    }}
                    textStyle={{fontSize: 12}}>
                    {timeslots.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={item.value}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={{...styles.pickAndDropContainer, top: 10}}>
              <Text style={styles.pickAndDropTitle}>Drop-off Date & Time</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 15,
                }}>
                <View style={styles.dateTimeContainer}>
                  <Calendar fill={colors.steelBlue} />
                  <View style={{width: 2}} />
                  <Picker
                    renderHeader={(backAction) => (
                      <RenderSelectHeader
                        backAction={backAction}
                        title="Select Date"
                      />
                    )}
                    style={{width: '100%'}}
                    placeholder="Select Date"
                    selectedValue={dropOffDateSelected}
                    disabled={!pickUpDate || !pickUpTime || !validPickup}
                    placeholderStyle={{color: colors.steelBlue}}
                    textStyle={{fontSize: 12}}
                    onValueChange={(value) => {
                      onPickerDonePressed('dropoff');
                      setDropOffDateSelected(value);
                      if (value !== null) {
                        setDropOffDate(moment.utc(value, DATE_FORMAT));
                      } else {
                        setDropOffDate(undefined);
                      }
                    }}
                    items={dropOffDates}>
                    {dropOffDates.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={item.value}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={styles.separator} />
                <View style={styles.dateTimeContainer}>
                  <Clock />
                  <View style={{width: 10}} />
                  <Picker
                    renderHeader={(backAction) => (
                      <RenderSelectHeader
                        backAction={backAction}
                        title="Select Time"
                      />
                    )}
                    disabled={!pickUpTime || !pickUpDate || !validPickup}
                    placeholder="Select Time"
                    placeholderStyle={{color: colors.steelBlue}}
                    selectedValue={dropOffTimeSelected}
                    textStyle={{fontSize: 12}}
                    onValueChange={(value) => {
                      onPickerDonePressed('dropoff');
                      setDropOffTimeSelected(value);
                      value !== null
                        ? setDropOffTime(value)
                        : setDropOffTime(undefined);
                    }}
                    textInputProps={{
                      color: 'black',
                    }}
                    items={dropOffTimeSlots}>
                    {dropOffTimeSlots.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={item.value}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={{flex: 1, width: '100%'}} />
            <View style={{marginTop: 15, backgroundColor: '#ffffff'}}>
              <FlatList
                keyExtractor={(item) => item.id}
                data={address}
                ListFooterComponent={() => (
                  <Button
                    text="Add New Address"
                    textStyle={styles.addCardBtnTxt}
                    onPress={() => {
                      navigation.navigate('CustomerAddAddress', {
                        from: 'pickAndDropScreen',
                      });
                    }}
                  />
                )}
                contentContainerStyle={{flexGrow: 1}}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparator} />
                )}
                style={styles.addressList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setSelectedAddress(item)}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <PinOrange />
                    <Text style={styles.addressText}>{item.mainAddress}</Text>
                    {item.id === selectedAddress.id ? <TickOrange /> : null}
                  </TouchableOpacity>
                )}
              />
              <Form style={{marginHorizontal: 10}}>
                <Textarea
                  onChangeText={(value) => setDriverInstructions(value)}
                  rowSpan={5}
                  returnKeyType={'done'}
                  blurOnSubmit
                  style={{
                    fontFamily: Fonts.poppinsRegular,
                    fontSize: 12,
                  }}
                  placeholder="Driver Instructions (Optional)"
                />
              </Form>
            </View>
          </ScrollView>
          <View style={styles.bottomCardContainer}>
            <LinearGradient
              colors={[colors.lightOrange, colors.darkOrange]}
              start={{y: 0.0, x: 1.0}}
              style={{width: '100%'}}
              end={{y: 0.0, x: 0.0}}>
              <Button
                disabled={!validPickup || !validDropoff}
                text="Place Order"
                buttonStyle={styles.buttonPlaceOrder}
                textStyle={styles.buttonPlaceOrderText}
                onPress={() => handlePlaceOrder()}
              />
            </LinearGradient>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

const mapStateToProps = ({products}) => ({
  dropOfThreshold: products.config.system.DropOfThreshold,
});

export default connect(mapStateToProps, null)(CustomerPickAndDropOrder);

const _styles = (colors) =>
  StyleSheet.create({
    addressText: {
      flex: 1,
      textAlign: 'justify',
      marginHorizontal: 10,
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: colors.steelBlue,
      lineHeight: 18,
    },
    calloutText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      textAlign: 'center',
      flex: 1,
      marginVertical: 5,
      borderRadius: 3,
      color: colors.white,
      padding: 5,
      backgroundColor: colors.lightBlue,
      shadowColor: colors.boxShadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
      shadowOpacity: 1,
      elevation: 5,
    },
    container: {
      flex: 1,
    },
    overlayContainer: {
      top: 10,
      position: 'absolute',
      marginLeft: 20,
      width: '90%',
      bottom: 90, // 40 button bottom, 50 button height
      alignSelf: 'center',
    },
    pickAndDropContainer: {
      top: 5,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(44, 67, 106, 0.15)',
      shadowOffset: {
        width: 0,
        height: 1.3,
      },
      elevation: 5,
      shadowRadius: 5.3,
      shadowOpacity: 1,
    },
    pickAndDropTitle: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 16,
      letterSpacing: 0.3,
      color: colors.darkOrange,
      lineHeight: 25,
    },
    dateTimeContainer: {
      marginRight: 10,
      marginVertical: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    dateText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: colors.steelBlue,
    },
    separator: {
      alignSelf: 'center',
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: '#cdd9ec',
      height: '45%',
      marginRight: 10,
    },
    buttonPlaceOrder: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonPlaceOrderText: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
      textAlign: 'center',
      color: colors.white,
      lineHeight: 27,
    },
    itemSeparator: {
      height: 1,
      opacity: 0.5,
      backgroundColor: colors.steelBlue,
      marginVertical: 10,
    },
    addressList: {
      margin: 20,
      borderBottomWidth: 1,
      paddingBottom: 10,
      borderColor: 'rgba(44, 67, 106, 0.5)',
    },
    bottomCardContainer: {
      position: 'absolute',
      bottom: 40,
      marginHorizontal: 18,
      width: '90%',
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(44, 67, 106, 0.15)',
      shadowOffset: {
        width: 0,
        height: 1.3,
      },
      shadowRadius: 5.3,
      shadowOpacity: 1,
      elevation: 5,
      alignSelf: 'center',
    },
    addCardBtnTxt: {
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 14,
      letterSpacing: 0.3,
      textAlign: 'left',
      marginTop: 10,
      color: colors.darkOrange,
      lineHeight: 25,
    },
  });
