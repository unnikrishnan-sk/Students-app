import React from 'react'
import { Image, Pressable, Text, View } from 'react-native';
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { useNavigation } from '@react-navigation/native';
import { setColors } from '../contants/colors';
import { FadeInView } from '../contants/common';

const DashboardComponent = ({data, onClickDash}) => {

    const { id,icon,text,route } = data;
    const navigation = useNavigation();

  return (
    <View style={{
      // borderWidth: 1, 
      alignItems: 'center',
      // paddingHorizontal: WIDTH*0.01
    }}>
    <Pressable 
    onPress={()=>onClickDash(route)}
    style={{
        // borderWidth: 1,
        height: HEIGHT*0.14,
        width: HEIGHT*0.14,
        // paddingHorizontal: WIDTH*0.04,
        paddingVertical: HEIGHT*0.01,
        // marginLeft:id%3===0 ? 0 : WIDTH*0.065,
        marginTop: HEIGHT*0.03,
        borderRadius: HEIGHT*0.07,
        backgroundColor: setColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
        <FadeInView duration="1000">
        <Image style={{
          tintColor: setColors.violetShade,
          height: HEIGHT*0.06,
          width: HEIGHT*0.06
        }} source={icon}></Image>
        </FadeInView>
      </Pressable>
      <Text style={{
            fontSize: 14,
            fontWeight: '500',
            marginTop: HEIGHT*0.01,
            color: setColors.white,
            // fontSize: 1
        }}>{text}</Text>
      </View>
      
  )
}

export default DashboardComponent