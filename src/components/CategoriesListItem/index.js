import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../theme/fonts';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import useCustomTheme from '../../theme/useTheme';

const CategoriesListItem = memo(
  ({categoryTitle, categoryPrice, categoryImage, onPress}) => {
    const startingFromPrice = categoryPrice ?? 0;

    const {colors} = useCustomTheme();
    const styles = _styles(colors);

    return (
      <TouchableOpacity onPress={() => onPress && onPress()}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle} numberOfLines={1}>
            {categoryTitle}
          </Text>
          {categoryImage ? (
            !categoryImage.endsWith('.svg') ? (
              <FastImage
                style={{width: 91, height: 100}}
                source={{uri: categoryImage}}
                fallback
                resizeMode={'contain'}
                defaultSource={require('../../../assets/img/no-image-png.png')}
              />
            ) : (
              <SvgUri width={91} height={100} uri={categoryImage} />
            )
          ) : null}
          <Text style={styles.textStartingFrom}>Starting From</Text>
          <Text style={styles.categoryPrice}>{`$${startingFromPrice}`}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default CategoriesListItem;

const _styles = (colors) =>
  StyleSheet.create({
    categoryContainer: {
      height: 200,
      marginLeft: 15,
      alignItems: 'center',
      width: 128,
      backgroundColor: colors.white,
      shadowColor: colors.boxShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      padding: 10,
      shadowRadius: 5.3,
      shadowOpacity: 1,
      elevation: 5,
    },
    categoryPrice: {
      fontFamily: Fonts.poppinsBold,
      fontSize: 14,
      color: colors.steelBlue,
    },
    textStartingFrom: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 10,
      marginTop: 10,
      color: colors.steelBlue,
    },
    categoryTitle: {
      fontFamily: Fonts.poppinsMedium,
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.steelBlue,
      lineHeight: 21,
    },
    categoryImage: {
      height: 100,
      width: 91,
      marginTop: 5,
    },
  });
