import React, {memo} from 'react';
import {StyleSheet, Text, ImageBackground, View} from 'react-native';
import Button from '../Button';
import {SafeAreaView} from 'react-navigation';
import {Fonts} from '../../theme/fonts';
import {Colors} from '../../theme/color';

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
            {headerTitle && (
              <Text
                numberOfLines={1}
                style={{...styles.headerTitle, ...headerTitleStyle}}>
                {headerTitle}
              </Text>
            )}
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

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0,
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
    color: Colors.white,
    lineHeight: 25,
  },
  subViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
