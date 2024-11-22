import React from 'react'
import { TextInput, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { backgroundIndexes } from '../contants/dummyData'

const SudokuInputComp = (props) => {
  const {onChangeText,index,duplicateIndex, sudoku, readonly} = props;
  const value = sudoku[index]

  return (
    <TextInput style={{ borderWidth:0.5, backgroundColor: duplicateIndex.includes(index) ? setColors?.sudokuError: backgroundIndexes.includes(index) ? setColors?.sudokuLightShade:setColors?.white, borderRadius: HEIGHT*0.00,  height: HEIGHT*0.06, fontWeight: 800, color:readonly? setColors.defaultSudokuTxt:setColors.black,  paddingTop:HEIGHT*0.02, paddingLeft:WIDTH*0.04, textAlignVertical:'top'}} 
    onChangeText={onChangeText} value={value} keyboardType={'numeric'} maxLength={1} editable={!readonly}/>
  )
}

export default SudokuInputComp