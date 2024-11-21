import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { HEIGHT } from '../contants/dimensions'
import { logo } from '../assets'
import { FadeInView, getFCMToken, SlideIn } from '../contants/common'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'
import { getData, storeData } from '../http/api'

const SplashScreen = () => {
  const [availToken, setAvailToken] = useState([]);
  const navigation = useNavigation();
  useEffect(()=>{
    getToken();
  },[])
  useEffect(()=>{
    if(availToken){
      storeToken();
    }
  },[availToken])
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2500);
  }, []);
  const getToken = async () => {
    try{
      const availableTokens = await getData('DeviceToken')
      setAvailToken(availableTokens || []);
    }catch(err){
      console.log("getToken_SplashScreen",err);
    }
  }
  const storeToken = async () => {
    try{
      const token = await getFCMToken();
      const filterToken = availToken.filter((item)=>item?.token === token)
      if(filterToken?.length===0){
        storeData('DeviceToken', {token})
      }
    }catch(err){
      console.log("error",err);
    }
  }

  return (
    <View style={{ height: HEIGHT, backgroundColor: setColors?.violetShade, alignItems: 'center', justifyContent: 'center' }}>
      <FadeInView duration='600'>
        <SlideIn initial={0} final={-100}>
      <Image source={logo}></Image>
      </SlideIn>
      </FadeInView>
<FadeInView duration='1100'>
      <Text style={{ color: setColors?.white, fontSize: 22, fontWeight: 600 }}>Welcome to StudentsApp</Text>
      </FadeInView>
      </View>
  )
}

export default SplashScreen