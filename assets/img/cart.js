import React, {memo} from 'react';
import {Svg, Path, Circle} from 'react-native-svg';
import {useCustomTheme} from '../../src/theme/useTheme';

export const Cart = memo(({hasItem, color, height, width}) => {
  const {colors} = useCustomTheme();
  return (
    <Svg
      width={width ? width : 20}
      height={height ? height : 17}
      viewBox="0 0 20.108 17">
      {hasItem ? (
        <Circle
          stroke={colors.darkOrange}
          fill="#fff"
          cx={2}
          cy={6}
          r={8 / 2}
        />
      ) : null}
      <Path
        fill={color ? color : colors.darkOrange}
        d="M19.81 5.705a1.388 1.388 0 00-1.093-.526h-3.873l-2.1-4.824a.59.59 0 10-1.08.473l1.894 4.351H6.55L8.444.828a.59.59 0 10-1.08-.473l-2.1 4.824H1.391A1.388 1.388 0 00.3 5.705a1.364 1.364 0 00-.264 1.158L2.1 15.925A1.381 1.381 0 003.46 17h13.189a1.381 1.381 0 001.357-1.075l2.068-9.063a1.364 1.364 0 00-.264-1.158zm-3.161 10.112H3.46a.211.211 0 01-.208-.157L1.183 6.598a.181.181 0 01.037-.157.214.214 0 01.172-.081h3.357l-.149.357a.592.592 0 00.3.778.588.588 0 00.776-.305l.36-.828h8.038l.36.828a.59.59 0 101.079-.473l-.154-.355h3.358a.214.214 0 01.172.081.181.181 0 01.037.157l-2.068 9.063a.211.211 0 01-.208.156z"
      />
      <Path
        fill={color ? color : colors.darkOrange}
        d="M6.519 8.922a.59.59 0 00-.589.591v4.334a.589.589 0 101.178 0V9.513a.59.59 0 00-.589-.591zM10.054 8.922a.59.59 0 00-.589.591v4.334a.589.589 0 101.178 0V9.513a.59.59 0 00-.589-.591zM13.589 8.922a.59.59 0 00-.589.591v4.334a.589.589 0 101.178 0V9.513a.59.59 0 00-.589-.591z"
      />
    </Svg>
  );
});
