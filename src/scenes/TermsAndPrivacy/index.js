import React from 'react';
import { View } from 'react-native';

import AppHeader from '../../components/AppHeader';
import DeviceInfo from 'react-native-device-info';
import { BackArrow } from '../../../assets/img/backArrow';
import { WebView } from 'react-native-webview';
import { BASE_URL } from '../../redux/services/config';

const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS === 'android';

const TermsAndPrivacy = ({ navigation }) => {

    const type = navigation.getParam('type', "terms");
    const title = type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
    const url = type === 'privacy' ? `${BASE_URL}privacypolicy` : `${BASE_URL}termsandcondition`;

    return (
        <View style={{ flex: 1 }}>
            <AppHeader
                headerTitle={title}
                headerStyle={{
                    height:
                        hasNotch && !isAndroid ? 100 : !hasNotch && !isAndroid ? 85 : 60,
                }}
                leftButtonImage={<BackArrow />}
                onLeftButtonPress={() => navigation.goBack()}
            />
            <WebView source={{ uri: url }} />
        </View>
    );
};

export default TermsAndPrivacy;