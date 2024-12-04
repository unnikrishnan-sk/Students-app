import React, { useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, Text, View, } from 'react-native'
import { VerifiedIcon } from '../Constants/Icons'
import { HEIGHT, WIDTH} from '../Constants/Dimension'
// import appColor from '../Constants/Color'
import { RFValue } from 'react-native-responsive-fontsize'
import Button from './Button'
import { PlanDetail } from '../Constants/formUi'
import Animated, { Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'


const Note = ({ carouselComponet, carouselArray, carouselStyle, caroselItem }) => {
    const [carouselIndex, setCarouselIndex] = useState(0)
    console.log("carouselIndex=>", carouselIndex)
    return (
        <View>
            <ScrollView horizontal={true}
                initialScrollIndex={0}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
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
                {
                    carouselArray.map((item, index) => {
                        const { carouselComponet, carouselArray, carouselStyle, caroselItem } = item.props
                        console.log("item=>", item.props)
                        return (
                            <View style={[{ alignSelf: "center", width: WIDTH, height: HEIGHT * .7, }, carouselStyle]}>
                                <Animated.View style={[{ borderRadius: 20, backgroundColor: appColor.White, marginTop: HEIGHT * .11, alignSelf: "center", }, useAnimatedStyle(() => {
                                    return {
                                        transform: [{ scale: withTiming(carouselIndex === index ? 1 : .7, { easing: Easing.ease }) }],
                                        marginLeft: withTiming(carouselIndex < index ? Width * -.65 : 0, { easing: Easing.ease }),
                                        marginRight: withTiming(carouselIndex > index ? Width * -.65 : 0, { easing: Easing.ease })
                                    };
                                }),]} >
                                    {carouselComponet}
                                    {/* <View style={{ backgroundColor: appColor.red, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                    <Text style={{ textAlign: "center", color: appColor.White, paddingVertical: Height * .02, fontSize: RFValue(14), fontWeight: "bold", }}>{item.number_of_month}- Months Subscription</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: Height * .025, }}>
                                    <Text style={{ color: appColor.lightGrey3, fontSize: RFValue(9), marginTop: Height * .011 }}>$</Text>
                                    <Text style={{ fontSize: RFValue(40), fontWeight: "bold", color: appColor.PrimaryText }}>{item.price}</Text>
                                    <Text style={{ textTransform: "capitalize", alignSelf: "flex-end", color: appColor.lightGrey3, fontSize: RFValue(9), marginBottom: Height * .013 }}>/month</Text>
                                </View>
                                <View style={{ height: Height * .25 }}>
                                    <FlatList
                                        data={PlanDetail[index]?.features}
                                        renderItem={({ item }) => (
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: Height * .02 }}>
                                                <View style={{ backgroundColor: appColor.green, padding: Width * .01, borderRadius: 50, width: Width * .03, height: Width * .03 }}>
                                                    <Image source={VerifiedIcon} style={{ alignSelf: "center", resizeMode: "contain", width: Width * .02, alignSelf: "center" }} />
                                                </View>
                                                <Text style={{ marginLeft: Width * .02, fontSize: RFValue(10), textTransform: "capitalize", color: appColor.PrimaryText, width: Width * .55 }}>{item}</Text>
                                            </View>
                                        )}
                                        style={{ paddingHorizontal: Width * .05 }}
                                    />
                                </View>
                                <Button btnTitle="subscribe now" btnStyle={{ width: Width * .5, borderRadius: 10, alignSelf: "center", marginVertical: Height * .02, }} handlebtnPress={() => handleSubscribe(item, index)} /> */}
                                </Animated.View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={{ marginTop: Height * .03, justifyContent: "center", flexDirection: "row" }}>
                {
                    carouselArray.map((item, index) => (
                        <Animated.View style={[{ height: Width * .03, width: Width * .03, borderRadius: 50, marginLeft: Width * .01, }, useAnimatedStyle(() => {
                            return {
                                backgroundColor: withDelay(1, withTiming(carouselIndex === index ? appColor.Blue : appColor.extraLightGrey, { easing: Easing.ease, duration: 1000 })),
                            };
                        })]} />
                    ))
                }
            </View>
        </View>

    )
}

export default Note



// const parallaxStyle = (index) => {
  //   console.log("index",index);
    
  //   return useAnimatedStyle(() => {
  //     const inputRange = [
  //       (index - 1) * WIDTH,
  //       index * WIDTH,
  //       (index + 1) * WIDTH,
  //     ];
  //     const outputRange = [-30, 0, 30]
  //     const translateX = withTiming(
  //       interpolate(scrollX.value, inputRange, outputRange, Easing.linear),
  //       { duration: 200 }
  //     );

  //     return {
  //       transform: [{ translateX }],
  //     };
  //   });
  // };