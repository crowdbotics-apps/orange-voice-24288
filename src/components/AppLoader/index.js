import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme/color';

const AppLoader = () => {
  return (
    <ActivityIndicator
      style={styles.indicatorStyle}
      importantForAccessibility="auto"
      animating={true}
      size="large"
      color={Colors.darkOrange}
    />
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  indicatorStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
