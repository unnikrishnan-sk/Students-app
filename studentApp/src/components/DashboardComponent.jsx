import React from 'react'
import { Image, Pressable, Text, View } from 'react-native';
import { HEIGHT } from '../contants/dimensions';
import { setColors } from '../contants/colors';
import { FadeInView } from '../contants/common';

const DashboardComponent = ({data, onClickDash}) => {
    const { id,icon,text,route } = data;

  return (
    <View style={{
      alignItems: 'center',
    }}>
    <Pressable 
    onPress={()=>onClickDash(route)}
    style={{ height: HEIGHT*0.14, width: HEIGHT*0.14, paddingVertical: HEIGHT*0.01, marginTop: HEIGHT*0.03, borderRadius: HEIGHT*0.07, backgroundColor: setColors.white, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <FadeInView duration="1000">
        <Image style={{ tintColor: setColors.violetShade, height: HEIGHT*0.06, width: HEIGHT*0.06 }} source={icon}></Image>
        </FadeInView>
      </Pressable>
      <Text style={{ fontSize: 14, fontWeight: 500, marginTop: HEIGHT*0.01, color: setColors.white }}>{text}</Text>
      </View> 
  )
}

export default DashboardComponent