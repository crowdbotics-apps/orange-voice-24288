import {Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Fonts} from '../../theme/fonts';

const isAndroid = Platform.OS === 'android';

export const successMessage = ({message, description}) => {
  getShowMessage(message, description, 'success');
};

export const errorMessage = ({message, description}) => {
  getShowMessage(message, description, 'danger');
};

const getShowMessage = (message, description, type) => {
  if (message) {
    showMessage({
      message: message,
      description: description,
      type,
      duration: 3000,
      floating: true,
      hideOnPress: true,
      hideStatusBar: isAndroid ? false : true,
      textStyle: {
        fontSize: 12,
        letterSpacing: 0.3,
        fontFamily: Fonts.poppinsRegular,
      },
      titleStyle: {
        fontSize: 14,
        letterSpacing: 0.3,
        fontFamily: Fonts.poppinsBold,
      },
    });
  }
};
