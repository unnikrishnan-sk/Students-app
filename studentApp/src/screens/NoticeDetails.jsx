import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { getData } from '../http/api'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { FadeInView } from '../contants/common'
import NoticeComp from '../components/NoticeComp'

const NoticeDetails = () => {

    const [notices,setNotices] = useState();
    console.log("notices",notices);
    

    useEffect(()=>{
        getNotification();
    },[])

    const getNotification = async () => {
        const noticeDta = await getData('Notice');
        console.log("notice Data",noticeDta);
        setNotices(noticeDta)
    }

  return (
    <View style={{
        // paddingHorizontal: WIDTH*0.05,
        // paddingTop: HEIGHT*0.02,
        height: HEIGHT,
        backgroundColor: setColors.white,
    }}>
        <ProfileNavbar backBtn={left_icon} title="Notifications"/>
        <View style={{
            paddingHorizontal: WIDTH*0.04,
            paddingTop: HEIGHT*0.02,
            // marginTop: HEIGHT*0.01,
            // borderWidth: 1,
            borderTopRightRadius: HEIGHT*0.03,
            backgroundColor: setColors.white
        }}>
        <Text style={{
            fontSize: 15,
            fontWeight: 600,
            color: setColors.black,
            paddingBottom: HEIGHT*0.02
        }}>Your Notifications will appear here</Text>

        <NoticeComp notices={notices}/>
        {/* {notices && notices.length>0 ? (notices?.map((item)=>(
            <FadeInView key={item.id}>
            <View
            style={{
                // borderWidth: 1,
                paddingHorizontal: WIDTH*0.05,
                paddingVertical: HEIGHT*0.01,
                backgroundColor: setColors.pinkShade,
                borderRadius: HEIGHT*0.01,
                marginTop: HEIGHT*0.01
            }}>
                <Text style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: setColors.black
                }}>{(item?.notice).charAt(0).toUpperCase()+(item?.notice).slice(1)}</Text>
            </View>
            </FadeInView>
        ))
     ) : (
            <Text>No Notifications </Text>
        )} */}
        </View>
    </View>
  )
}

export default NoticeDetails