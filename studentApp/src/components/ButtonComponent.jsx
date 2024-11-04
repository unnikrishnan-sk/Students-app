import React from 'react'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { Pressable, Text } from 'react-native'
import { setColors } from '../contants/colors';

const ButtonComponent = (props) => {
    const {title, onButtonPress, buttonWidth, marginTop} = props;
  return (
    <Pressable onPress={()=>onButtonPress()} style={{height: HEIGHT*0.06, width: buttonWidth?buttonWidth :WIDTH*0.9, borderRadius: HEIGHT*0.012,
        backgroundColor:  setColors.violetShade, alignItems: 'center', justifyContent: 'center', marginTop: marginTop ? marginTop :HEIGHT*0.03
    }}>
        <Text style={{color: setColors.white, fontSize: 14, fontWeight: '500'}}>{title && title? title : 'NA'}</Text>
    </Pressable>
  )
}

export default ButtonComponent