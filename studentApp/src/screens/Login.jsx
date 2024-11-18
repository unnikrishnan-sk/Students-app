import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { loginData } from '../contants/dummyData'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'
import { useDispatch } from 'react-redux'
import { setColors } from '../contants/colors'
import { adminlogin } from '../redux/slice'

const Login = () => {
    const [logindata, setLogindata] = useState({});
    const [error,setError] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const constant = { LOGIN: 'Login' }

    const handleChangeForm = (key,value) => {
        logindata[key] = value;
        setLogindata({...logindata})
        setError({})  
    }
    const onLoginFn = () => {
        const valid = validateLoginForm();
        if(valid){
            const {username,password} = logindata;
            let error = {};
            if(username==='Admin' || username==='admin'){
                dispatch(adminlogin())
            }
            navigation.navigate('verification', {router:'dashboard'})
        }
    }
    const validateLoginForm = () => {
        const {username,password} = logindata;
        let error = {};
        if(isEmpty(username)) error.username = 'Enter Username'
        if(isEmpty(password)) error.password = 'Enter Password'
        setError({...error})
        return isEmpty(error)
    }
    
  return (
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    <View style={{ flex:1, backgroundColor: setColors.white }}> 
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: HEIGHT*0.01 }}>
        <Navbar /> 
        <View style={{ paddingHorizontal: WIDTH*0.05, paddingTop: HEIGHT*0.05, backgroundColor: setColors.white, borderTopRightRadius: HEIGHT*0.03, flex: 1 }}>  
            {loginData.map((item)=> (
                <InputComponent key={item?.id} icon={item?.icon} placeholder={item?.placeholder} value={logindata?.[item?.value]} onChangeText={text=>handleChangeForm(item?.value,text)} error={error?.[item?.value]}/>
            ))}
            <ButtonComponent title={constant?.LOGIN} onButtonPress={()=>onLoginFn()}/>
            <Text
            onPress={()=>navigation.navigate('forgotpass')}
            style={{ color: setColors.violetShade, fontWeight: 600, marginTop: HEIGHT*0.02, textAlign: 'center', marginTop: HEIGHT*0.02 }}>Forgot Password ?</Text>
        </View>
        </ScrollView>
    </View>
    </KeyboardAvoidingView>
  )
}

export default Login