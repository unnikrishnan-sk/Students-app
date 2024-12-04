import React, { useEffect, useRef, useState } from 'react'
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSequence, withSpring, withTiming, Easing, useAnimatedRef } from 'react-native-reanimated'
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { images } from '../contants/dummyData';
import Carousel,  { Pagination } from 'react-native-reanimated-carousel';
import { setColors } from '../contants/colors';
import PaginationDot from 'react-native-animated-pagination-dot'

const Animations = () => {

// const ImageWidth = WIDTH;
  const sv = useSharedValue(0);
  const [paginationIndex,setPaginationIndex] = useState(0);
  const [currPage,setCurrPage] = useState(0);
  const carousalRef = useRef();
    // console.log("pagination",paginationIndex);
    
    // useEffect(()=>{
        // onPressPagination()
        // console.log("ref",ref.current.getCurrentIndex());
        // setPaginationIndex(ref.current.getCurrentIndex())
        // onViewableItemsChanged()
    // })

    const onPressPagination = (index) => {
      // console.log("inside pagination",index.current.scrollTo());
      console.log("function called here");
      
      setPaginationIndex(index.current.getCurrentIndex())
        carousalRef.current?.scrollTo({
            count: index-sv.value,
            animated: true
        })
        console.log("inside pagination",carousalRef.current);
    }

    // const onViewableItemsChanged = ({ viewableItems }) => {
    //     console.log("viewableItems",viewableItems);
        
    //     if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
    //       setCurrentIndex(viewableItems[0].index);
    //       setPaginationIndex(viewableItems[0].index % images.length);
    //     }
    //   };

    // const viewabilityConfig = {
    //     itemVisiblePercentThreshold: 50,
    //   };

      // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const handlePress = () => {
  //   sv.value = withRepeat(withTiming(-ImageWidth, {
  //       duration: 1000
  //   }), 
  //   1, 
  //   false, 
  //   ()=>{}, ReduceMotion.System);

  withTiming(sv.value, {
    duration: 2000,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  })

    // sv.value = withSpring(sv.value, {
    //     mass: 1,
    //     damping: 10,
    //     stiffness: 100,
    //     overshootClamping: false,
    //     restDisplacementThreshold: 0.1,
    //     restSpeedThreshold: 2,
    //     reduceMotion: ReduceMotion.System,
    // })

    // sv.value = withSequence(withTiming(-WIDTH),withTiming(-WIDTH))

    // sv.value = withTiming(sv.value, {
    //     duration: 1000,
    //     easing: Easing.inOut(Easing.quad),
    //     reduceMotion: ReduceMotion.System,
    // })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value }],
    };
  });

  return (
    <View style={{
        // borderWidth: 1,
        width:WIDTH,
        height: HEIGHT,
        flex:1
    }}>
         <Carousel 
         loop
         width={WIDTH}
         height={HEIGHT}
         autoPlay={true}
         data={images}
         ref={carousalRef}
         mode='parallax'
        //  onProgressChange={sv}
         onScrollEnd={()=>onPressPagination(carousalRef)}
        //  onScrollBegin={()=>onPressPagination(carousalRef)}
        //  onScrollBegin={()=>setPaginationIndex(ref)}
        //  viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
         scrollAnimationDuration={1000}
        //  onSnapToItem={(index) => console.log('current index:', index,paginationIndex)}
                renderItem={({ index, item }) => (
                    <View
                    key={item.id}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                        style={{
                            height: HEIGHT,
                            width: WIDTH
                        }}
                        source={item.image}>
                        </Image>
                    </View>
                )}
         />
         <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        justifyContent: 'center'
         }}>
          {images.map((item,index)=>{
            console.log("item",paginationIndex,index);
            
        return (
            <View 
            key={item.id}
            style={{
                height: HEIGHT*0.015,
                width: HEIGHT*0.015,
                borderRadius:HEIGHT*0.04,
                marginLeft: item.id===0? 0 :WIDTH*0.01,
                marginBottom: HEIGHT*0.15,
                // borderWidth: 1,
                backgroundColor: index===paginationIndex?setColors.black:setColors.white
               }}></View>
        )
      })}
      </View>
        
         {/* <Pagination.Basic
         progress={sv}
         data={images}
         dotStyle={{backgroundColor: '#262636'}}
         activeDotStyle={{backgroundColor: '#f1f1f1'}}
         containerStyle={{gap:5,marginBottom:10}}
         onPress={onPressPagination}
         /> */}

         {/* <PaginationDot
         activeDotColor={setColors.black}
         inactiveDotColor={setColors.white}
         curPage={currPage}
         maxPage={5}
         /> */}
    
    </View>
  )
}

export default Animations