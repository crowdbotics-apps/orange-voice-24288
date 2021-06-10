import React, {memo} from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import {BackArrow} from '../../../assets/img/backArrow';
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import {Checklist} from '../../../assets/img/checklist';
import {Trolley} from '../../../assets/img/trolley';
import {Tracking} from '../../../assets/img/tracking';
import {Box} from '../../../assets/img/box';
import InProgress from '../../../assets/img/inprogress';
import Cancelled from '../../../assets/img/cancelled';
import {progressColor} from '../../redux/utils/orderUtil';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const CustomerTrackOrder = memo(({navigation}) => {
  const {orderNumber, orderDate, status} = navigation.getParam('orderById');

  const getColor = (_status) =>
    status === _status ? progressColor[status] : 'grey';

  const data = [
    {
      title: 'Order Placed',
      description: 'Order has been placed',
      descriptionStyle: {
        color: getColor('OrderPlaced'),
      },
      lineColor: getColor('OrderPlaced'),
      titleStyle: {
        marginTop: -10,
        color: getColor('OrderPlaced'),
      },
      icon: <Checklist height={18} width={18} />,
    },
    {
      title: 'Picked Up',
      titleStyle: {
        marginTop: -10,
        color: getColor('PickUp'),
      },
      descriptionStyle: {
        color: getColor('PickUp'),
      },
      lineColor: getColor('PickUp'),
      description: 'Driver has picked up clothes packet from you',
      icon: <Trolley height={18} width={18} />,
    },
    {
      title: 'In Progress',
      description: 'Your order is in laundry',
      titleStyle: {
        marginTop: -10,
        color: getColor('InProgress'),
      },
      descriptionStyle: {
        color: getColor('InProgress'),
      },
      lineColor: getColor('InProgress'),
      icon: <InProgress height={18} width={18} />,
    },
    {
      title: 'Delivery Scheduled',
      titleStyle: {
        marginTop: -10,
        color: getColor('DropOff'),
      },
      descriptionStyle: {
        color: getColor('DropOff'),
      },
      lineColor: getColor('DropOff'),
      description: 'Your order has been scheduled for delivery',
      icon: <Tracking height={18} width={18} />,
    },
    {
      title: 'Delivered',
      titleStyle: {
        marginTop: -10,
        color: getColor('Delivered'),
      },
      descriptionStyle: {
        color: getColor('Delivered'),
      },
      lineColor: getColor('Delivered'),
      description: 'Your clothes packet has been delivered to you',
      icon: <Box height={18} width={18} />,
    },
    {
      title: 'Cancelled',
      titleStyle: {
        marginTop: -10,
        color: getColor('Cancelled'),
      },
      descriptionStyle: {
        color: getColor('Cancelled'),
      },
      lineColor: getColor('Cancelled'),
      description: 'Order has been cancelled',
      icon: <Cancelled height={18} width={18} />,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader
        headerTitle="Track your Order"
        headerStyle={{
          height:
            hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
        }}
        leftButtonImage={<BackArrow />}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={{marginLeft: 60, marginVertical: 30}}>
          <Text>
            <Text style={styles.textOrderId}>Order Id: </Text>
            <Text style={styles.textOrderNumber}>{orderNumber}</Text>
          </Text>
          <Text style={styles.textOrderDateTime}>
            {moment.utc(orderDate).local().format('hh:mm A, MM-DD-YYYY')}
          </Text>
        </View>
        <Timeline
          data={data}
          style={{flex: 1}}
          circleSize={20}
          circleColor="rgb(255,255,255)"
          timeContainerStyle={{minWidth: 52}}
          descriptionStyle={{color: 'gray'}}
          innerCircle={'icon'}
        />
      </View>
    </View>
  );
});

export default CustomerTrackOrder;

const styles = StyleSheet.create({
  calloutText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 12,
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
    marginVertical: 5,
    borderRadius: 3,
    color: Colors.white,
    padding: 5,
    backgroundColor: Colors.lightBlue,
    shadowColor: Colors.boxShadow,
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
  textOrderId: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 18,
    letterSpacing: 0.3,
    textAlign: 'left',
    color: '#2c436a',
    lineHeight: 21,
  },
  textOrderNumber: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 18,
    textAlign: 'left',
    color: '#2c436a',
    lineHeight: 21,
  },
  textOrderDateTime: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 14,
    letterSpacing: 0.2,
    textAlign: 'left',
    color: '#2c436a',
    lineHeight: 18,
  },
});
