import React from 'react'
import { Text, View } from 'react-native'
import { FadeInView } from '../contants/common'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'

const NoticeComp = ({notices}) => {
  return (
    <>
    {notices && notices.length>0 ? (notices?.map((item)=>(
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
    )}
    </>
  )
}

export default NoticeComp