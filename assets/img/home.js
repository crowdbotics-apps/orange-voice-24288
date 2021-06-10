import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {Colors} from '../../src/theme/color';

export const Home = () => {
  return (
    <Svg width="16" height="15" viewBox="0 0 14 12.964">
      <Path
        fill={Colors.darkOrange}
        d="M9.281 2.594l-.367.351-6.633 6.633.733.733.654-.654v5.9h4.593v-5.1H10.3v5.1h4.592v-5.9l.654.654.733-.733-6.631-6.633zm0 1.451l4.592 4.592v5.9h-2.551v-5.1H7.24v5.1H4.689v-5.9z"
        transform="translate(-2.281 -2.594)"
      />
    </Svg>
  );
};
