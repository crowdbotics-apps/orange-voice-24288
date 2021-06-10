import React, {memo} from 'react';
import Svg, {Path} from 'react-native-svg';

export const Edit = memo(({width = '64', height = '64'}) => (
  <Svg width={width} height={height} viewBox="0 0 48 48">
    <Path
      fill="#FFF"
      d="M36.828 4c-.512 0-1.023.195-1.414.586L32 8l8 8 3.414-3.414a2 2 0 000-2.828l-5.172-5.172A1.994 1.994 0 0036.828 4zM29 11L6 34v8h8l23-23zm0 0"
    />
  </Svg>
));
