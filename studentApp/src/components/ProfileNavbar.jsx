import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { useNavigation } from '@react-navigation/native'
import { setColors } from '../contants/colors'
import { useSelector } from 'react-redux'

const ProfileNavbar = ({backBtn, title, upArrow, downArrow, calendar, year, handleOnMonthAdd, handleOnMonthSub}) => {

  const navigation = useNavigation();
  const isAdmin = useSelector((state)=>state?.isAdmin?.admin)
  // console.log(isAdmin);
  

  return (
    <>
    <View style={{
      position: 'absolute',
      // borderWidth: 1,
      height: HEIGHT*0.06,
      width: WIDTH*0.1,
      backgroundColor: setColors.violetShade,
      right: 0,
      top: HEIGHT*0.1
    }}>
    </View>
    <View style={{
        // height: HEIGHT*0.15,
        paddingBottom: HEIGHT*0.02,
        // width: WIDTH*1.1,
        // borderWidth: 1,
        backgroundColor: setColors.violetShade,
        borderBottomLeftRadius: HEIGHT*0.03,
        paddingHorizontal: WIDTH*0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    }}>
      {backBtn && 
      <View style={{
        flexDirection: 'row'
      }}>
      <Pressable 
      onPress={()=>navigation.goBack()}><Image style={{
        // tintColor: '#FFFFFF'
        // borderWidth: 1,
        height: HEIGHT*0.025,
        width: WIDTH*0.07,
        marginTop: HEIGHT*0.07,
        tintColor: setColors.white
      }} source={backBtn}></Image> 
      </Pressable>
      <Text style={{
        color: setColors.white,
        fontSize: 18,
        marginTop: HEIGHT*0.06,
        marginLeft: WIDTH*0.02
        // alignSelf: 'center'
    }}>{title}</Text>
    </View>
      }
      {!backBtn && <View>
        <Text style={{
            color: setColors.white,
            fontSize: 18,
            marginTop: HEIGHT*0.05
        }}>Yogita Shaje</Text>
         <Text style={{
            color: setColors.lightWhite,
            fontSize: 14,
            marginTop: HEIGHT*0.005
        }}>{isAdmin ? 'Admin' : 'User'}</Text>
        </View>}

        {calendar && <View style={{
          // borderWidth: 1,
          // width: WIDTH*0.25,
          // paddingVertical: HEIGHT*0.03,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: WIDTH*0.02,
          marginTop: HEIGHT*0.05
        }}>
          <Text style={{
            color: setColors.white,
            fontSize: 16
          }}>{year}</Text>
          <View style={{
            // borderWidth: 1,
            alignItems: 'center',
            marginLeft: WIDTH*0.02
          }}>
            <Pressable onPress={handleOnMonthAdd}>
          <Image 
          style={{
            height: WIDTH*0.025,
            width: WIDTH*0.025,
            tintColor: setColors.white
          }}
          source={upArrow} />
          </Pressable>
          <Pressable onPress={handleOnMonthSub}>
          <Image 
          style={{
            height: WIDTH*0.04,
            width: WIDTH*0.045,
            tintColor: setColors.white
          }}
          source={downArrow} />
          </Pressable>
          </View>
        </View>}
    </View>
    </>
  )
}

export default ProfileNavbar