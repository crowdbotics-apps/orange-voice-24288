import NetInfo from '@react-native-community/netinfo';

let hasConnection = false;

export default class NetworkUtils {
  static initializeNetInfo() {
    NetInfo.addEventListener((state) => {
      hasConnection = state.isConnected;
    });
  }

  static isNetworkAvailable() {
    return hasConnection;
  }
}
