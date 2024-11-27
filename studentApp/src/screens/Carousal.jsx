import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, TouchableHighlight, View } from 'react-native'
import { images } from '../contants/dummyData'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { setColors } from '../contants/colors'

const CarousalItems = memo(({data, transformEverySlide, paginationIndex}) => {
    const {id,image}=data;
    const opacity = useSharedValue(0);
    const transfrmValue = useSharedValue(0)
    // console.log("images",image);
    useEffect(() => {
      opacity.value = withTiming(1, { duration: 500 });
    }, [transfrmValue,opacity,paginationIndex]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    const animatedSlide = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: transfrmValue.value }]
      }
    })
    
    return(
        <Animated.View style={[{
            // borderWidth: 1
        },
        animatedStyle,
        animatedSlide,
        transformEverySlide
        ]}>
        <Image 
        style={[
          {
            height: HEIGHT,
            width: WIDTH*1.01,
            // resizeMode: 'contain'
          },
          // animatedSlide,
          // animatedStyle,
          // transformEverySlide
        ]}
        source={image}>
        </Image>
    </Animated.View>
    )
})

const Carousal = () => {

    const sv = useSharedValue(0);
    const transformSharedValue = useSharedValue(0);
    const [paginationIndex,setPaginationIndex] = useState(0);
    const [pause,setPause] = useState(false)
    const [lastOffset,setLastOffset] = useState(0);
    const carousalRef = useRef(null);
    const isScrolling = useRef(false);
   
    useEffect(()=>{ 

        if(!pause){
            const interval = setInterval(()=>{ 
              setPaginationIndex((prevIndex) => {
                const nextIndex = (prevIndex+1)%images.length;
                console.log("updating_index",{prevIndex,nextIndex});
                if(carousalRef?.current){
                  // console.log("inside_useEffect",carousalRef);
                  carousalRef.current.scrollToIndex({
                      index: nextIndex,
                      animated: true
                  })
                }
                return prevIndex;
              })
        },2000)
        return () => clearInterval(interval)
        }
    },[pause, images.length])

    useEffect(() => {
      
      if (paginationIndex % 2 === 0) {
        transformSharedValue.value = withTiming(5, {
          duration: 2000,
          easing: Easing.in(Easing.quad),
          reduceMotion: ReduceMotion.System,
        });
      } else {
        transformSharedValue.value = withTiming(-5, {
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,
        });
      }
    }, [paginationIndex, transformSharedValue]);

    const onImageScroll = useCallback((event) =>{
      if(!event.nativeEvent) return
        // console.log("inside_onscroll",event);
        
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const lastOffset = event.nativeEvent.lastOffset;
            const direction = contentOffsetX>lastOffset?'right':'left'
            // console.log("direction",direction);
            setLastOffset(contentOffsetX)
            const newIndex = direction==='right'?paginationIndex+1:paginationIndex-1;

            const slideSize = event.nativeEvent.layoutMeasurement.width;
            // console.log("slideSize",slideSize);

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
        console.log("inside handlepress",toIndex);
        setPaginationIndex(toIndex)
        carousalRef.current.scrollToIndex({
          index: toIndex,
          animated: true
      })
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
        // handlePress()

        const getItemLayout = (data, index) => ({
            length: WIDTH, 
            offset: WIDTH * index,
            index, 
          });

          const onScrollBeginDrag = useCallback(() => {
            isScrolling.current = true;
          }, []);
        
          const onScrollEndDrag = useCallback(() => {
            isScrolling.current = false;
          }, []);

  return (
    <Animated.View 
    // onPress={()=>handlePress()}
    style={[
      {
        // borderWidth: 1,
    },
        animatedStyle
    ]}>
         <FlatList 
        //  style={
        //     animatedStyle
        //  }
         onScroll={onImageScroll}
         horizontal
         ref={carousalRef} 
         initialScrollIndex={paginationIndex}
        //  onScrollToIndexFailed={info => {
        //     const wait = new Promise(resolve => setTimeout(resolve,wait.then(()=>{
        //         FlatList.current?.scrollToIndex({index: info.index, animated: true})
        //     })))
        //  }}
         getItemLayout={getItemLayout}
        //  initialNumToRender={5}
        pagingEnabled
        
        //  onScrollEndDrag={(event)=>onImageScroll(event)}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
         showsVerticalScrollIndicator={false} 
         decelerationRate="fast"
         data={images}  
         showsHorizontalScrollIndicator={false}
         onViewableItemsChanged={onViewableItemsChanged.current} 
         viewabilityConfig={viewabilityConfig}
         renderItem={({item}) => 
            <TouchableHighlight 
         onPress={()=>setPause(!pause)}
         style={{
                // borderWidth: 1,
                borderColor: 'green'
            }}>
         <CarousalItems data={item} transformEverySlide={transformEverySlide} paginationIndex={paginationIndex}/>
         </TouchableHighlight>
         } keyExtractor={item => item?.id}/>

<View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
            top: HEIGHT*0.92
         }}>
          {images.map((item,index)=>{
        return (
            <Pressable
            onPress={()=>handleDotPress(index)}
            key={item.id}
            style={{
                height: HEIGHT*0.015,
                width: HEIGHT*0.015,
                borderRadius:HEIGHT*0.04,
                marginLeft: item.id===0? 0 :WIDTH*0.01,
                marginBottom: HEIGHT*1,
                // borderWidth: 1,
                backgroundColor: index===paginationIndex?setColors.black:setColors.white
               }}></Pressable>
        )
      })}
      </View>
    </Animated.View>
  )
}

export default Carousal