import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { storeData } from '../http/api'
import { useDispatch } from 'react-redux'
import { addnotice } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'

const NoticeScreen = () => {

    const [notice,setNotice] = useState({});
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPublishNotice = () => {
        console.log("pressed", notice); 
        dispatch(addnotice(notice))
        storeData("Notice",{notice})
        navigation.navigate('dashboard')
    }

    const handleChangeForm = (text) => {
        setNotice(text)
    }

  return (
    <View style={{
        height: HEIGHT,
        backgroundColor: setColors.white
    }}>
        <ProfileNavbar backBtn={left_icon} title="Notice"/>
        <View style={{
            // borderWidth: 1,
            borderTopRightRadius: HEIGHT*0.03,
            backgroundColor: setColors.white,
            paddingHorizontal: WIDTH*0.05
        }}>
             <Text style={{
                fontWeight: 600,
                marginTop: HEIGHT*0.03,
                color: setColors.black
             }}>Add Notice</Text>

             <InputComponent placeholder="Add Notice to Publish" value={notice} onChangeText={text=>handleChangeForm(text)} />
             <ButtonComponent title="PUBLISH" onButtonPress={()=>onPublishNotice()}/>
        </View>
       
    </View>
  )
}

export default NoticeScreen