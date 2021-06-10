import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../Button';
import {Fonts} from '../../theme/fonts';
import {Plus} from '../../../assets/img/plus';
import {Minus} from '../../../assets/img/minus';

const NumberCounter = memo(
  ({onValueChanged, counterTextStyle, counterContainerStyle, counterValue, minValue = 0}) => {
    return (
      <View style={{...styles.counterContainer, ...counterContainerStyle}}>
        <Button
          buttonStyle={styles.counterButton}
          svg={<Plus />}
          onPress={() => onValueChanged && onValueChanged(counterValue + 1)}
        />
        <Text style={{...styles.counterText, ...counterTextStyle}}>
          {counterValue}
        </Text>
        <Button
          buttonStyle={styles.counterButton}
          svg={<Minus />}
          onPress={() =>
            onValueChanged &&
            onValueChanged(counterValue > minValue ? counterValue - 1 : counterValue)
          }
        />
      </View>
    );
  },
);

export default NumberCounter;

const styles = StyleSheet.create({
  counterContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterButton: {
    height: 22,
    width: 22,
    backgroundColor: '#357bf333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontWeight: 'bold',
    marginHorizontal: 15,
    fontSize: 18,
    letterSpacing: 0.11,
    color: '#357bf3',
  },
});
