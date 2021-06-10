import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Label } from 'native-base';
import AppHeader from '../../components/AppHeader';
import { Colors } from '../../theme/color';
import DeviceInfo from 'react-native-device-info';
import { Menu } from '../../../assets/img/menu';
import { Fonts } from '../../theme/fonts';
import Button from '../../components/Button';
import allActions from '../../redux/actions';
import { errorMessage } from '../../redux/utils/alerts';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CreditCardsListing = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.payment.cards);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = () => {
    dispatch(
      allActions.paymentActions.fetchAllCards({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  const deleteCard = (card) => {
    Alert.alert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(
              allActions.paymentActions.deleteCard({
                params: { id: card.id },
                onFail: (_error) => {
                  errorMessage({
                    message: _error?.message || _error?.Message,
                  });
                },
              }),
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <AppHeader
        headerTitle="Payment Details"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<Menu />}
        onLeftButtonPress={() => navigation.openDrawer()}
      />
      <FlatList
        style={{ marginTop: 20, }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontFamily: Fonts.poppinsRegular,
              fontSize: 14,
              textAlign: 'center',
              color: Colors.steelBlue,
              lineHeight: 27,
            }}>
            No Card Found
          </Text>
        )}
        keyExtractor={(item, index) => `list-cards${index}`}
        data={cards}
        ListFooterComponent={() => (
          <Button
            text={`Add ${cards.length > 0 ? 'Another ' : 'New'} Card`}
            buttonStyle={styles.addCardBtn}
            textStyle={styles.addCardBtnTxt}
            onPress={() => {
              navigation.navigate('CustomerPaymentDetails', {
                buttonTitle: 'Save',
              });
            }}
          />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%', paddingHorizontal: 20 }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CustomerPaymentDetails', {
                static: true,
                card: item,
              });
            }}>
            <View style={styles.cardRowContainer}>
              <View style={{ flex: 1 }}>
                <Label style={styles.fieldLabel}>Saved Card</Label>
                <Text style={styles.fieldInput}>XXXX XXXX XXXX {item.cardNumber}</Text>
              </View>
              <Button
                onPress={() => deleteCard(item)}
                image={require('../../../assets/img/garbage.png')}
                imageStyle={{ height: 18, width: 16 }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default CreditCardsListing;

const styles = StyleSheet.create({
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
    marginVertical: 7,
  },
  cardRowContainer: {
    width: '100%',
    marginVertical: 15,
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
    color: '#ed8f31',
    lineHeight: 27,
  },
});
