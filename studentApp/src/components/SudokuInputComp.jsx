import React from 'react'
import { TextInput, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { backgroundIndexes } from '../contants/dummyData'

const SudokuInputComp = ({onChangeText,error,index,currentIndex,duplicateIndex, sudoku}) => {
  const value = sudoku[index]
    
  return (
    
    <TextInput style={{ borderWidth:0.5, 
      width: HEIGHT*0.06, 
      backgroundColor: duplicateIndex.includes(index) ? setColors?.sudokuError: backgroundIndexes.includes(index) ? setColors?.sudokuLightShade:setColors?.white, 
      borderRadius: HEIGHT*0.00, 
      height: HEIGHT*0.06,
      fontWeight: 800, 
      color: setColors.black, 
      paddingTop:HEIGHT*0.02, 
      paddingLeft:WIDTH*0.04, 
      textAlignVertical:'top' 
    }} 
    onChangeText={onChangeText} 
    value={value} 
    keyboardType={'numeric'} 
    maxLength={1} />
  )
}

export default SudokuInputComp