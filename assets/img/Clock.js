import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const Clock = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...props}>
    <Path
      d="M9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 16.945A7.945 7.945 0 1 1 16.945 9 7.954 7.954 0 0 1 9 16.945Z"
      fill={props?.fill || '#2c436a'}
    />
    <Circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      transform="translate(8.097 1.5)"
      fill={props?.fill || '#2c436a'}
    />
    <Circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      transform="translate(1.821 8.903)"
      fill={props?.fill || '#2c436a'}
    />
    <Circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      transform="translate(15.5 8.903)"
      fill={props?.fill || '#2c436a'}
    />
    <Circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      transform="translate(8.097 15.179)"
      fill={props?.fill || '#2c436a'}
    />
    <Path
      d="M11.654 5.502 9.648 7.515a1.352 1.352 0 0 0-1.262.087L7.091 6.519a.449.449 0 1 0-.576.689l1.31 1.1a1.347 1.347 0 1 0 2.473-.171l1.991-2a.449.449 0 1 0-.636-.634ZM9.417 9.061a.449.449 0 1 1 0-.635.449.449 0 0 1 .001.635Z"
      fill={props?.fill || '#2c436a'}
    />
  </Svg>
);

export default Clock;
