import React from 'react';
import {Svg, G, Path} from 'react-native-svg';

export const Plus = () => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15">
      <G
        fill="none"
        stroke="#357bf3"
        strokeLinecap="round"
        strokeWidth="2"
        transform="translate(2 2)">
        <Path d="M0 11L0 0" transform="translate(5.5)" />
        <Path d="M0 0L11 0" transform="translate(0 5.5)" />
      </G>
    </Svg>
  );
};
