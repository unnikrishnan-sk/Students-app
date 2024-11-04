import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { HEIGHT } from '../contants/dimensions'
import { logo } from '../assets'
import { FadeInView, SlideIn } from '../contants/common'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2500);
  }, []);

  return (
    <View style={{
      height: HEIGHT,
      backgroundColor: setColors.violetShade,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <FadeInView duration='600'>
        <SlideIn initial={0} final={-100}>
      <Image source={logo}></Image>
      </SlideIn>
      </FadeInView>

<FadeInView duration='1100'>
      <Text style={{
        color: setColors.white,
        fontSize: 22,
        fontWeight: '600'
      }}>Welcome to StudentsApp</Text>
      </FadeInView>
      </View>
  )
}

export default SplashScreen