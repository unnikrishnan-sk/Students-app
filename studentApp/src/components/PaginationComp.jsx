import React from 'react'
import { View } from 'react-native'
import { HEIGHT } from '../contants/dimensions'
import { images } from '../contants/dummyData'
import Dot from './Dot'

const PaginationComp = ({PaginationIndex}) => {
  console.log("pagination index",PaginationIndex);
  
  return (
    <View style={{
      borderWidth: 1,
        flexDirection: 'row',
        marginTop: HEIGHT*0.02,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      {images.map((_,index)=>{
        return <Dot index={index} key={index} PaginationIndex={PaginationIndex} />
      })}
    </View>
  )
}

export default PaginationComp