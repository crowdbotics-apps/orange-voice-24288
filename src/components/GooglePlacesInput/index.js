import React, {memo, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {View, StyleSheet} from 'react-native';
import {isEqual} from 'lodash';

export const getAddressComponents = (components, type) => {
  for (var key in components) {
    if (components.hasOwnProperty(key)) {
      if (isEqual(type, components[key].types[0])) {
        return components[key].long_name;
      }
    }
  }
};

const GooglePlacesInput = memo(
  ({address, defaultValue, onTextDeleted, onBlur, onFocus}) => {
    const [hasText, setHasText] = useState(false);

    //gets "street_number", "route", "locality", "country", "postal_code"

    return (
      <View style={{...styles.container, height: hasText ? 200 : 5}}>
        <GooglePlacesAutocomplete
          placeholder="Address"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto"
          onPress={(data, details = null) => {
            setHasText(false);
            address && address({details, data});
          }}
          getDefaultValue={() => defaultValue || ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            // Test if key is working https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=addyourkeyhere
            key: 'AIzaSyAGnO2xxSbe_9h4rgAZFfw3oHoHsFeRrkc',
            language: 'en', // language of the results
            types: ['address', 'locality', 'sublocality'], // default: 'geocode', 'cities'
          }}
          fetchDetails
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            row: styles.row,
          }}
          textInputProps={{
            onFocus: () => {
              setHasText(true);
              if (onFocus) {
                onFocus();
              }
            },
            onBlur: () => {
              setHasText(false);
              if (onBlur) {
                onBlur();
              }
            },
            onChange: (e) => {
              if (e.nativeEvent.text.length <= 0 && onTextDeleted) {
                onTextDeleted();
              }
            },
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'address_component,geometry',
          }}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    );
  },
);

export default GooglePlacesInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    marginLeft: -10,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 14,
  },
  row: {
    width: '90%',
  },
});
