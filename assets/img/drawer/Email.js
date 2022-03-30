import * as React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

const Email = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={15.999} {...props}>
    <Defs ></Defs>
    <G id="prefix__email" transform="translate(-.001 -.015)" >
      <G
        id="prefix__Group_106"
        data-name="Group 106"
	fill={props.fill}
        transform="translate(.001 .015)">
        <G id="prefix__Group_105" data-name="Group 105">
          <Path
            id="prefix__Path_265"
            d="M16 6.147v-.016a.255.255 0 0 0-.011-.054.276.276 0 0 0-.015-.046.257.257 0 0 0-.027-.04.262.262 0 0 0-.036-.042s-.011-.009-.011-.012l-2.566-1.992V1.88a.8.8 0 0 0-.8-.8h-2.89L8.487.182a.791.791 0 0 0-.973 0l-1.157.9h-2.89a.8.8 0 0 0-.8.8v2.063L.1 5.937s0 .008-.007.012a.262.262 0 0 0-.036.042.255.255 0 0 0-.027.04.263.263 0 0 0-.015.046A.253.253 0 0 0 0 6.13v9.084a.79.79 0 0 0 .045.252.264.264 0 0 0 .293.4.794.794 0 0 0 .462.148h14.4a.8.8 0 0 0 .463-.15.263.263 0 0 0 .293-.4.791.791 0 0 0 .044-.25V6.147zM7.841.6a.256.256 0 0 1 .318 0l.615.478H7.227zM.867 15.481l6.974-5.417a.257.257 0 0 1 .318 0l6.976 5.417zm14.6-.417-6.98-5.422a.791.791 0 0 0-.972 0L.534 15.064V6.553L4.9 9.947a.267.267 0 1 0 .327-.422L.791 6.078 2.667 4.62v2.061a.267.267 0 1 0 .533 0V1.88a.267.267 0 0 1 .267-.267h9.067a.267.267 0 0 1 .267.267v4.8a.267.267 0 1 0 .533 0V4.62l1.876 1.458-4.447 3.453a.267.267 0 1 0 .327.421l4.378-3.4z"
            className="prefix__cls-1"
            data-name="Path 265"
            transform="translate(-.001 -.015)"
            fill={props.fill}
          />
          <Path
            id="prefix__Path_266"
            d="M162.392 94.377h5.333a.267.267 0 0 0 0-.533h-5.333a.267.267 0 1 0 0 .533z"
            className="prefix__cls-1"
            data-name="Path 266"
            transform="translate(-157.059 -90.912)"
            fill={props.fill}
          />
          <Path
            id="prefix__Path_267"
            d="M167.992 145.311a.267.267 0 0 0-.267-.267h-5.333a.267.267 0 1 0 0 .533h5.333a.267.267 0 0 0 .267-.266z"
            className="prefix__cls-1"
            data-name="Path 267"
            transform="translate(-157.059 -140.512)"
            fill={props.fill}
          />
          <Path
            id="prefix__Path_268"
            d="M258.925 196.511a.267.267 0 0 0-.267-.267h-2.4a.267.267 0 1 0 0 .533h2.4a.267.267 0 0 0 .267-.266z"
            className="prefix__cls-1"
            data-name="Path 268"
            transform="translate(-247.992 -190.112)"
            fill={props.fill}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default Email;
