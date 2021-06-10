import React, {memo} from 'react';
import {Svg, Path} from 'react-native-svg';

export const Trolley = memo(({width = '26.148', height = '28.858'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 26.148 28.858">
      <Path
        fill="#c367f1"
        d="M25.759 25.69l-.826-.826a3.112 3.112 0 00-1.5-.836.874.874 0 00.008-.111V7.652a.876.876 0 00-.875-.875H6.296a.876.876 0 00-.875.875v13.1a.423.423 0 00.845 0v-13.1a.029.029 0 01.029-.029h5.9v5a.423.423 0 00.423.423h3.615a.423.423 0 00.423-.423v-5h5.9a.029.029 0 01.029.029v16.265a.029.029 0 01-.029.029H9.007a.423.423 0 000 .845h13.71a2.272 2.272 0 011.618.67l.826.826a.481.481 0 11-.68.68l-.826-.826a1.336 1.336 0 00-.938-.388H7.59a3.578 3.578 0 00-3.13-4.041V3.772a1.328 1.328 0 00-.279-1.467L2.264.388A1.327 1.327 0 00.388 2.264l1.917 1.917a1.328 1.328 0 001.309.335v17.2A3.585 3.585 0 107.367 26.6h15.35a.485.485 0 01.34.141l.826.826a1.327 1.327 0 101.876-1.876zM15.814 12.2h-2.769V7.623h2.769zM3.583 3.583a.481.481 0 01-.68 0L.986 1.666a.481.481 0 01.68-.68L3.583 2.9a.481.481 0 010 .683zm.454 24.43a2.74 2.74 0 112.74-2.74 2.743 2.743 0 01-2.74 2.74z"
        transform="translate(-24.048) translate(24.048)"
      />
      <Path
        fill="#c367f1"
        d="M1.778 0a1.778 1.778 0 101.778 1.778A1.78 1.78 0 001.778 0zm0 2.711a.933.933 0 11.933-.933.934.934 0 01-.933.933z"
        transform="translate(-24.048) translate(26.307 23.495)"
      />
      <Path
        fill="#c367f1"
        d="M4.037 0H.422a.423.423 0 100 .845h3.615a.423.423 0 000-.845z"
        transform="translate(-24.048) translate(32.633 20.332)"
      />
      <Path
        fill="#c367f1"
        d="M5.846 0H.424a.423.423 0 000 .845h5.422a.423.423 0 100-.845z"
        transform="translate(-24.048) translate(32.633 18.525)"
      />
    </Svg>
  );
});
