import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, TouchableHighlight, View } from 'react-native'
import { images } from '../contants/dummyData'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Animated, { Easing, Extrapolation, interpolate, ReduceMotion, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { setColors } from '../contants/colors'
import CarousalItems from '../components/CarousalItems'

const Carousal = () => {

    const sv = useSharedValue(0);
    const transformSharedValue = useSharedValue(0);
    const opacity = useSharedValue(0);
    const [paginationIndex,setPaginationIndex] = useState(0);
    const [repeat,setRepeat] = useState(false);
    const [pause,setPause] = useState(true)
    const [lastOffset,setLastOffset] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0)
    const carousalRef = useRef(null);
    const isScrolling = useRef(true);
    const scrollX = useSharedValue(0);

    console.log("transformShare_state",transformSharedValue);
    console.log("sv",sv);
    
    
    console.log("isScrolling",isScrolling);
    useEffect(()=>{ 
      console.log("isScrolling_useEffect",isScrolling);
      console.log("pause",repeat);
        if(repeat){
            const interval = setInterval(()=>{ 
              opacity.value = 0;
              setPaginationIndex((prevIndex) => {
                const nextIndex = (prevIndex+1)%images.length;
                console.log("updating_index",{prevIndex,nextIndex});
                if(carousalRef?.current){
                  carousalRef.current.scrollToIndex({
                      index: nextIndex,
                      animated: true
                  })
                }
                return prevIndex;
              })
        },5000)
        return () => clearInterval(interval)
        }
    },[pause,repeat, images.length])

    useEffect(() => {
      // AnimationFn()
      handleCarousalFlow()
    }, [paginationIndex, transformSharedValue, opacity]);

    const SlideInterval = () => {
      setInterval(()=>{ 
        opacity.value = 0;
        setPaginationIndex((prevIndex) => {
          const nextIndex = (prevIndex+1)%images.length;
          console.log("updating_index",{prevIndex,nextIndex});
          if(carousalRef?.current){
            carousalRef.current.scrollToIndex({
                index: nextIndex,
                animated: true
            })
          }
          return prevIndex;
        })
    },5000)
    }

    const handleCarousalFlow = (index) => {
      console.log("index",index);
      const inputRange = [
        (index - 1) * WIDTH,
        index * WIDTH,
        (index + 1) * WIDTH
      ];
      console.log("transformSharedValue",transformSharedValue);
      // if (transformSharedValue && transformSharedValue.value !== undefined) {
        transformSharedValue.value = interpolate(
          transformSharedValue.value,
          inputRange,
          [-WIDTH*0.7,0,WIDTH*0.7],
    )
      // }
    // }else{
    //   console.log("transformation Value undefined");
    // }
  }
    // const rotateValue = interpolate(
    //   transformSharedValue.value,
    //   [-100,0,360],
    //   [-360,0,360],
    //   Extrapolation.CLAMP
    // )
    
    // }
    // } 
    // else {
    //   transformSharedValue.value = withTiming(-10, {
    //     duration: 4000,
    //     easing: Easing.inOut(Easing.quad),
    //     reduceMotion: ReduceMotion.System,
    //   });
    // }
// }

    const AnimationFn = () => {
      // sv.value = withSequence(withTiming(10), withTiming(0));
      sv.value = withSequence(
        withTiming(5, { duration: 500 }), 
        withTiming(0, { duration: 500 })  
      );
       opacity.value = withTiming(1, { duration: 400 ,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,});
}

    const onImageScroll = useCallback((event) =>{
      if(!event.nativeEvent) return
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const lastOffset = event.nativeEvent.lastOffset;
        const direction = contentOffsetX>lastOffset?'right':'left'
        setLastOffset(contentOffsetX)
        const newIndex = direction==='right'?paginationIndex+1:paginationIndex-1;
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        const distance = Math.abs(roundIndex - index);
        const isNoMansLand = 0.4 < distance;
        if (roundIndex !== carousalRef.current && !isNoMansLand) {
        // setPaginationIndex(roundIndex);
        }
    },[])

    const onScroll = useCallback((event) => {
      console.log("event_onScroll",event.nativeEvent.contentOffset.x);
      const offsetX = event.nativeEvent.contentOffset.x
      const index = Math.round(offsetX/WIDTH);
      setCarouselIndex(index)
      // scrollX.value = event.nativeEvent.contentOffset.x
    }, []);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setPaginationIndex(viewableItems[0].index); 
    }
  });
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
    const handleDotPress = (toIndex) => {
      opacity.value = 0
      if(carousalRef?.current){
        carousalRef.current.scrollToIndex({
          index: toIndex,
          animated: true
      })
      } 
    }
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: sv.value }],
      };
    });
    // const transformEverySlide = useAnimatedStyle(() => {
    //   return {
    //     transform: [{ translateX : transformSharedValue.value }],
    //   };
    // });
    const animatedOpacityStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });
    const getItemLayout = (data, index) => ({
      length: WIDTH, 
      offset: WIDTH * index,
      index, 
    });
    const onScrollBeginDrag = useCallback(() => {
      console.log("isScrolling_onScrollBegin",isScrolling);
      isScrolling.current = true;
    }, []);
    const onScrollEndDrag = useCallback(() => {
      console.log("isScrolling_onScrollEnd",isScrolling);
      isScrolling.current = false;
    }, []);

    const onImagePress = () => {
      console.log("onImagePress",repeat);
      setRepeat(!repeat)
      // isScrolling.current = true;
    }

  

  // const renderItem = ({ item, index }) => {
  //   // Create animated style for each item dynamically
  //   const transformStyle = useAnimatedStyle(() => {
  //     const inputRange = [
  //       (index - 1) * WIDTH,
  //       index * WIDTH,
  //       (index + 1) * WIDTH,
  //     ];

  //     const translateX = interpolate(
  //       transformSharedValue.value,
  //       inputRange,
  //       [-WIDTH * 0.7, 0, WIDTH * 0.7],
  //       Extrapolation.CLAMP
  //     );

  //     return {
  //       transform: [{ translateX }],
  //     };
  //   });
  // }

