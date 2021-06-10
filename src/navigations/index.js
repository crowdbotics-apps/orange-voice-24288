import React, {useEffect, memo} from 'react';
import {BackHandler, Platform} from 'react-native';
import {connect} from 'react-redux';
import {App} from './AppNavigation';

const ReduxNavigation = memo(({dispatch, nav}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', undefined);
    }
  }, []);

  return <App dispatch={dispatch} state={nav} />;
});

const mapStateToProps = (state) => ({nav: state.nav});

export default connect(mapStateToProps)(ReduxNavigation);
