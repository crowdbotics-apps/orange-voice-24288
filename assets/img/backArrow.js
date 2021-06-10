import React from 'react';
import {Svg, G, Path} from 'react-native-svg';
import {Colors} from '../../src/theme/color';

export const BackArrow = () => {
  return (
    <Svg width="12" height="20" viewBox="0 0 12.196 20.15">
      <G
        fill="none"
        stroke={Colors.white}
        strokeLinecap="round"
        strokeWidth="3"
        transform="rotate(45 2.477 13.222)">
        <Path d="M0 0L11.248 0" transform="translate(0 11.248)" />
        <Path d="M0 0L0 11.248" />
      </G>
    </Svg>
  );
};
