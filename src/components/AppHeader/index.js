import React, {memo} from 'react';
import {StyleSheet, Text, ImageBackground, View} from 'react-native';
import Button from '../Button';
import {SafeAreaView} from 'react-navigation';
import {Fonts} from '../../theme/fonts';
import useCustomTheme from '../../theme/useTheme';

const AppHeader = memo(
  ({
    headerTitle,
    headerTitleStyle,
    headerStyle,
    leftButtonImage,
    rightButtonImage,
    leftButtonText,
    rightButtonText,
    onRightButtonPress,
    onLeftButtonPress,
    children,
  }) => {
    const {colors} = useCustomTheme();
    const styles = _styles(colors);
    return (
      <ImageBackground
        style={{...styles.container, ...headerStyle}}
        source={require('../../../assets/img/bg_header.png')}>
        <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
          <View style={styles.headerContent}>
            <Button
              imageStyle={{height: 27, width: 27}}
              text={leftButtonText}
              svg={leftButtonImage}
              onPress={() => onLeftButtonPress && onLeftButtonPress()}
            />
            {headerTitle ? (
              <Text
                numberOfLines={1}
                style={{...styles.headerTitle, ...headerTitleStyle}}>
                {headerTitle}
              </Text>
            ) : null}
            <Button
              imageStyle={{height: 27, width: 27}}
              text={rightButtonText}
              svg={rightButtonImage}
              onPress={() => onRightButtonPress && onRightButtonPress()}
            />
          </View>

          <View style={styles.subViewStyle}>{children}</View>
        </SafeAreaView>
      </ImageBackground>
    );
  },
);

export default AppHeader;

const _styles = (colors) =>
  StyleSheet.create({
    container: {
      height: 300,
      width: '100%',
      position: 'relative',
      top: 0,
      left: 0,
      backgroundColor: colors.darkOrange,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 18,
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 16,
      letterSpacing: 0.3,
      textAlign: 'center',
      width: 200,
      color: colors.white,
      lineHeight: 25,
    },
    subViewStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
