import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList, Text, Platform} from 'react-native';
import {Fonts} from '../../theme/fonts';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import ActiveOrderListItem from '../../components/ActiveOrderListItem';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import {hasNotch} from 'react-native-device-info';
import CategoriesListItem from '../../components/CategoriesListItem';
import {Menu} from '../../../assets/img/menu';
import {Cart} from '../../../assets/img/cart';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import AppLoader from '../../components/AppLoader';
import {NavigationEvents} from 'react-navigation';
import TPFlatList from '../../components/TPFlatList';
const isAndroid = Platform.OS === 'android';

const headerHeight =
  hasNotch && !isAndroid ? 375 : !hasNotch && !isAndroid ? 350 : 303;

const CustomerHome = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.cart);

  const getCartItems = () => {
    dispatch({
      type: 'FETCH_CART',
    });
  };

  const fetchAllCategories = () => {
    dispatch(
      allActions.productActions.fetchAllCategories({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const fetchAllLovs = () => {
    dispatch(
      allActions.productActions.fetchAllLovs({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
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

  const fetchAllActiveOrders = () => {
    dispatch(
      allActions.orderActions.fetchAllActiveOrders({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  useEffect(() => {
    Promise.all([getUserProfile(), fetchAllCategories(), fetchAllLovs()]);
  }, []);

  const orderListHeader = () => {
    return (
      <View style={styles.orderContainer}>
        <Text>
          <Text style={styles.textActiveOrders}>Active Orders </Text>
          {order?.allActiveOrders?.length > 0 && (
            <Text style={styles.textOrders}>
              ({order?.allActiveOrders?.length})
            </Text>
          )}
        </Text>
        <LinearGradient
          colors={['rgba(237,143,49,1.0)', 'rgba(255,163,4,1.0)']}
          style={{height: 36, width: 121}}
          start={{y: 0.0, x: 1.0}}
          end={{y: 0.0, x: 0.0}}>
          <Button
            text="Order History"
            buttonStyle={styles.buttonOrderHistory}
            textStyle={styles.buttonOrderHistoryText}
            onPress={() => navigation.navigate('CustomerOrderHistory')}
          />
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <NavigationEvents
        onDidFocus={() => {
          fetchAllActiveOrders();
          getCartItems();
        }}
      />
      <AppHeader
        headerStyle={{height: headerHeight}}
        leftButtonImage={<Menu />}
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
        onLeftButtonPress={() => navigation.openDrawer()}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerHeading}>LaundrEZ Services</Text>
          <TPFlatList
            style={styles.categoryList}
            keyExtractor={(item, index) => `services-list-item-${index}`}
            contentContainerStyle={{paddingRight: 20, flexGrow: 1}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products.categories || []}
            getItemLayout={(data, index) => ({
              length: 200,
              offset: 200 * index,
              index,
            })}
            renderItem={({item}) => (
              <CategoriesListItem
                categoryTitle={item.title}
                categoryPrice={item.startingFrom}
                categoryImage={item.image}
                onPress={() =>
                  navigation.navigate('LaundryServices', {category: item})
                }
              />
            )}
          />
        </View>
      </AppHeader>

      {products?.meta?.loading ? (
        <AppLoader />
      ) : (
        <View style={styles.listContainer}>
          <TPFlatList
            style={{marginHorizontal: 22, flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            ListHeaderComponent={orderListHeader()}
            keyExtractor={(item, index) => `active-order-list-item-${index}`}
            showsVerticalScrollIndicator={false}
            data={order.allActiveOrders}
            getItemLayout={(data, index) => ({
              length: 77,
              offset: 77 * index,
              index,
            })}
            ListEmptyComponent={() => (
              <Text
                style={{
                  ...styles.textOrders,
                  flex: 1,
                  textAlign: 'center',
                  marginTop: '20%',
                }}>
                No Record Found
              </Text>
            )}
            renderItem={({item}) => (
              <ActiveOrderListItem
                orderNumber={item.orderNumber}
                orderDateTime={item.orderDateTime}
                orderStatus={item.orderStatus}
                itemCount={item.itemCount}
                progressColor={item.progressColor}
                progressCount={item.progressCount}
                progressImage={item.progressImage}
                onItemPress={() =>
                  navigation.navigate('CustomerOrderDetails', {
                    orderId: item.orderId,
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

export default CustomerHome;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerHeading: {
    marginTop: 20,
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 33,
    letterSpacing: 0.6,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 46,
  },
  textActiveOrders: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 18,
    color: Colors.steelBlue,
    lineHeight: 27,
  },
  textOrders: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 14,
    color: Colors.darkOrange,
    lineHeight: 21,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonOrderHistory: {
    height: 36,
    width: 121,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrderHistoryText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    color: Colors.white,
    lineHeight: 18,
  },
  listContainer: {
    flex: 1,
    marginTop: 100,
    marginBottom: 20,
  },
  categoryList: {
    marginTop: isAndroid ? 45 : 60,
    marginBottom: -100,
    flex: 1,
  },
});
