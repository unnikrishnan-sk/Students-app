import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { getData } from '../http/api'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import NoticeComp from '../components/NoticeComp'

const NoticeDetails = () => {
    const [notices,setNotices] = useState();
    const constant = { NOTIFICATIONS: 'Notifications' }
    useEffect(()=>{
        getNotification();
    },[])
    const getNotification = async () => {
        try{
            const noticeDta = await getData('Notice');
            setNotices(noticeDta)
        }catch(err){
            console.log("NoticeDetails_getNotification",err);
        } 
    }

  return (
    <View style={{ height: HEIGHT, backgroundColor: setColors?.white }}>
        <ProfileNavbar backBtn={left_icon} title={constant?.NOTIFICATIONS}/>
        <View style={{ paddingHorizontal: WIDTH*0.04, paddingTop: HEIGHT*0.02, borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors?.white }}>
        <Text style={{ fontSize: 15, fontWeight: 600, color: setColors?.black, paddingBottom: HEIGHT*0.02 }}>Your Notifications will appear here</Text>
        { notices ? <NoticeComp notices={notices}/> : null}
        </View>
    </View>
  )
}

export default NoticeDetails