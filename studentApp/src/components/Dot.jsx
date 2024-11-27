import React from 'react'
import { View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'

const Dot = ({index, paginationIndex}) => {
  return (
   <View style={{
    height: HEIGHT*0.02,
    width: HEIGHT*0.02,
    borderWidth: 1,
    backgroundColor: paginationIndex===index?setColors.black:setColors.gray
   }}></View>
  )
}

export default Dot