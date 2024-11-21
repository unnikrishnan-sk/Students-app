/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StatusBar, Text, useColorScheme, View } from 'react-native';
import Router from './src/router';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocalNotification from './Notification';
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import { getFCMToken } from './src/contants/common';
import { getData, storeData } from './src/http/api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/NavigationService';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  // console.log("availToken", availToken);


  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('new Notification', remoteMessage);
      const key = Date.now().toString();
      PushNotification.createChannel(
        {
          channelId: key,
          channelName: "Local message",
          channelDescription: "Notification for Local message",
          importance: 4,
          vibrate: true
        },
        (created: any) => console.log(`createChannel returned '${created}'`)

      );

      PushNotification.localNotification({
        channelId: key,
        title: `${remoteMessage.notification?.title} !!`,
        message: `${remoteMessage.notification?.body} !!`
      })
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("message handled in background", remoteMessage);
    })

    return unsubscribe;
  }, [])

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status", authStatus);
    }
  }
  requestUserPermission()

  // const storeToken = async () => {
  //   const token = await getFCMToken();
  //   storeData("DeviceToken", { token })
  // }

  // storeToken()

  return (
    <>
      {/* <SafeAreaView> */}
      <Provider store={store}>
        {/* <NavigationContainer ref={navigationRef}> */}
        {/* <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
        /> */}
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text> Push Notification!! </Text>
            <Button title={'Click Here'} onPress={LocalNotification} />
          </View>
        </ScrollView> */}
        <Router />
        {/* </NavigationContainer> */}
      </Provider>
      {/* </SafeAreaView> */}
    </>
  )
}

export default App;