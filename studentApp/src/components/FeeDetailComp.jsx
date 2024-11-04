import React from 'react'
import { Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'

const FeeDetailComp = ({data,fees}) => {
    const { id,title,price,percent } = data;

  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH*0.05, justifyContent: 'space-between', marginTop: HEIGHT*0.015 }}>
    <Text style={{ fontSize: 13, fontWeight: '500', color: setColors.black  }}>{title}</Text>
    <Text style={{ fontSize: 13, fontWeight: '500', color: setColors.black }}>{fees*percent}</Text>
    </View>
  )
}

export default FeeDetailComp