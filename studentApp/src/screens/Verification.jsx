import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Navbar from '../components/Navbar'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'

const Verification = ({route}) => {

  const [error,setError] = useState('');
  const [otp,setOtp] = useState('');
  const items = Array.from({ length:6 })
  const navigation = useNavigation();
  const navig = route?.params?.router;

  const handleChangeForm = (text) => {
    console.log("text",text);
    setOtp((prevOtp) => [...prevOtp,text])
    setError('')
    console.log("otp",otp);
  }

  const handleOnVerify = () => {
    console.log("pressed",otp);
    if(otp.length === 6){
      navigation.navigate('dashboard')
    }else{
      setError('Enter valid otp')
    }
  }
  
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
    <View style={{
      flex: 1,
      backgroundColor: setColors.white
    }}>
      <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        paddingBottom: HEIGHT*0.01
    }}>
      <Navbar />
    <View style={{
      paddingHorizontal: WIDTH*0.05,
      paddingTop: HEIGHT*0.12,
      borderTopRightRadius: HEIGHT*0.03,
      backgroundColor: setColors.white,
    }}>
    <Text style={{fontSize: 16,
      fontWeight: '500',
      color: setColors.black
    }}>Enter OTP</Text>

    <View style={{
      height: HEIGHT*0.07,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {items.map((_,index)=>(
         <View key={index}
         style={{
          width: WIDTH*0.1,
          borderRadius: HEIGHT*0.01,
          alignItems: 'center',
        }}>
          <InputComponent number={true} maxLength={1} componentWidth={WIDTH*0.1} centered="center" onChangeText={text=>handleChangeForm(text)}/>
        </View>
      ))}
    </View>
    {error && <Text style={{marginTop: HEIGHT*0.04,
      color: setColors.errorRed,
      fontWeight: 500
    }}>{error}</Text> }
      <View style={{
        marginTop: error ? HEIGHT*0.01 :HEIGHT*0.05
      }}>
      <ButtonComponent title='Verify' onButtonPress={()=>handleOnVerify()}/>
      </View>
      <Text 
      onPress={()=>navigation.goBack()}
      style={{ color: setColors.violetShade, fontWeight: '600', marginTop: HEIGHT*0.02, textAlign: 'center', marginTop: HEIGHT*0.02 }}>Cancel</Text>
    </View>
    </ScrollView>
      
    </View>
    </KeyboardAvoidingView>
  )
}

export default Verification