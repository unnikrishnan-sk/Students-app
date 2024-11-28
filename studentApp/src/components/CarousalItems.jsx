import React, { memo } from 'react'
import { Image } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../contants/dimensions';

const CarousalItems = memo(({data, transformEverySlide, paginationIndex, opacity, animatedOpacityStyle}) => {
  
  const {id,image}=data;
  const transfrmValue = useSharedValue(0)
  const animatedSlide = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transfrmValue.value }]
    }
  })
  
  return(
      <Image style={{
          height: HEIGHT,
          width: WIDTH,
        }}
      source={image}>
      </Image>
  )
})

export default CarousalItems