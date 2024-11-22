import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import messaging from '@react-native-firebase/messaging'
import { initialSudoku, inputValues, monthNames } from "./dummyData";
import sudoku from 'sudoku'


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

export const SlideInView = props => {
    const animated = useRef(new Animated.Value(props.initial)).current
    const duration = 2000;

    useEffect(() => {
        Animated.timing(animated, {
            toValue: props?.final,
            duration: duration,
            useNativeDriver: true,
        }).start()
    }, [props.final]);

    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            {props.children}
        </Animated.View>
    );
};

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

export const initialSudokuCreate = (numberOfBoxVisible) => {
    // console.log("Entered initial sudoku");
    console.log("number od Suduko", numberOfBoxVisible);

    let min = 0;
    let max = 80;
    let valuesArr = [];
    const sudokuCopy = [...initialSudoku];
    console.log("loop length", 80 - numberOfBoxVisible);

    for (let i = 0; i <= (80 - numberOfBoxVisible); i++) {
        const value = Math.floor(Math.random() * (max - min) + min)
        // console.log("value", value);

        const duplicateVal = valuesArr.includes(value)
        // console.log("duplicateVal", duplicateVal);

        if (!duplicateVal) {
            // console.log("duplicateVal", value);

            valuesArr.push(value);
            sudokuCopy[value] = ""
        } else numberOfBoxVisible--
    }
    console.log("value array length", valuesArr, valuesArr.length);

    console.log("initial sudoku returned", sudokuCopy);

    return sudokuCopy
}

