import React, {memo} from 'react';
import Svg, {Path, G} from 'react-native-svg';

const DropOff = memo(({width = 28, height = 28}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18">
      <G fill="#51BC80">
        <Path
          d="M18.111 13.506h-.637l.273-2.094v-.364a2.227 2.227 0 00-1.912-2.458h-1l-.273-1a.291.291 0 00-.273-.273h-1.276l.364-2.458c0-.182-.091-.364-.273-.364H7.46A2.776 2.776 0 005 1.4a2.826 2.826 0 00-3 2.547 2.724 2.724 0 001.912 3L3 13.6h-.638a.291.291 0 00-.273.273v1.548a.291.291 0 00.273.273H4.82a1.3 1.3 0 001.275 1.275 1.245 1.245 0 001.275-1.275h5.83a1.3 1.3 0 001.275 1.275 1.245 1.245 0 001.275-1.275h2.45a.291.291 0 00.273-.273V13.87c-.089-.182-.273-.364-.362-.364zm-3.186-4.279h.728a1.468 1.468 0 011.183.546 1.631 1.631 0 01.364 1.275v.091h-2.457zm-1.912-1.274h1.092l.182.637h-1.365zm1.275 1.275l-.273 2.094c0 .182.091.364.273.364h2.731l-.273 1.821h-4.552l.273-1.821.364-2.458zM2.544 4.311a2.215 2.215 0 012.185-2.184 2.215 2.215 0 012.185 2.184 2.138 2.138 0 01-2.185 2.094 2.138 2.138 0 01-2.185-2.094zm2 2.731h.182a2.858 2.858 0 002.64-1.821h5.462l-.91 6.282-.271 2.097H3.636zM6 16.328a.622.622 0 01-.637-.637H6.64a.622.622 0 01-.64.637zm8.375 0a.622.622 0 01-.637-.637h1.275a.622.622 0 01-.634.637zm3.368-1.275H2.635v-.91h15.112v.91z"
          data-name="Path 337"
          transform="translate(-.177 -1.381)"
        />
        <Path
          d="M0 0H1.821V0.637H0z"
          data-name="Rectangle 79"
          transform="translate(1.275 6.572)"
        />
        <Path
          d="M0 0H1.821V0.637H0z"
          data-name="Rectangle 80"
          transform="translate(0 10.305)"
        />
        <Path
          d="M0 0H1.821V0.637H0z"
          data-name="Rectangle 81"
          transform="translate(.637 8.484)"
        />
        <Path
          d="M6.157 4.812l-.819-.546V2.9H4.7v1.548c0 .091.091.182.182.273l.91.637z"
          data-name="Path 338"
          transform="translate(-.421 -1.517)"
        />
        <Path
          d="M0 0H2.458V0.637H0z"
          data-name="Rectangle 82"
          transform="translate(13.565 10.942)"
        />
        <Path
          d="M0 0H2.458V0.637H0z"
          data-name="Rectangle 83"
          transform="translate(7.738 10.942)"
        />
        <Path
          d="M0 0H0.637V0.637H0z"
          data-name="Rectangle 84"
          transform="translate(6.464 10.942)"
        />
        <Path
          d="M0 0H0.637V0.637H0z"
          data-name="Rectangle 85"
          transform="translate(5.28 10.942)"
        />
      </G>
    </Svg>
  );
});

export default DropOff;
