import React from "react";
import { View } from 'react-native';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { Platform } from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
const isIOS = Platform.OS === 'ios';

const AppleSignInButton = ({ style, onPress }) => {

    if (majorVersionIOS >= 13 && isIOS) {
        return (
            <View style={[{ backgroundColor: 'black'},style]}>
                <AppleButton
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{ flex: 1, borderRadius: 0 }}
                    onPress={onPress}
                />
            </View>
        )
    }
    return null;
};

export default AppleSignInButton;