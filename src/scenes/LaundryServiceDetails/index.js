import React, {useState, memo, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import AppHeader from '../../components/AppHeader';
import {BackArrow} from '../../../assets/img/backArrow';
import {Cart} from '../../../assets/img/cart';
import {Fonts} from '../../theme/fonts';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import NumberCounter from '../../components/NumberCounter';
import ServiceFAQs from '../../components/ServiceFAQs';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'native-base';
import allActions from '../../redux/actions';
import {errorMessage} from '../../../src/redux/utils/alerts';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const LaundryServiceDetails = memo(({navigation}) => {
  const service = navigation.getParam('service');
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const categoryTitle = navigation.getParam('categoryTitle');
  const {minQty = 1} = service || {};
  const dispatch = useDispatch();

  const faqs = useSelector((state) => state.products.faqs);
  const cart = useSelector((state) => state.cart.cart);

  const [counter, setCounter] = useState(minQty);

  const fetchFAQsById = (id) => {
    dispatch(
      allActions.productActions.fetchFAQsById({
        params: id,
        onFail: (_error) => {
          errorMessage({
            message: _error.Message,
          });
        },
      }),
    );
  };

  useEffect(() => {
    fetchFAQsById(service.id);
  }, []);

  const handleAddToCart = () => {
    if (counter > 0) {
      dispatch({
        type: 'ADD_TO_CART',
        product: {...service, categoryTitle},
        quantity: counter,
        onSuccess: () => {
          Toast.show({
            text: 'Item added to basket',
            type: 'success',
            duration: 3000,
            textStyle: {
              fontFamily: Fonts.poppinsRegular,
              textAlign: 'center',
              fontSize: 14,
            },
            style: {marginBottom: 50},
          });
          navigation.navigate('CustomerHome');
        },
        onFail: () => {
          Toast.show({
            text: 'Failed to add item to basket. Please try again.',
            type: 'danger',
            duration: 3000,
            textStyle: {fontFamily: Fonts.poppinsRegular, textAlign: 'center'},
            style: {marginBottom: 50},
          });
        },
      });
    }
  };

  const checkValidImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const getListViewHeader = () => {
    const {serviceCharges, serviceTitle, serviceDesc, serviceImage} = service;

    return (
      <View style={{flex: 1, backgroundColor: 'white', marginBottom: 20}}>
        <FastImage
          style={[
            {height: 300},
            !checkValidImage(serviceImage) ? {marginBottom: 25} : {},
          ]}
          fallback
          resizeMode={'contain'}
          defaultSource={require('../../../assets/img/no-image-png.png')}
          source={{
            uri: serviceImage,
          }}
        />
        <View style={styles.serviceInfoContainer}>
          {serviceTitle ? (
            <Text style={styles.serviceTitle}>{serviceTitle}</Text>
          ) : null}
          {serviceDesc ? (
            <Text numberOfLines={3} style={styles.serviceDescription}>
              {serviceDesc}
            </Text>
          ) : null}
          <Text
            style={[
              styles.serviceDescription,
              {fontWeight: '600', fontSize: 11},
            ]}>
            Min Quantity: {minQty}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {serviceCharges ? (
              <Text style={styles.serviceCharges}>
                {serviceCharges}{' '}
                <Text style={{color: colors.steelBlue, fontSize: 13}}>/ Item</Text>
              </Text>
            ) : null}
            <NumberCounter
              minValue={minQty}
              counterValue={counter}
              onValueChanged={setCounter}
            />
          </View>
        </View>
      </View>
    );
  };

  const getListViewFooter = () => {
    return (
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <LinearGradient
          colors={[colors.lightOrange, colors.darkOrange]}
          start={{y: 0.0, x: 1.0}}
          style={{width: '100%'}}
          end={{y: 0.0, x: 0.0}}>
          <Button
            text="Add to Basket"
            disabled={counter === 0}
            buttonStyle={styles.buttonLogin}
            textStyle={styles.buttonLoginText}
            onPress={() => handleAddToCart()}
          />
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        headerTitle={categoryTitle}
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<BackArrow />}
        rightButtonImage={
          <View style={{minWidth: 25, height: 25}}>
            <Cart color={colors.white} height={22} width={35} />
            {cart.length > 0 ? (
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
            ) : null}
          </View>
        }
        onRightButtonPress={() => navigation.navigate('CustomerOrderBasket')}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.listContainer}>
        <ServiceFAQs
          faqs={faqs}
          getListViewFooter={getListViewFooter}
          getListViewHeader={getListViewHeader}
        />
      </View>
    </View>
  );
});

export default LaundryServiceDetails;

const _styles = (colors) =>
  StyleSheet.create({
    listContainer: {
      flex: 1,
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
    serviceInfoContainer: {
      height: 145,
      padding: 10,
      marginHorizontal: 20,
      backgroundColor: '#ffffff',
      shadowColor: '#2c436a26',
      justifyContent: 'space-between',
      marginTop: -15,
      shadowOffset: {
        width: 0,
        height: 1.3,
      },
      shadowRadius: 5.3,
      shadowOpacity: 1,
      elevation: 5,
    },
    serviceTitle: {
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 30,
      letterSpacing: 0.6,
      color: colors.steelBlue,
    },
    serviceDescription: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 10,
      textAlign: 'justify',
      color: colors.steelBlue,
    },
    serviceCharges: {
      fontFamily: Fonts.poppinsSemiBold,
      fontSize: 21,
      letterSpacing: 0.4,
      color: colors.darkOrange,
    },
  });
