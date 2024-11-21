import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import messaging from '@react-native-firebase/messaging'
import { inputValues } from "./dummyData";


export const apiKey = 'BK8VzTqWsXlmo-1ajqqz6iSftF9TXPyztFZtTmcK_tVvsCt--LiO2UtryGa2xABbiIf_3qVbmAInr48Nj2CwDCE';

export const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const animation = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: props?.duration,
            useNativeDriver: true,
        });
        const animationInstance = animation.start();

        return () => {
            if (animationInstance) {
                animationInstance.stop();
            }
        }
    }, [fadeAnim])
    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
            }}>{props.children}
        </Animated.View>
    )
}

export const SlideIn = props => {
    const animated = new Animated.Value(props?.initial);
    const duration = 1000;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animated, {
                toValue: props?.initial,
                duration: duration,
                useNativeDriver: true,
            }),
            Animated.timing(animated, {
                toValue: props?.final,
                duration: duration,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            {props.children}
        </Animated.View>
    );
};

export const SlideInCalendar = props => {
    const animated = new Animated.Value(-1000);
    const duration = 500;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animated, {
                toValue: -100,
                duration: duration,
                useNativeDriver: true,
            }),
            Animated.timing(animated, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            {props.children}
        </Animated.View>
    );
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const getMonth = (monthChange) => {
    if (monthChange >= 0 && monthChange <= 11) {
        const monthName = monthNames[monthChange]
        return monthName
    }
}

export const getFCMToken = async () => {
    const token = await messaging().getToken();
    if (token) {
        return token
    }
}

export const duplicates = (arr) => {
    const filteredArr = arr.filter(val => val !== '');
    return new Set(filteredArr).size !== filteredArr.length
}

export const checkInputValue = (value) => {
    if (inputValues.includes(value)) return true;
    else return false;
}