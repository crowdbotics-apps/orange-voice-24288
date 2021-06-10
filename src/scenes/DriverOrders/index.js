import React, {memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Text,
  SectionList,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Colors} from '../../theme/color';
import AppHeader from '../../components/AppHeader';
import DriverTaskItem from '../../components/DriverTaskItem';
import {Image} from 'react-native';
import allActions from '../../redux/actions';
import {errorMessage} from '../../redux/utils/alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../../redux/utils/storage';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import {Fonts} from '../../theme/fonts';
import {clearCredentials} from '../../redux/services/api';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const DriverOrders = memo(({navigation}) => {
  const dispatch = useDispatch();
  const {driverTasks} = useSelector((state) => state.order);
  const order = useSelector((state) => state.order);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDriverTasks = async () => {
    try {
      const driver = await storage.getDriverData();
      const {driverId} = driver || {};
      dispatch(
        allActions.orderActions.fetchAllDriverTasks({
          params: driverId,
          onSuccess: () => {
            setRefreshing(false);
          },
          onFail: (_error) => {
            setRefreshing(false);
            errorMessage({
              message: _error?.message || _error?.Message,
            });
          },
        }),
      );
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDriverTasks();
  };

  const renderListItem = ({item}) => (
    <DriverTaskItem
      order={item}
      jobType={item.jobType}
      assignedDate={item.assignedDate}
      onItemPress={() =>
        navigation.navigate('DriverOrderDetail', {order: item})
      }
    />
  );

  const handleLogOut = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.clear().then(() => {
            clearCredentials();
            navigation.navigate('DriverLogin');
          });
        },
      },
    ]);
  };

  const renderEmptyListView = () => (
    <Text style={styles.txtNoTaskAvailable}>No Task Available</Text>
  );

  const todayTasks = () =>
    driverTasks?.filter((task) => {
      return (
        moment(task.taskDate).format('YYYY-DD-MM') ===
        moment().format('YYYY-DD-MM')
      );
    }) || [];

  const tomorrowTasks = () =>
    driverTasks?.filter((task) => {
      return (
        moment(task.taskDate).format('YYYY-DD-MM') ===
        moment().add(1, 'd').format('YYYY-DD-MM')
      );
    });

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={() => fetchDriverTasks()} />
      <AppHeader
        headerTitle="Assigned Tasks"
        headerStyle={styles.header}
        rightButtonImage={
          <Image source={require('../../../assets/img/power_white.png')} />
        }
        onRightButtonPress={() => handleLogOut()}
      />
      <SectionList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.list}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={renderListItem}
        sections={[
          {
            title: "Today's Tasks",
            data: todayTasks(),
            ListEmptyComponent: renderEmptyListView,
          },
          {
            title: "Tomorrow's Tasks",
            data: tomorrowTasks(),
            ListEmptyComponent: renderEmptyListView,
          },
        ]}
        renderSectionHeader={({section}) => [
          <Text style={styles.sectionHeader}>{section?.title}</Text>,
          section?.data?.length === 0 && section?.ListEmptyComponent(),
        ]}
        SectionSeparatorComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={renderEmptyListView}
      />
    </View>
  );
});

export default DriverOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 20,
  },
  header: {
    height: hasNotch && !isAndroid ? 102 : !hasNotch && !isAndroid ? 85 : 60,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  txtNoTaskAvailable: {
    color: Colors.darkOrange,
    fontSize: 16,
    letterSpacing: 0.3,
    margin: 20,
    textAlign: 'center',
    fontFamily: Fonts.poppinsBold,
  },
  sectionHeader: {
    backgroundColor: 'rgba(247,154,22,1)',
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 20,
    letterSpacing: 0.3,
    fontFamily: Fonts.poppinsRegular,
    color: '#fff',
  },
});
