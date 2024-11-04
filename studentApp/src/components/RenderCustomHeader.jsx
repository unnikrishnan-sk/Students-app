import React from 'react'
import { Text, View } from 'react-native'
import { setColors } from '../contants/colors';
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { getMonth } from '../contants/common';

const RenderCustomHeader = ({monthChange,yearChange}) => {
    console.log('month',monthChange,yearChange);

   const selectMonth = getMonth(monthChange)
   console.log("select",selectMonth);
   
    
  return (
    <View style={{
        // borderWidth: 1,
        width: WIDTH,
        // marginLeft: WIDTH*0.01,
        marginBottom: HEIGHT*0.01,
        marginRight: WIDTH*0.8,
        // alignItems: 'flex-start',
        // alignSelf: 'stretch'
    }}>
        <Text style={{
            color: setColors.violetShade,
            fontWeight: '600',
            fontSize: 16,
            textAlign: 'left'
            // alignItems: 'flex-start'

        }}>{selectMonth} {yearChange}</Text>
    </View>
  )
}

export default RenderCustomHeader