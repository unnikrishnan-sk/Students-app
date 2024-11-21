import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { setColors } from '../contants/colors'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import SudokuInputComp from '../components/SudokuInputComp'
import { checkInputValue, duplicates } from '../contants/common'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import SudokuModalComponent from '../components/SudokuModalComponent'

const Sudoku = () => {
    const [sudoku,setSudoku] = useState(Array(81).fill(''));
    const [currentIndex,setCurrentIndex] = useState(0);
    const [duplicate,setDuplicate] =  useState(false)
    const [duplicateIndex,setDuplicateIndex] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const constant = {SUDOKU: 'Sudoku'}
    const navigation = useNavigation();
    
    useEffect(()=>{
        AllCheck();
        checkGame();
    },[sudoku])

    const checkGame = () => {
        if(sudoku?.length===81 && !sudoku.includes("") && duplicateIndex?.length===0){
            console.log("YOU WON ##!!... That was your last move of the Game");
            setModalVisible(true)
        }
    }

    const AllCheck = () => {

        // Row Check
        const repeatCell = [];
        for (let i=0;i<9;i++) {
            const row = [];  
            const rowIndices = [];  
            for (let j=0;j<9;j++) {
                const cell = i*9+j;  
                const value = sudoku[cell];
                if (value !== "") {  
                    row.push(value);
                    rowIndices.push(cell);  
                }
            }
            const duplicatesFound = duplicates(row);
        if (duplicatesFound) {
            rowIndices.forEach((index, k) => {
                if (row.filter(val => val === row[k]).length > 1) {
                    repeatCell.push(index);
                }
            });
        }
    }

    // Column Check
    for(let i=0;i<9;i++){
        const column = [];
        const columnIndices = [];

        for(let j=0;j<9;j++){
            const cell = i+j*9;
            const value = sudoku[cell];
            if (value !== "") {  
                column.push(value);
                columnIndices.push(cell);  
            }
        }
        const duplicatesFound = duplicates(column);
        if (duplicatesFound) {
            columnIndices.forEach((index, k) => {
                if (column.filter(val => val === column[k]).length > 1) {
                    repeatCell.push(index);
                }
            });
        }
    }

    // Cube Check
    for(let i=0;i<9;i++){
        const cube = [];
        const cubeIndices = [];  
        const startRow = Math.floor(i%3)*3;
        const startCol = Math.floor(i/3)*3;
        for(let row=startRow;row<startRow+3;row++){
            for(let col=startCol;col<startCol+3;col++){
                const cell = row*9+col;
                const value = sudoku[cell];
                if(value !== ""){
                    cube.push(value);
                    cubeIndices.push(cell);
                }
            }
        }
        const duplicatesFound = duplicates(cube);
        if (duplicatesFound) {
            cubeIndices.forEach((index, k) => {
                if (cube.filter(val => val === cube[k]).length > 1) {
                    repeatCell.push(index);
                }
            });
        }
    }

    //Diagonal Checking

    const diagonal = [];
    const diagonalIndices = []
    const antiDiagonal = [];
    const antiDiagonalIndices = []

    for(let i=0;i<9;i++){
        const diagonalIndex = (i*9)+i;
        const antiDiagonalIndex = (i*9)+(8-i);
        const mainValue = sudoku[diagonalIndex];
        const antiValue = sudoku[antiDiagonalIndex];
        if (mainValue !== "") {
            diagonal.push(mainValue);
            diagonalIndices.push(diagonalIndex)
        }
        if (antiValue !== "") {
            antiDiagonal.push(antiValue);
            antiDiagonalIndices.push(antiDiagonalIndex)
        }  
        }
        const res1 = duplicates(diagonal);
        if(res1){
            for (let k=0;k<diagonal.length;k++) {
                const currentValue = diagonal[k];
                if (diagonal.filter(val => val === currentValue).length > 1) {
                    const duplicateCellIndex = diagonalIndices[k]; 
                    repeatCell.push(duplicateCellIndex);
                }
            }
        }
        const res2 = duplicates(antiDiagonal);
        if(res2){
            for (let k=0;k<antiDiagonal.length;k++) {
                const currentValue = antiDiagonal[k];
                if (antiDiagonal.filter(val => val === currentValue).length > 1) {
                    const duplicateCellIndex = antiDiagonalIndices[k]; 
                    repeatCell.push(duplicateCellIndex);
                }
            }
        }

    setDuplicateIndex(repeatCell);
    }
    
    const handleChangeForm = (text,index) => {
        const inputCheck = checkInputValue(text);
        if (text === "") {
            setCurrentIndex(index);
            setSudoku((prevSudoku) => {
                const newSudoku = [...prevSudoku];
                newSudoku[index] = text;
                return newSudoku;
            });
            return;
        }  
        if(inputCheck){
            setCurrentIndex(index)
            setSudoku((prevSudoku) => {
          const newSudoku = [...prevSudoku];
          newSudoku[index] = text;
          return newSudoku
        });
        }else{
            Alert.alert("Enter Numbers from 1 - 9")
            setSudoku((prevSudoku) => {
                const newSudoku = [...prevSudoku];
                newSudoku[index] = "";
                return newSudoku
            });
        }
      }

    const onResetPress = () => {
        setSudoku(Array(81).fill(''));
        setDuplicateIndex([])
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
    <View style={{ backgroundColor: setColors?.white,height: HEIGHT, flex:1 }}>
        <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: HEIGHT*0.01 }}>
         <ProfileNavbar backBtn={left_icon} title={constant?.SUDOKU}/>
         <View style={{ 
            borderTopRightRadius: HEIGHT*0.02, backgroundColor: setColors?.white }}>
            <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'center',
                // backgroundColor: setColors.violetLightShade, 
                marginTop: HEIGHT*0.03 }}>
            {sudoku.map((_,index)=>(
                <View key={index}
                style={{ 
                    backgroundColor: setColors.violetShade,
                    borderRightWidth: index%3===2 ? 2 : 0, 
                    borderBottomWidth: (index >= 18 && index <= 26) || (index >= 45 && index <= 53) || (index >= 72 && index <= 81) ? 2 : 0, 
                    borderLeftWidth: index%9===0 ? 2:0, 
                    borderTopWidth: (index >= 0 && index <=8 ) ? 2 : 0 }}>
                 <SudokuInputComp onChangeText={text=>handleChangeForm(text,index)} error={duplicate} index={index} currentIndex={currentIndex} duplicateIndex={duplicateIndex} sudoku={sudoku}/>
                 </View>
            ))}
           </View>
         </View>
         <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: WIDTH*0.05,
            justifyContent: 'space-between'
         }}>
         <ButtonComponent title="RESET" onButtonPress={()=>onResetPress()} buttonWidth={WIDTH*0.4}/>
         <ButtonComponent title="RULES" onButtonPress={()=>navigation.navigate('rules')} buttonWidth={WIDTH*0.4}/>
         </View>
         </ScrollView>
    </View>

    <SudokuModalComponent modalVisible={modalVisible} handleModalClose={()=>setModalVisible(false)}/>

    </KeyboardAvoidingView>
  )
}

export default Sudoku