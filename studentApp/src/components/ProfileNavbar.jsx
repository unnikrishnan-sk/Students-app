import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'
import { useSelector } from 'react-redux'

const ProfileNavbar = ({backBtn, title, upArrow, downArrow, calendar, year, handleOnMonthAdd, handleOnMonthSub}) => {
  const navigation = useNavigation();
  const isAdmin = useSelector((state)=>state?.isAdmin?.admin)
  const constant = {
    ADMIN: 'Admin',
    USER: 'User'
  }

  return (
    <>
    <View style={{ position: 'absolute', height: HEIGHT*0.05, width: WIDTH*0.1, backgroundColor: setColors?.violetShade, right: 0, top: HEIGHT*0.075 }}>
    </View>
    <View style={{ backgroundColor: setColors?.violetShade, borderBottomLeftRadius: HEIGHT*0.03, paddingHorizontal: WIDTH*0.04, flexDirection: 'row', justifyContent: 'space-between' }}>
      {backBtn ? 
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: HEIGHT*0.035, paddingBottom: HEIGHT*0.03 }}>
      <Pressable  style={{ justifyContent: 'center' }}
      onPress={()=>navigation?.goBack()}><Image style={{ height: HEIGHT*0.025, width: WIDTH*0.07, tintColor: setColors?.white }} source={backBtn}></Image> 
      </Pressable>
      <Text style={{ color: setColors?.white, fontSize: 18, marginLeft: WIDTH*0.02 }}>{title}</Text>
    </View> : null
      }
      {!backBtn ? <View>
        <Text style={{ color: setColors?.white, fontSize: 18, marginTop: HEIGHT*0.05 }}>Yogita Shaje</Text>
         <Text style={{ color: setColors.lightWhite, fontSize: 14, marginTop: HEIGHT*0.005 }}>{isAdmin ? constant?.ADMIN : constant?.USER}</Text>
        </View> : null}

        {calendar ? <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: WIDTH*0.02, marginTop: HEIGHT*0.015 }}>
          <Text style={{ color: setColors.white, fontSize: 16 }}>{year}</Text>
          <View style={{ alignItems: 'center', marginLeft: WIDTH*0.015 }}>
            <Pressable onPress={handleOnMonthAdd}>
          <Image 
          style={{ height: WIDTH*0.025, width: WIDTH*0.025, tintColor: setColors.white }}
          source={upArrow} />
          </Pressable>
          <Pressable onPress={handleOnMonthSub}>
          <Image 
          style={{ height: WIDTH*0.03, width: WIDTH*0.03, tintColor: setColors.white }}
          source={downArrow} />
          </Pressable>
          </View>
        </View> : null}
    </View>
    </>
  )
}

export default ProfileNavbar