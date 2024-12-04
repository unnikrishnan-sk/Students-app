import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, TouchableHighlight, View } from 'react-native'
import { images } from '../contants/dummyData'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Animated, { Easing, Extrapolation, interpolate, ReduceMotion, useAnimatedStyle, useSharedValue, withDecay, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { setColors } from '../contants/colors'
import CarousalItems from '../components/CarousalItems'

const ParallaxCarousal = () => {

    const sv = useSharedValue(0);
    const transformSharedValue = useSharedValue(0);
    const opacity = useSharedValue(0);
    const [paginationIndex,setPaginationIndex] = useState(0);
    const [repeat,setRepeat] = useState(false);
    const [pause,setPause] = useState(false)
    const [lastOffset,setLastOffset] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0)
    const carousalRef = useRef(null);
    const isScrolling = useRef(true);
    const scrollX = useSharedValue(0);
    // const scrollAnim = useRef(new Animated.Value(0)).current;

    console.log("transformShare_state",transformSharedValue);
    console.log("sv",sv);
    console.log("carousalIndex",carouselIndex);
    
    
    
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
  }

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

  return (
    <View>
        <ScrollView horizontal={true}
            initialScrollIndex={2}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                // console.log("offsetX",offsetX);
                const index = Math.round(offsetX / WIDTH);
                setCarouselIndex(index)
            }}
            centerContent={true}
            style={{}}
            getItemLayout={(data, index) => {
                return { length: 110, offset: WIDTH * 1 * index, index };
            }}
            contentContainerStyle={{}}
            scrollToEnd={true}>
            {images.map((item, index) => {
                    console.log("item=>", item.id)
                    return (
                        <View 
                        key={item.id }
                        style={{ 
                            // borderWidth:1, 
                            alignItems:'center',
                            justifyContent:'center', 
                            alignSelf: "center", width: WIDTH, height: HEIGHT * 0.8, }}>
                            <Animated.View style={[{ borderRadius: HEIGHT*0.01, backgroundColor: setColors.white, marginTop: HEIGHT * 0.11, alignSelf: "center", }, useAnimatedStyle(() => {
                                const inputRange = [
                                    (index - 1.5) * WIDTH,
                                    index * WIDTH,
                                    (index - 1.5) * WIDTH,
                                ];
                                const translateX = interpolate(
                                  scrollX.value,
                                  inputRange,
                                  [0, 0, 0],
                                  // carouselIndex === index ? [0, 0, 0] : carouselIndex > index ? [WIDTH * -0.3, 0, WIDTH * 0.2] : [WIDTH * -0.2, 0, WIDTH * 0.3], 
                                  Extrapolation.CLAMP
                                );
                                // const scale = carouselIndex === index
                                // ? withTiming(1, { duration: 200, easing: Easing.ease })
                                // : withTiming(0.8, { duration: 200, easing: Easing.ease });
                                const scale = withTiming(carouselIndex === index ? 1 : 0.8, {
                                    duration: 300,
                                    easing: Easing.ease,
                                });
                                const leadInScale = carouselIndex === index 
                                ? withTiming(1, { duration: 100, easing: Easing.ease })
                                : withTiming(0.7, { duration: 100, easing: Easing.ease})
                                const marginLeft = withTiming(
                                    carouselIndex > index ? WIDTH * -0.5 : 0,
                                    {duration: 300, easing: Easing.ease }
                                );
                                const marginRight = withTiming(
                                    carouselIndex < index ? WIDTH * -0.5 : 0,
                                    {duration: 300, easing: Easing.ease }
                                );
                                  if(carouselIndex===index){
                                    return {
                                      transform: [
                                          { translateX },
                                          {scale}, 
                                      ],
                                      marginLeft,
                                      marginRight
                                  };
                                  }else if(carouselIndex<index){
                                    return {
                                      transform: [
                                        {translateX},
                                        {scale},
                                      ],
                                      marginRight
                                    };
                                  } else if(carouselIndex>index){
                                    return{
                                      transform: [
                                        {translateX},
                                        {scale},
                                      ],
                                      marginLeft
                                    }
                                  }
                                
                            }),]} >
                                <CarousalItems id={item.id} image={item.image}/>
                            </Animated.View>
                        </View>
                    )
                })
            }
        </ScrollView>
         {/* <View style={{ 
          // borderWidth: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'absolute', 
          alignSelf: 'center',
          top: HEIGHT*0.75 }}>
          {images.map((item,index)=>(
          <Pressable 
          key={item.id}
          onPress={()=>handleDotPress(index)}>
          <Animated.Image 
          style={
            {
            borderWidth: 1,
            height: index===carouselIndex? HEIGHT*0.08:HEIGHT*0.045, 
            width: index===carouselIndex? HEIGHT*0.08:HEIGHT*0.045,
            marginLeft: item.id===0? 0 :WIDTH*0.015,
            borderRadius:HEIGHT*0.01,
            marginBottom: HEIGHT*0.01
          }
        }
          source={item?.image}>
          </Animated.Image>
          </Pressable>
            )
          )}
        </View>  */}
    </View>
    )
}

export default ParallaxCarousal