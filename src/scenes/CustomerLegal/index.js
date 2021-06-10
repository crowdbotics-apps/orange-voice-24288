import React, {memo, useEffect} from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {Colors} from '../../theme/color';
import {Menu} from '../../../assets/img/menu';
import ServiceFAQs from '../../components/ServiceFAQs';
import {isEqual} from 'lodash';
import {Fonts} from '../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerLegal = memo(({navigation}) => {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.products.faqs);

  const isFAQ = isEqual(navigation.getParam('title'), 'FAQs');

  const fetchAllFAQs = () => {
    dispatch(
      allActions.productActions.fetchAllFAQs({
        onFail: (_error) => {
          errorMessage({
            message: _error?.message || _error?.Message,
          });
        },
      }),
    );
  };

  useEffect(() => {
    if (isFAQ) {
      fetchAllFAQs();
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader
        headerTitle={navigation.getParam('title')}
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<Menu />}
        onLeftButtonPress={() => navigation.openDrawer()}
      />
      <View style={styles.listContainer}>
        {(isEqual(navigation.getParam('title'), 'Terms & Conditions') ||
          isEqual(navigation.getParam('title'), 'Privacy Policy')) && (
          <View style={{flex: 1, marginHorizontal: 15, marginVertical: 20}}>
            <Text
              style={{
                flexDirection: 'row',
                fontFamily: Fonts.poppinsMedium,
                fontSize: 14,
                letterSpacing: 0.2,
                color: '#ed8f31',
                lineHeight: 18,
              }}>
              <Text>Last Update: </Text>
              <Text>1 April, 2019</Text>
            </Text>
            <Text
              style={{
                fontFamily: Fonts.poppinsRegular,
                fontSize: 12,
                marginTop: 10,
                color: '#2c436a',
                textAlign: 'justify',
                lineHeight: 16,
              }}>
              Please read these terms and conditions of use as set out below
              (the “Terms”) carefully before using the LaundrEZ application (the
              “Service”). These Terms govern your access to and use of this
              Service, including the messages, information, data, text,
              software, images and other content that make up this site (the
              “Content,” which content is part of this Service). These Terms
              exempt LaundrEZ Inc. (“LaundrEZ,” “we,” or “us”) and others from
              liability and/or limit our and their liability and contain other
              important provisions that apply to your use of this site. Terms of
              Use of Service Your use of this Service is conditional on your
              acceptance of these Terms. By visiting or using this Service you
              agree on your own behalf, and on behalf of any organization on
              whose behalf you may act (collectively referred to herein as
              “you”), to accept and abide by these Terms for each use of and
              each visit to this Service. You also agree to comply with our
              privacy statement available at
              www.laundrez.ca/privacystatement(the “Privacy Statement”). We have
              the right, in our sole discretion, to add to, remove, modify or
              otherwise change any part of these Terms, in whole or in part, at
              any time. If we exercise this right, the “Last Update” notice at
              the top of this document shall be amended to reflect the last date
              of such changes. Changes will be effective as of the date the
              changes to these Terms are posted to this Service. It is your
              responsibility to check these Terms each time you access this
              Service to determine whether any changes have been made, including
              by checking the date of the “Last Update” at the top of these
              Terms. If any change to these Terms is not acceptable to you, you
              must discontinue your use of this Service immediately. Your
              continued use of this Service after any such changes are posted
              will constitute acceptance of those changes. These Terms apply
              exclusively to your use of this Service and do not alter the terms
              or conditions of any other agreement you may have with us.
            </Text>
          </View>
        )}
        {isFAQ && (
          <View style={{flex: 1, marginTop: 20}}>
            <ServiceFAQs
              faqs={faqs}
              titleTextStyle={{alignItems: 'flex-start'}}
            />
          </View>
        )}
      </View>
    </View>
  );
});

export default CustomerLegal;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
