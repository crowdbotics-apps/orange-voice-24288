import React from 'react';
import {Svg, Path} from 'react-native-svg';

export const Minus = () => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15">
      <Path
        fill="none"
        stroke="#357bf3"
        strokeLinecap="round"
        strokeWidth="2"
        d="M0 0L11 0"
        transform="translate(2 2) translate(0 5.5)"
      />
    </Svg>
  );
};
