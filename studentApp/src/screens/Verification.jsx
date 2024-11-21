import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Navbar from '../components/Navbar'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'

const Verification = () => {
  const [error,setError] = useState('');
  const [otp,setOtp] = useState(Array(6).fill(''));
  const items = Array.from({ length:6 })
  const navigation = useNavigation();
  const inputs = useRef([]);
  const constant = { VERIFY: 'Verify' }
  const handleChangeForm = (text,index) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = text;
      return newOtp
    });
    setError('')
    if(text.length===1 && index<5){
      inputs?.current[index+1]?.focus();
    } 
    if(text.length===0 && index>0){
      inputs?.current[index-1]?.focus();
    }
  }
  const handleOnVerify = () => {
    if(otp[0]!=="" && otp[5]!==""){
      navigation.navigate('dashboard')
    }else{
      setError('Enter valid otp')
    }
  }
  
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
    <View style={{ flex: 1, backgroundColor: setColors.white }}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: HEIGHT*0.01 }}>
    <Navbar />
    <View style={{ paddingHorizontal: WIDTH*0.05, paddingTop: HEIGHT*0.04, borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors.white, }}>
    <Text style={{fontSize: 15, fontWeight: 500, color: setColors.black
    }}>Enter OTP</Text>
    <View style={{ height: HEIGHT*0.07, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
      {items.map((_,index)=>(     
         <View key={index}
         style={{ borderRadius: HEIGHT*0.01, alignItems: 'center', paddingTop: error && otp[index]===""?HEIGHT*0.032: 0}}>
          <InputComponent ref={(ref)=>(inputs.current[index]=ref)} number={true} maxLength={1} componentWidth={WIDTH*0.1} centered="center" onChangeText={text=>handleChangeForm(text,index)} autoFocus={index===0} error={error && otp[index]===""?true:null} verify={constant?.VERIFY}/>
        </View>
      ))}
    </View>
    {error ? <Text style={{marginTop: HEIGHT*0.04, color: setColors?.errorRed, fontWeight: 500 }}>{error}</Text> : null}
      <View style={{ marginTop: error ? HEIGHT*0.01 :HEIGHT*0.05 }}>
      <ButtonComponent title={constant?.VERIFY} onButtonPress={()=>handleOnVerify()}/>
      </View>
      <Text 
      onPress={()=>navigation.goBack()}
      style={{ color: setColors.violetShade, fontWeight: 600, marginTop: HEIGHT*0.02, textAlign: 'center'}}>Cancel</Text>
    </View>
    </ScrollView>
    </View>
    </KeyboardAvoidingView>
  )
}

export default Verification