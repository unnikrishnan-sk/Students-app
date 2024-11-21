import React, { useEffect, useRef } from 'react'
import { Animated, Modal, Pressable, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { FadeInView, SlideIn } from '../contants/common'

export const SlideInView = props => {
  // const animated = new Animated.Value(props?.initial);
  const animated = useRef(new Animated.Value(props.initial)).current
  const duration = 2000;

  useEffect(() => {
          Animated.timing(animated, {
              toValue: props?.final,
              duration: duration,
              useNativeDriver: true,
          }).start()
  }, [props.final]);

  return (
      <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
          {props.children}
      </Animated.View>
  );
};

const SudokuModalComponent = ({modalVisible,handleModalClose}) => {
  return (
    <SlideInView initial={100} final={0}>
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=>handleModalClose()}>
        <Pressable onPress={()=>handleModalClose()}
          style={{ paddingHorizontal: WIDTH*0.05, paddingVertical: HEIGHT*0.05, alignItems: 'center', justifyContent: 'center', top: HEIGHT*0.3, }}>
            <FadeInView duration='1000'>
            <View style={{ width: WIDTH*0.8, height: HEIGHT*0.2, backgroundColor: setColors?.violetShade, borderRadius: HEIGHT*0.04, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: setColors.white, fontSize: 24, fontWeight: 700 }}>CONGRATSS ..!!</Text>
              <Text style={{ color: setColors.white, fontSize: 24, fontWeight: 700 }}>YOU WON ..!!</Text>
            </View>
            </FadeInView>
        </Pressable>
    </Modal>
    </SlideInView>
  )
}

export default SudokuModalComponent