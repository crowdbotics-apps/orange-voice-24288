import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import allReducers from './redux/reducers';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas/rootSaga';
import {Root} from 'native-base';
import Navigation from './navigations';
import OneSignal from 'react-native-onesignal';
import storage from './redux/utils/storage';
import NetworkUtils from './redux/utils/networkUtils';
import ThemeContextProvider from './theme/ThemeContext';

const sagaMiddleware = creatSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

// Staging / QA API ID:
const ONE_SIGNAL_APP_ID = 'c4b890bf-dd98-44cb-af38-23a1f012df04';

// Prod API ID:
//const ONE_SIGNAL_APP_ID = 'c5ddc39a-f0f7-416b-a48e-fa9d393bac0f';

class App extends React.PureComponent {
  constructor(properties) {
    super(properties);
    this.initialiseOneSignal();
    NetworkUtils.initializeNetInfo();
  }

  async initialiseOneSignal() {
    const routeName = await storage.getData('routeName');

    if (routeName === 'CustomerLogin') {
      OneSignal.setLogLevel(6, 0);
      OneSignal.init(ONE_SIGNAL_APP_ID, {
        kOSSettingsKeyAutoPrompt: false,
        kOSSettingsKeyInAppLaunchURL: false,
        kOSSettingsKeyInFocusDisplayOption: 2,
      });
      OneSignal.inFocusDisplaying(2);
      OneSignal.promptForPushNotificationsWithUserResponse(
        this.myiOSPromptCallback,
      );
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {}

  onIds(device) {
    console.log('Device info: ', device);
    const {userId} = device || {};
    storage
      .setData('playerId', userId)
      .then(() => {})
      .catch((e) => console.warn(e));
  }

  myiOSPromptCallback(permission) {
    // do something with permission value
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <ThemeContextProvider>
            <Navigation />
          </ThemeContextProvider>
        </Root>
      </Provider>
    );
  }
}

export default App;
