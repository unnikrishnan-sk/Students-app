/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, ScrollView, StatusBar, Text, useColorScheme, View } from 'react-native';
import Router from './src/router';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocalNotification from './Notification';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      {/* <SafeAreaView> */}
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
        />
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
      </Provider>
      {/* </SafeAreaView> */}
    </>
  )
}

export default App;