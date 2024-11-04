import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Navbar from '../components/Navbar'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import InputComponent from '../components/InputComponent'
import { setColors } from '../contants/colors'

const ForgotPassword = () => {

    const navigation = useNavigation();

    const handleGenerateOTP = () => {
        navigation.navigate('verification', {router:'createpass'})
    }

  return (
    <View style={{
        height: HEIGHT,
        backgroundColor: setColors.white
    }}>
        <Navbar />
        <View style={{
            // borderWidth: 1,
            borderTopRightRadius: HEIGHT*0.03,
            backgroundColor: setColors.white,
            paddingHorizontal: WIDTH*0.05,
            paddingTop: HEIGHT*0.05
        }}>
            <Text>Phone Number</Text>
            <View style={{
                // borderWidth: 1,
                paddingTop: HEIGHT*0.02,
                marginTop: HEIGHT*0.01,
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontSize: 26,
                    fontWeight: '700',
                    color: setColors.black
                }}>+91</Text>
                {/* <InputComponent /> */}
                <TextInput style={{
                    marginLeft: WIDTH*0.03,
                    fontSize: 26,
                    fontWeight: '700'
                }} placeholder='9812345678'/>
                {/* <Text style={{
                    marginLeft: WIDTH*0.02,
                    fontSize: 26,
                    fontWeight: 700,
                    color: '#EAECEF'
                }}>9812345678</Text> */}
                
            </View>
            <View style={{
                marginTop: HEIGHT*0.2
            }}>
            <ButtonComponent title="Generate OTP" onButtonPress={()=>handleGenerateOTP()}/>
            <Text
            onPress={()=>navigation.goBack()}
            style={{ color: '#473F97', fontWeight: '600', marginTop: HEIGHT*0.02, textAlign: 'center', marginTop: HEIGHT*0.02 }}>Cancel</Text>
            </View>
            
        </View>
    </View>
  )
}

export default ForgotPassword