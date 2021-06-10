import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const CircleImageView = memo(({source}) => {
  return (
    <FastImage
      source={{uri: source}}
      style={styles.profileImg}
      fallback
      defaultSource={require('../../../assets/img/no-available-image.png')}
    />
  );
});

export default CircleImageView;

const styles = StyleSheet.create({
  profileImg: {
    height: 72,
    width: 72,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 72 / 2,
    borderColor: '#e0e2e6',
  },
});
