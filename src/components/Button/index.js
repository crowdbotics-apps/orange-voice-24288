import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';

const Button = memo(
  ({text, image, svg, svgUri, buttonStyle, textStyle, imageStyle, ...rest}) => {
    return (
      <TouchableOpacity
        {...rest}
        style={{
          ...buttonStyle,
          flexDirection: 'row',
          opacity: rest.disabled ? 0.5 : 1,
        }}>
        {image ? (
          <Image resizeMode={'contain'} style={imageStyle} source={image} />
        ) : null}
        {svg ? svg : null}
        {svgUri ? <SvgUri width={26} height={22} uri={svgUri} /> : null}
        {text ? <Text style={textStyle}>{text}</Text> : null}
      </TouchableOpacity>
    );
  },
);

export default Button;

const styles = StyleSheet.create({});
