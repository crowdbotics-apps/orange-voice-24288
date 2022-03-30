import React, {useEffect, memo} from 'react';
import {BackHandler, Platform} from 'react-native';
import {connect, useSelector} from 'react-redux';
import allActions from '../redux/actions';
import useCustomTheme from '../theme/useTheme';
import {App} from './AppNavigation';

const ReduxNavigation = memo(({dispatch, nav}) => {
  const {setColors, colors} = useCustomTheme();
  const domain = useSelector((state) => state.domain);

  useEffect(() => {
    dispatch(
      allActions.domainActions.fetchDomain({
        onFail: (e) => console.warn(e),
        onSuccess: (data) => {},
      }),
    );
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', undefined);
    }
  }, []);

  useEffect(() => {
    setColors({...colors, ...domain?.domain}); // eslint-disable-next-line
  }, [domain]);

  return <App dispatch={dispatch} state={nav} />;
});

const mapStateToProps = (state) => ({nav: state.nav});

export default connect(mapStateToProps)(ReduxNavigation);
