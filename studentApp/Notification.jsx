import React from 'react'
import PushNotification from 'react-native-push-notification'
import { getData } from './src/http/api';

const LocalNotification = (notices) => {

    console.log("notices",notices);
    
    const key = Date.now().toString();
    PushNotification.createChannel(
        {
            channelId: key,
            channelName: "Local message",
            channelDescription: "Notification for Local message",
            importance: 4,
            vibrate: true
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );
    notices.forEach((notice, index) => {
        PushNotification.localNotification({
            channelId: key,
            title: 'You have an unread notification',
            message: `${notice?.notice}!!`
        })
    })    
}

export default LocalNotification