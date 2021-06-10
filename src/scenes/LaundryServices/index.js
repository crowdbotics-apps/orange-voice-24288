import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList, Platform, Text} from 'react-native';
import ServicesListItem from '../../components/ServicesListItem';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import {Cart} from '../../../assets/img/cart';
import allActions from '../../redux/actions';
import AppLoader from '../../components/AppLoader';
import {useDispatch, useSelector} from 'react-redux';
import {errorMessage} from '../../redux/utils/alerts';
import FastImage from 'react-native-fast-image';
import {Toast} from 'native-base';
import {Fonts} from '../../theme/fonts';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const LaundryServices = ({navigation}) => {
  const category = navigation.getParam('category');

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.cart);

  const fetchAllServices = () => {
    dispatch(
      allActions.productActions.fetchAllServices({
        params: {categoryId: category.id},
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleAddToCart = (service) => {
    const {minQty, id} = service;
    const cartItems = cart.filter((i) => i.id === id);
    const quantity = cartItems.length > 0 ? 1 : minQty;

    dispatch({
      type: 'ADD_TO_CART',
      product: {...service, categoryTitle: category.title},
      quantity: quantity,
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
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        headerTitle={category.title}
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<BackArrow />}
        rightButtonImage={
          <View style={{minWidth: 25, height: 25}}>
            <Cart color={Colors.white} height={22} width={35} />
            {cart.length > 0 && (
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
            )}
          </View>
        }
        onRightButtonPress={() => navigation.navigate('CustomerOrderBasket')}
        onLeftButtonPress={() => navigation.goBack()}
      />

      {products?.meta?.loading ? (
        <AppLoader />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            style={styles.servicesList}
            contentContainerStyle={{flexGrow: 1}}
            keyExtractor={(item, index) => `list-item-${index}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{height: 200, width: 200}}
                  source={{
                    uri:
                      'https://grandzcasinohotel.com/wp-content/themes/Divi/includes/builder/images/premade.gif',
                  }}
                />
                <Text>No record found</Text>
              </View>
            )}
            data={products.services}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index,
            })}
            renderItem={({item}) => (
              <ServicesListItem
                serviceTitle={item.serviceTitle}
                serviceDesc={item.serviceDesc}
                serviceImage={item.serviceImage}
                serviceCharges={item.serviceCharges}
                onCartPress={() => handleAddToCart(item)}
                onItemPress={() =>
                  navigation.navigate('LaundryServiceDetails', {
                    service: item,
                    categoryTitle: category.title,
                  })
                }
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default LaundryServices;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  servicesList: {
    marginHorizontal: 22,
    marginVertical: 10,
    flex: 1,
  },
});
