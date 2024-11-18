import React from 'react'
import { Text, View } from 'react-native'
import { setColors } from '../contants/colors';
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { getMonth } from '../contants/common';

const RenderCustomHeader = ({monthChange,yearChange}) => {
   const selectMonth = getMonth(monthChange)

  return (
    <View style={{ width: WIDTH, marginBottom: HEIGHT*0.005, marginRight: WIDTH*0.8, }}>
        <Text style={{ color: setColors?.violetShade, fontWeight: 600, fontSize: 16, textAlign: 'left'}}>{selectMonth} {yearChange}</Text>
    </View>
  )
}

export default RenderCustomHeader