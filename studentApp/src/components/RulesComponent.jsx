import React from 'react'
import { FlatList, Text, View } from 'react-native'
import ProfileNavbar from './ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { rulesSudoku } from '../contants/dummyData'
import { FadeInView } from '../contants/common'

const RulesComponent = () => {
    const constant = {SUDOKU: 'Sudoku'}
  return (
    <View>
         <ProfileNavbar backBtn={left_icon} title={constant?.SUDOKU}/>
         <View style={{ height: HEIGHT, borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors.white, paddingHorizontal: WIDTH*0.055 }}>
          <FadeInView duration='500'>
            <FlatList data={rulesSudoku} 
            renderItem={({item})=>{
                return(
                    <Text key={item?.id}
                    style={{ marginTop: item?.id===0 ? HEIGHT*0.03 :HEIGHT*0.015, color: setColors?.violetShade, fontSize: 14, fontWeight: 700 }}>{`\u2022 ${item?.desc}`}</Text>
                )
            }}
            />
            </FadeInView>
         </View>
    </View>
  )
}

export default RulesComponent