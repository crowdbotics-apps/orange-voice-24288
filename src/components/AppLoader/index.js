import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import useCustomTheme from '../../theme/useTheme';

const AppLoader = () => {
  const {colors} = useCustomTheme();
  return (
    <ActivityIndicator
      style={styles.indicatorStyle}
      importantForAccessibility="auto"
      animating={true}
      size="large"
      color={colors.darkOrange}
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
