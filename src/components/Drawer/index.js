import React, {memo, useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {LoginManager, ShareDialog} from 'react-native-fbsdk';
import OrderHistory from '../../../assets/img/drawer/order.svg';
import Email from '../../../assets/img/drawer/email.svg';
import Question from '../../../assets/img/drawer/question.svg';
import Receipt from '../../../assets/img/drawer/receipt.svg';
import Tracking from '../../../assets/img/drawer/tracking.svg';
import {Text, Separator} from 'native-base';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import {Home} from '../../../assets/img/home';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import storage from '../../../src/redux/utils/storage';
import {clearCredentials} from '../../redux/services/api';
import {errorMessage} from '../../redux/utils/alerts';
import allActions from '../../redux/actions/index';

const listItems = [
  {
    title: 'Home',
    route: 'CustomerHome',
    icon: <Home />,
  },
  {
    title: 'Order History',
    route: 'CustomerOrderHistory',
    icon: <OrderHistory />,
  },
  {
    title: 'Delivery Address',
    route: 'AddressListing',
    icon: <Tracking />,
  },
  {
    title: 'Payment Setting',
    buttonTitle: 'Save',
    route: 'CreditCardsListing',
    icon: <Receipt />,
  },
  {
    title: 'FAQs',
    route: 'CustomerLegal',
    icon: <Question />,
  },
  {
    title: 'Contact Us',
    icon: <Email />,
  },
];

const message =
  'I am using LaundrEZ app. Download from http://laundrez.ca, Use my referral code while registration : ';
const message2 =
  'Try LaundrEZ, the easiest way to stay clean http://laundrez.ca.\n\nUse my referral code while registration : ';

export const Drawer = memo(({navigation}) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {system} = useSelector((state) => state.products.config);

  const navigateToCustomerProfile = async () => {
    let params = {};
    try {
      const isSocial = await storage.isSocial();
      params.isSocial = isSocial;
    } catch (e) {
      params.isSocial = false;
    }
    navigation.navigate('CustomerViewProfile', {...params});
  };

  const shareOnFacebook = () => {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'http://laundrez.ca',
      contentDescription: `${message2} ${user?.referralCode}`,
    };

    ShareDialog.canShow(shareLinkContent)
      .then(function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function (result) {},
        function (error) {
          //alert('Share failed with error: ' + error.message);
        },
      );
  };

  const getDrawerHeader = () => {
    return (
      <ImageBackground
        style={{height: 260}}
        imageStyle={{height: 220}}
        source={require('../../../assets/img/bg_header.png')}>
        <View style={styles.headerContainer}>
          {user?.firstName && (
            <Text style={styles.headerUsername}>
              {user?.firstName + ' ' + user?.lastName}
            </Text>
          )}
          <Button
            text="View Profile"
            buttonStyle={{marginVertical: 3}}
            textStyle={styles.buttonViewProfile}
            onPress={navigateToCustomerProfile}
          />
        </View>
      </ImageBackground>
    );
  };

  const socialShare = (socialMedia) => {
    if (socialMedia === Share.Social.FACEBOOK) {
      shareOnFacebook();
    } else {
      Share.shareSingle({
        title: 'Hey there! I am using LaundrEZ app.',
        message: message2,
        url: `${user?.referralCode}`,
        whatsAppNumber: '+1',
        social: socialMedia,
        subject: 'Hey there! I am using LaundrEZ app.',
      }).catch(({error}) => {
        errorMessage({message: error.message});
      });
    }
  };
  const handleLogoutPress = useCallback((accesToken, userEmail, playerId) => {
    console.log("VALUES HERE" + accesToken + ' ' + userEmail);
    dispatch(
      allActions.authActions.signOut({
        params: {
          token: accesToken,
          email: userEmail,
        },
        onSuccess: () => {
          
          console.log('API SUCCESS');
          // try {
            
          // } catch (e) {
          //   console.warn(e);
          // }
          // navigation.navigate('Customer');
  
          AsyncStorage.clear().then(() => {
            clearCredentials();
            storage.clearCredentials();
            LoginManager.logOut();
            storage.setData('isFirstTime', 'no');
            storage.setData('playerId', playerId);
            navigation.navigate('Auth');
          });
        },
        onFail: (_error) => {
          console.log('API FAILED');
        },
      }),
    );
  }, []);

  const getDrawerFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.textShare}>Share</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Button
              onPress={() => socialShare(Share.Social.FACEBOOK)}
              image={require('../../../assets/img/ic_facebook.png')}
              imageStyle={{height: 22, width: 22}}
            />
            <Button
              onPress={() => socialShare(Share.Social.TWITTER)}
              image={require('../../../assets/img/ic_twitter.png')}
              buttonStyle={{marginHorizontal: 10}}
              imageStyle={{height: 22, width: 22}}
            />
            <Button
              onPress={() => socialShare(Share.Social.WHATSAPP)}
              image={require('../../../assets/img/ic_whatsapp.png')}
            />
            <Button
              onPress={() => socialShare(Share.Social.EMAIL)}
              image={require('../../../assets/img/ic_email.png')}
              buttonStyle={{marginHorizontal: 10}}
              imageStyle={{height: 21, width: 27}}
            />
          </View>
        </View>
        <Button
          onPress={async () => {
            let playerId = '';
            var credentials;
            try {
              playerId = await storage.getData('playerId');
              credentials = await storage.loadCredentials();
              
              const {access_token, user_email} = credentials;
              console.log('REFRESH TOKEN ' + access_token + ' EMAIL ' + user_email)
              handleLogoutPress(access_token, user_email, playerId);
            } catch (e) {}
            // AsyncStorage.clear().then(() => {
            //   clearCredentials();
            //   storage.clearCredentials();
            //   LoginManager.logOut();
            //   storage.setData('isFirstTime', 'no');
            //   storage.setData('playerId', playerId);
            //   navigation.navigate('Auth');
            // });
          }}
          buttonStyle={{marginTop: '15%', alignItems: 'center'}}
          image={require('../../../assets/img/power.png')}
          textStyle={styles.textLogOut}
          text="Logout"
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => getDrawerHeader()}
        ListFooterComponent={() => getDrawerFooter()}
        data={listItems}
        bounces={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                item.title === 'Contact Us'
                  ? Linking.openURL(`mailto:${system?.ContactEmail}?subject=`)
                  : navigation.navigate(item.route, {
                      title: item.title,
                      buttonTitle: item.buttonTitle,
                    })
              }
              style={{marginRight: 40, marginLeft: 25}}>
              <View style={styles.body}>
                {item.icon}
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Separator style={styles.separator} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});


const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  footerContainer: {
    height: 200,
    justifyContent: 'space-evenly',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  headerUsername: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#ffffff',
  },
  buttonViewProfile: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#ffffff',
  },
  textShare: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#2c436a',
  },
  textLogOut: {
    marginLeft: 10,
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 0.2,
    color: '#ed8f31',
  },
  separator: {
    height: 1.0,
    backgroundColor: '#c4cad5',
    marginVertical: 15,
  },
  title: {
    fontFamily: Fonts.poppinsRegular,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    color: Colors.steelBlue,
  },
  body: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    alignItems: 'center',
  },
});
