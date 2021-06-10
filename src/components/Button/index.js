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
        {image && (
          <Image resizeMode={'contain'} style={imageStyle} source={image} />
        )}
        {svg && svg}
        {svgUri && <SvgUri width={26} height={22} uri={svgUri} />}
        {text && <Text style={textStyle}>{text}</Text>}
      </TouchableOpacity>
    );
  },
);

export default Button;

const styles = StyleSheet.create({});
