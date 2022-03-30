import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fonts} from '../../theme/fonts';
import {AccordionList} from 'accordion-collapse-react-native';
import useCustomTheme from '../../theme/useTheme';

const ServiceFAQs = memo(
  ({
    titleTextStyle,
    titleStyle,
    itemBodyStyle,
    getListViewFooter,
    getListViewHeader,
    faqs,
  }) => {
    const [selectedSection, setSelectedSection] = useState(-1);
    const {colors} = useCustomTheme();
    const styles = _styles(colors);
    const _head = (item, index) => {
      return (
        <View
          style={{
            ...styles.itemTitleContainer(index, selectedSection),
            ...titleTextStyle,
          }}>
          <Text
            style={{
              ...styles.itemTitle(index, selectedSection),
              ...titleStyle,
            }}>
            {item.title}
          </Text>
        </View>
      );
    };

    const _body = (item) => {
      return (
        <View style={styles.itemBodyContainer}>
          <Text style={{...styles.itemBody, ...itemBodyStyle}}>
            {item.body}
          </Text>
        </View>
      );
    };

    const _onToggle = (index) => {
      if (selectedSection === index) {
        setSelectedSection(-1);
      } else {
        setSelectedSection(index);
      }
    };

    return (
      <AccordionList
        ListFooterComponent={() =>
          getListViewFooter ? getListViewFooter() : null
        }
        ListEmptyComponent={() => (
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: Fonts.poppinsBold,
              fontSize: 14,
              color: colors.steelBlue,
              lineHeight: 21,
            }}>
            FAQ Not Available
          </Text>
        )}
        ListHeaderComponent={() =>
          getListViewHeader ? getListViewHeader() : null
        }
        style={{flex: 1}}
        list={faqs}
        keyExtractor={(item, index) => `faq-list-item${index}`}
        header={_head}
        body={_body}
        onToggle={(a, index) => _onToggle(index)}
      />
    );
  },
);

export default ServiceFAQs;

const _styles = (colors) =>
  StyleSheet.create({
    itemBodyContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#949eae',
      marginHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: colors.white,
    },
    itemBody: {
      fontFamily: Fonts.poppinsRegular,
      fontSize: 10,
      color: colors.steelBlue,
      marginHorizontal: 0,
      textAlign: 'left',
    },
    itemTitleContainer: (index, section) => ({
      borderBottomWidth: index === section ? 0 : 1,
      borderBottomColor: '#949eae',
      alignItems: 'center',
      backgroundColor: colors.white,
      marginHorizontal: 20,
      paddingLeft: 0,
      paddingVertical: 10,
    }),
    itemTitle: (index, section) => ({
      fontFamily:
        index === section ? Fonts.poppinsMedium : Fonts.poppinsRegular,
      fontSize: 12,
      letterSpacing: 0.2,
      color: index === section ? 'rgba(237,143,49,1)' : colors.steelBlue,
      width: '100%',
      textAlign: 'left',
      marginHorizontal: 0,
    }),
  });
