import React from 'react';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

export const Menu = () => {
  return (
    <Svg width="25" height="18" viewBox="0 0 25 18">
      <Defs>
        <ClipPath id="a">
          <Path fill="none" d="M0 0H25V18H0z" />
        </ClipPath>
      </Defs>
      <G clip-path="url(#a)">
        <Path
          fill="#fff"
          d="M21 67h21c1.1 0 2 .672 2 1.5s-.9 1.5-2 1.5H21c-1.1 0-2-.672-2-1.5s.9-1.5 2-1.5z"
          transform="translate(-19 -66)"
        />
        <Path
          fill="#fff"
          d="M21 67h21c1.1 0 2 .672 2 1.5s-.9 1.5-2 1.5H21c-1.1 0-2-.672-2-1.5s.9-1.5 2-1.5z"
          transform="translate(-19 -59)"
        />
        <Path
          fill="#fff"
          d="M21 67h21c1.1 0 2 .672 2 1.5s-.9 1.5-2 1.5H21c-1.1 0-2-.672-2-1.5s.9-1.5 2-1.5z"
          transform="translate(-19 -52)"
        />
      </G>
    </Svg>
  );
};
