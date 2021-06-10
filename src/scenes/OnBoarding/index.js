import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import OnboardingView from 'react-native-onboarding-swiper';
import storage from '../../redux/utils/storage';
import Dot from '../../components/DotComponent';

const OnBoarding = ({ navigation }) => {

    const DoneButton = () => {
        return (
            <TouchableOpacity onPress={onDone} style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
            }}>
                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 40 / 1.7, color: '#fff' }}>
                    ✓
                </Text>
            </TouchableOpacity>
        )
    }

    const onDone = () => {
        storage.setData('isFirstTime', 'no')
            .then(() => {
                resetToLogin();
            })
            .catch(e => console.warn(e))
    }

    const resetToLogin = () => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'CustomerLogin' })],
        });
        navigation.dispatch(resetAction);
    }

    //'rgba(237,143,49,1.0)'

    return (
        <OnboardingView
            bottomBarHighlight={false}
            skipLabel={<Text style={{ color: '#fff' }}>Skip</Text>}
            nextLabel={<Text style={{ color: '#fff' }}>Next</Text>}
            DotComponent={Dot}
            DoneButtonComponent={DoneButton}
            pages={[
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }} resizeMode="contain"  source={require('../../../assets/img/onboarding_1.png')} />,
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }}  resizeMode="contain" source={require('../../../assets/img/onboarding_2.png')} />,
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }}  resizeMode="contain" source={require('../../../assets/img/onboarding_3.png')} />,
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }}  resizeMode="contain" source={require('../../../assets/img/onboarding_4.png')} />,
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }} resizeMode="contain" source={require('../../../assets/img/onboarding_5.png')} />,
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: 'rgba(248,209,83,1.0)',
                    image: <Image style={{ width: '80%', height: '80%', marginTop: 130 }}  resizeMode="contain" source={require('../../../assets/img/onboarding_6.png')} />,
                    title: '',
                    subtitle: '',
                },
            ]}
            onDone={onDone}
            onSkip={onDone}
        />
    )
}

export default OnBoarding;