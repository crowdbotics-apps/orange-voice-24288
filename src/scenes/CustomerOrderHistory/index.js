import React, {memo} from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import OrderHistoryListItem from '../../components/OrderHistoryListItem';
import AppHeader from '../../components/AppHeader';
import {BackArrow} from '../../../assets/img/backArrow';
import {Cart} from '../../../assets/img/cart';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import AppLoader from '../../components/AppLoader';
import {NavigationEvents} from 'react-navigation';
import TPFlatList from '../../components/TPFlatList';
import {Toast} from 'native-base';
import {Fonts} from '../../theme/fonts';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerOrderHistory = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const meta = order?.meta;
  const paging = order?.orderHistoryPaging || {};
  const {loading = false} = meta;

  const {totalCount = 0, pageNumber = 0, pageSize = 0, totalPages = 0} =
    paging || {};

  const fetchOrderHistory = () => {
    dispatch(
      allActions.orderActions.fetchOrderHistory({
        profile_id: user?.profile_id,
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const fetchOrderById = (orderId) => {
    dispatch(
      allActions.orderActions.fetchOrderById({
        params: orderId,
        onSuccess: (orderById) => {
          handleAddToCart(orderById);
        },
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const handleAddToCart = async (orderById) => {
    const listDetail = orderById.listDetail;
    dispatch({
      type: 'CLEAR_ALL',
      onSuccess: () => {
        listDetail.forEach((item) => {
          dispatch({
            type: 'ADD_ALL_ITEMS_TO_CART',
            product: {
              serviceTitle: item.service.title,
              serviceImage: item.service.image,
              serviceCategory: item.service.category.id,
              serviceDesc: item.service.description,
              serviceCharges: '$' + item.service.price,
              minQty: item.service.minQty || 0,
              id: item.service.id,
              categoryTitle: item.service.category.title,
            },
            quantity: item.quantity,
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
                textStyle: {
                  fontFamily: Fonts.poppinsRegular,
                  textAlign: 'center',
                },
                style: {marginBottom: 50},
              });
            },
          });
        });
        navigation?.navigate('CustomerOrderBasket');
      },
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <NavigationEvents onDidFocus={() => fetchOrderHistory()} />
      <AppHeader
        headerTitle="Order History"
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

      {meta?.loading ? (
        <AppLoader />
      ) : (
        <View style={styles.listContainer}>
          <TPFlatList
            loading={loading}
            onRefresh={() => fetchOrderHistory()}
            page={pageNumber}
            pageSize={pageSize}
            total={totalCount}
            pages={totalPages}
            style={{marginHorizontal: 22, flex: 1}}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
            keyExtractor={(item, index) => `order-list-item${index}`}
            showsVerticalScrollIndicator={false}
            data={order?.orderHistory}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index,
            })}
            renderItem={({item}) => (
              <OrderHistoryListItem
                orderNumber={item.orderNumber}
                orderDateTime={item.orderDateTime}
                orderStatus={item.orderStatus}
                itemCount={item.itemCount}
                progressColor={item.progressColor}
                progressCount={item.progressCount}
                progressImage={item.progressImage}
                serviceCharges={item.serviceCharges}
                onRepeatOrder={() => fetchOrderById(item.orderId)}
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
});

export default CustomerOrderHistory;

const _styles = (colors) =>
  StyleSheet.create({
    listContainer: {
      flex: 1,
      marginVertical: 10,
    },
  });
