import React, { memo } from 'react'
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { images } from '../contants/dummyData';

const CarousalItems = memo(({data, transformEverySlide, paginationIndex, opacity, animatedOpacityStyle, parallaxStyle, id, image}) => {
  
  // const {images}=data;
  // console.log("images",images.image);
  
  const transfrmValue = useSharedValue(0)
  const animatedSlide = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transfrmValue.value }]
    }
  })
  
  return(
    // <Animated.View style={parallaxStyle}>
      <Image style={{
        // borderWidth: 1,
        // borderRadius: HEIGHT*0.02,
          height: HEIGHT*0.8,
          width: WIDTH*0.8,
        }}
      source={image}>
      </Image>
      // </Animated.View>
  )
})

export default CarousalItems