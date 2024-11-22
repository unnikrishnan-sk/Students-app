import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { FadeInView, initialSudokuCreate, SlideInView } from '../contants/common'
import ButtonComponent from './ButtonComponent'

const SudokuModalComponent = ({modalVisible,handleModalClose,handleNextBtn}) => {
  return (
    <SlideInView initial={100} final={0}>
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=>handleModalClose()}>
        <Pressable onPress={()=>handleModalClose()}
          style={{ paddingHorizontal: WIDTH*0.05, paddingVertical: HEIGHT*0.05, alignItems: 'center', justifyContent: 'center', top: HEIGHT*0.3, }}>
            <FadeInView duration='1000'>
            <View style={{ width: WIDTH*0.8, height: HEIGHT*0.22, backgroundColor: setColors?.violetShade, borderRadius: HEIGHT*0.04, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: setColors.white, fontSize: 24, fontWeight: 700 }}>CONGRATSS ..!!</Text>
              <Text style={{ color: setColors.white, fontSize: 24, fontWeight: 700 }}>YOU WON ..!!</Text>
              <ButtonComponent buttonWidth={WIDTH*0.4} bgColor={setColors?.white} title="NEXT" txtColor={setColors?.violetShade} onButtonPress={handleNextBtn}/>
            </View>
            
            </FadeInView>
        </Pressable>
    </Modal>
    </SlideInView>
  )
}

export default SudokuModalComponent