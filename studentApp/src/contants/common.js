import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";


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
    console.log("month_chamge", monthChange);

}

// export const FadeIn = props => {
//     const faded = useRef(new Animated.Value(0)).current;
// }