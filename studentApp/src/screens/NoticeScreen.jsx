import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { getData, storeData } from '../http/api'
import { useDispatch } from 'react-redux'
import { addnotice } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'
import NoticeComp from '../components/NoticeComp'

const NoticeScreen = () => {

    const [notice,setNotice] = useState({});
    const [notices,setNotices] = useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(()=>{
        getNotification();
    },[])

    const onPublishNotice = () => {
        console.log("pressed", notice); 
        dispatch(addnotice(notice))
        storeData("Notice",{notice})
        navigation.navigate('dashboard')
    }

    const getNotification = async () => {
        const noticeDta = await getData('Notice');
        console.log("notice Data",noticeDta);
        setNotices(noticeDta)
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
            paddingHorizontal: WIDTH*0.04
        }}>
             <Text style={{
                fontWeight: 600,
                marginTop: HEIGHT*0.02,
                color: setColors.black
             }}>Add Notice</Text>

             <InputComponent placeholder="Add Notice to Publish" value={notice} onChangeText={text=>handleChangeForm(text)} marginTop={HEIGHT*0.02} />
             <ButtonComponent title="PUBLISH" onButtonPress={()=>onPublishNotice()}/>
        </View>
            <View style={{
                paddingHorizontal: WIDTH*0.04,
                marginTop: HEIGHT*0.02
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: setColors.black,
                    marginBottom: HEIGHT*0.015
                }}>Previous notifications</Text>
             <NoticeComp notices={notices}/>
            </View>
       
       
    </View>
  )
}

export default NoticeScreen