//   const parallaxAnimatedStyle = (index) => useAnimatedStyle(() => {
//     return {
//         transform: [
//           { scale: withTiming(paginationIndex === index ? 1 : .7, { easing: Easing.ease }) }],
//         marginLeft: withTiming(paginationIndex < index ? WIDTH * -.65 : 0, { easing: Easing.ease }),
//         marginRight: withTiming(paginationIndex > index ? WIDTH * -.65 : 0, { easing: Easing.ease })
//     };
// })


  return (
    <View style={{
      borderWidth: 1,
      alignItems: 'center',
      // height: HEIGHT,
      justifyContent: 'center'
    }}>
    <Animated.View style={[{
      borderWidth: 1,
      // height: HEIGHT*0.8,
      // width: WIDTH*0.75,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    // transformEverySlide(index)
    // parallaxStyle
    ]}>
      <FlatList onScroll={onScroll} 
      horizontal ref={carousalRef} 
      initialScrollIndex={paginationIndex} 
      getItemLayout={getItemLayout} 
      pagingEnabled 
      onScrollBeginDrag={onScrollBeginDrag} 
      onScrollEndDrag={onScrollEndDrag} 
      showsVerticalScrollIndicator={false} decelerationRate="fast" 
      data={images} 
      centerContent={true}
      showsHorizontalScrollIndicator={false} 
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
        renderItem={({item,index}) => 
          <TouchableHighlight onPress={()=>onImagePress()} style={{borderColor: 'green'}}>
            <Animated.View style={[{
              borderWidth: 1,
            },
            // parallaxAnimatedStyle(index)
            useAnimatedStyle(() => {
              return {
                  transform: [
                    { scale: withTiming(paginationIndex === index ? 1 : .7, { easing: Easing.ease }) }],
                  marginLeft: withTiming(paginationIndex < index ? WIDTH * -.65 : 0, { easing: Easing.ease }),
                  marginRight: withTiming(paginationIndex > index ? WIDTH * -.65 : 0, { easing: Easing.ease })
              };
          })
          ]}>
            <CarousalItems data={item} paginationIndex={paginationIndex} animatedOpacityStyle={animatedOpacityStyle} />
            </Animated.View>
          </TouchableHighlight>
        } keyExtractor={item => item?.id}/>
        <View style={{ 
          // borderWidth: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'absolute', 
          alignSelf: 'center',
          top: HEIGHT*0.75 }}>
          {images.map((item,index)=>{
        return (
          <Pressable 
          key={item.id}
          onPress={()=>handleDotPress(index)}>
            {/* <Animated.View style={[index === paginationIndex ? animatedStyle : {}]}> */}
          <Image 
          style={
            {
            borderWidth: 1,
            height: index===paginationIndex? HEIGHT*0.08:HEIGHT*0.045, 
            width: index===paginationIndex? HEIGHT*0.08:HEIGHT*0.045,
            marginLeft: item.id===0? 0 :WIDTH*0.015,
            borderRadius:HEIGHT*0.01,
            marginBottom: HEIGHT*0.01
          }
        }
          source={item?.image}>
          </Image>
          {/* </Animated.View> */}
          </Pressable>
          
            // <Pressable
            // onPress={()=>handleDotPress(index)}
            // key={item.id}
            // style={{ height: HEIGHT*0.015, width: HEIGHT*0.015, borderRadius:HEIGHT*0.04, marginLeft: item.id===0? 0 :WIDTH*0.01, backgroundColor: index===paginationIndex?setColors.black:setColors.white }}></Pressable>
            )
          })}
        </View>
    </Animated.View>
    </View>
  )
}

export default Carousal