import React, {memo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Label} from 'native-base';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Menu} from '../../../assets/img/menu';
import {Fonts} from '../../theme/fonts';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import useCustomTheme from '../../theme/useTheme';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const AddressListing = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {colors} = useCustomTheme();
  const styles = _styles(colors);
  const address = useSelector((state) => state.address.address);
  const user = useSelector((state) => state.user.user);
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

  const handleDeletePress = (id) => {
    dispatch(
      allActions.addressActions.deleteUserAddress({
        params: id,
        onSuccess: () => {
          fetchAllAddress();
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
    fetchAllAddress();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <AppHeader
        headerTitle="Delivery Address"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<Menu />}
        onLeftButtonPress={() => navigation.openDrawer()}
      />
      <FlatList
        style={{marginVertical: 20}}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        keyExtractor={(item, index) => `list-address${index}`}
        data={address}
        ListHeaderComponent={() => {
          return <Text>{address.length === 0 && 'No Record Found!'}</Text>;
        }}
        ListFooterComponent={() => (
          <Button
            text="Add Another Address"
            buttonStyle={styles.addCardBtn}
            textStyle={styles.addCardBtnTxt}
            onPress={() => {
              navigation.navigate('CustomerAddAddress', {
                buttonTitle: 'Save',
              });
            }}
          />
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.cardRowContainer}
            onPress={() =>
              navigation.navigate('CustomerAddAddress', {address: item})
            }>
            <View style={{flex: 1}}>
              <Label style={styles.fieldLabel}>Address {index + 1}</Label>
              <Text style={styles.fieldInput}>{item.mainAddress}</Text>
            </View>
            <Button
              image={require('../../../assets/img/garbage.png')}
              imageStyle={{height: 18, width: 16}}
              onPress={() => handleDeletePress(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default AddressListing;

const _styles = (colors) =>
  StyleSheet.create({
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
      marginRight: 15,
      color: colors.steelBlue,
      lineHeight: 21,
      marginVertical: 7,
    },
    cardRowContainer: {
      width: 296,
      marginBottom: 15,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomColor: 'rgba(148, 158, 174, 0.2)',
      borderBottomWidth: 0.3,
    },
    addCardBtn: {
      marginTop: 20,
      height: 50,
      width: 334,
      backgroundColor: '#ffffff',
      borderStyle: 'dashed',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ffa304',
    },
    addCardBtnTxt: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 18,
      textAlign: 'center',
      color: colors.darkOrange,
      lineHeight: 27,
    },
  });
