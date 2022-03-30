import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Fonts} from '../../theme/fonts';
import MapView, {Marker} from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import AppHeader from '../../components/AppHeader';
import {BackArrow} from '../../../assets/img/backArrow';
import {Pin} from '../../../assets/img/pin';
import {Phone} from '../../../assets/img/phone';
import DriverOrderDetailHeader from '../../components/DriverOrderDetailHeader';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage, successMessage} from '../../redux/utils/alerts';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import openMap from 'react-native-open-maps';
import storage from '../../redux/utils/storage';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const DriverOrderDetail = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const task = navigation?.getParam('order');
  const order = {...task};
  const {jobType, isCompleted} = task;
  const [coordinates, setCoordinates] = useState();
  const {address} = useSelector((state) => state.order.orderById);
  const fetchOrderById = () => {
    dispatch(
      allActions.orderActions.fetchOrderById({
        params: task?.orderId,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleStatusUpdate = (status) => {
    Alert.alert(
      'Update Order Status',
      'Are you sure you want to update order status?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              allActions.orderActions.updateOrderStatus({
                params: {
                  orderId: task?.id,
                  status: status === 'PickUp' ? 'InProgress' : 'Delivered',
                  driverId: task?.driverId,
                  driverTaskId: task?.id,
                },
                onSuccess: (response) => {
                  successMessage({
                    message: 'Order Status Updated Successfully',
                  });
                  fetchDriverTasks();
                  navigation?.goBack();
                },
                onFail: (_error) => {
                  if (_error.status === 418) {
                    Alert.alert(
                      'Order Cancelled',
                      _error?.message || _error?.Message,
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            fetchDriverTasks();
                            navigation.goBack();
                          },
                        },
                      ],
                    );
                  } else {
                    errorMessage({
                      message: _error?.message || _error?.Message,
                    });
                  }
                },
              }),
            );
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  useEffect(() => {
    fetchOrderById();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (task && task?.id && !task?.isNotificationSent) {
      dispatch(
        allActions.orderActions.notifyUser({
          params: task?.id,
          onSuccess: () => {
            Alert.alert(
              'Customer Notified',
              'Customer has been notified that you have started the task',
              [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ],
            );
          },
          onFail: (_error) => {
            errorMessage({
              message: _error?.message || _error?.Message,
            });
          },
        }),
      );
    }
  }, [task, dispatch]);

  const fetchDriverTasks = async () => {
    try {
      const driver = await storage.getDriverData();
      const {driverId} = driver || {};
      dispatch(
        allActions.orderActions.fetchAllDriverTasks({
          params: driverId,
        }),
      );
    } catch (e) {}
  };

  const handleStatusButtonText = (status) => {
    if (status === 'PickUp') {
      return 'Order Picked Up';
    }
    if (status === 'DropOff') {
      return 'Order Delivered';
    }
  };

  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        Alert.alert(
          error.POSITION_UNAVAILABLE
            ? 'Please turn on location service from phone settings to use Maps. Reload application after you have enabled location services'
            : error.message,
        );
      },
    );
  };

  const googleMapOpenUrl = ({latitude, longitude}) => {
    const latLng = `${latitude},${longitude}`;
    return `google.navigation:q=${latLng}`;
  };

  const openGps = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  };

  const origin = {
    latitude: coordinates?.lat,
    longitude: coordinates?.lng,
  };
  const destination = {
    latitude: Number(address?.lat),
    longitude: Number(address?.lng),
  };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDlMHMsN_lc1NDamUBcsyBvd2mh_UEoDfo';

  return (
    <View style={styles.container}>
      <AppHeader
        headerTitle="Task Details"
        headerStyle={styles.header}
        leftButtonImage={<BackArrow />}
        rightButtonImage={<Phone width={22} height={22} />}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => Linking.openURL(`tel://${order.phoneNo}`)}
      />
      <View style={{flex: 1}}>
        {coordinates?.lng && coordinates?.lat ? (
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: coordinates?.lat,
              longitude: coordinates?.lng,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}>
            <Marker
              coordinate={{
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
              }}>
              <Pin />
            </Marker>

            <MapViewDirections
              origin={origin}
              strokeColor={colors.steelBlue}
              strokeWidth={2}
              precision={'high'}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
            />
          </MapView>
        ) : null}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CustomerOrderDetails', {
              orderId: order.id,
              isDriver: true,
            })
          }
          activeOpacity={0.8}
          style={styles.detailHeader}>
          <DriverOrderDetailHeader jobType={jobType} order={order} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Button
            image={require('../../../assets/img/ic_map_direction.png')}
            onPress={() => {
              openMap({
                latitude: Number(address?.lat),
                longitude: Number(address?.lng),
                zoom: 20,
              });
            }}
            imageStyle={{
              height: 60,
              width: 60,
              resizeMode: 'contain',
            }}
            buttonStyle={{
              marginVertical: 20,
            }}
          />

          {order?.description?.length > 0 ? (
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionLabel}>Driver Instruction</Text>
              <Text style={styles.instruction}>{order?.description}</Text>
            </View>
          ) : null}

          {!isCompleted ? (
            <LinearGradient
              colors={[colors.lightOrange, colors.darkOrange]}
              start={{y: 0.0, x: 1.0}}
              style={styles.btnGradient}
              end={{y: 0.0, x: 0.0}}>
              <Button
                text={handleStatusButtonText(jobType)}
                buttonStyle={styles.buttonLogin}
                textStyle={styles.buttonLoginText}
                onPress={() => handleStatusUpdate(jobType)}
              />
            </LinearGradient>
          ) : null}
        </View>
      </View>
    </View>
  );
});

export default DriverOrderDetail;

const _styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      height: hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
    },
    detailHeader: {
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
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
    btnGradient: {
      width: '100%',
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 20,
      right: 20,
    },
    instructionContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      width: '100%',
      backgroundColor: colors.white,
      shadowColor: colors.boxShadow,
      shadowOffset: {
        width: 0,
        height: 1.3,
      },
      shadowRadius: 5.3,
      shadowOpacity: 1,
      elevation: 3,
    },
    instructionLabel: {
      fontFamily: Fonts.poppinsRegular,
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      color: '#949eae',
      fontSize: 10,
      marginBottom: 5,
    },
    instruction: {
      fontFamily: Fonts.poppinsRegular,
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      color: colors.steelBlue,
      fontSize: 10,
      lineHeight: 18,
    },
  });
