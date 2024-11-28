import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, TouchableHighlight, View } from 'react-native'
import { images } from '../contants/dummyData'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { setColors } from '../contants/colors'
import CarousalItems from '../components/CarousalItems'

const Carousal = () => {

    const sv = useSharedValue(0);
    const transformSharedValue = useSharedValue(0);
    const opacity = useSharedValue(0);
    const [paginationIndex,setPaginationIndex] = useState(0);
    const [repeat,setRepeat] = useState(false);
    const [pause,setPause] = useState(false)
    const [lastOffset,setLastOffset] = useState(0);
    const carousalRef = useRef(null);
    const isScrolling = useRef(false);
    
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

    // useEffect(() => {
    //   AnimationFn()
    // }, [paginationIndex, transformSharedValue, opacity]);

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

    const AnimationFn = () => {
      // sv.value = withSequence(withTiming(10), withTiming(0));
      sv.value = withSequence(
        withTiming(5, { duration: 500 }), 
        withTiming(0, { duration: 500 })  
      );
       opacity.value = withTiming(1, { duration: 400 ,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,});
        if (paginationIndex % 2 === 0) {
          transformSharedValue.value = withTiming(10, {
            duration: 4000,
            easing: Easing.in(Easing.quad),
            reduceMotion: ReduceMotion.System,
          });
        } else {
          transformSharedValue.value = withTiming(-10, {
            duration: 4000,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          });
        }
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
    const transformEverySlide = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: transformSharedValue.value }],
      };
    });
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
    <Animated.View>
      <FlatList onScroll={onImageScroll} 
      horizontal ref={carousalRef} 
      initialScrollIndex={paginationIndex} 
      getItemLayout={getItemLayout} 
      pagingEnabled 
      onScrollBeginDrag={onScrollBeginDrag} 
      onScrollEndDrag={onScrollEndDrag} 
      showsVerticalScrollIndicator={false} decelerationRate="fast" 
      data={images} 
      showsHorizontalScrollIndicator={false} 
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
        renderItem={({item}) => 
          <TouchableHighlight onPress={()=>onImagePress()} style={{borderColor: 'green'}}>
            <CarousalItems data={item} transformEverySlide={transformEverySlide} paginationIndex={paginationIndex} animatedOpacityStyle={animatedOpacityStyle}/>
          </TouchableHighlight>
        } keyExtractor={item => item?.id}/>
        <View style={{ 
          // borderWidth: 1,
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'absolute', 
          alignSelf: 'center',
          top: HEIGHT*0.87 }}>
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
  )
}

export default Carousal