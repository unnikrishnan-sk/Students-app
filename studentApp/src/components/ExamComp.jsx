import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { setColors } from '../contants/colors'
import { HEIGHT, WIDTH } from '../contants/dimensions'

const ExamComp = ({data}) => {
    const {duration,examName,subject,totalMarks,date } = data;
  return (
    <View style={{ marginTop: HEIGHT*0.01, paddingHorizontal: WIDTH*0.03, paddingVertical: HEIGHT*0.01, backgroundColor: setColors?.violetLightShade, borderRadius: HEIGHT*0.02,
    }}>
        <Text style={{ fontWeight: 600, fontSize: 17, color: setColors.black }}>{examName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ marginTop: HEIGHT*0.005, color: setColors.black, fontWeight: 500 }}>Subject: <Text style={{ color: setColors?.gray }}> {subject}</Text></Text>
         <Text style={{ marginTop: HEIGHT*0.005, marginLeft: WIDTH*0.05, color: setColors.black, fontWeight: 500 }}>Date: <Text style={{ color: setColors?.gray }}> {date}</Text></Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
         <Text style={{ marginTop: HEIGHT*0.005, color: setColors?.black, fontWeight: 500 }}>Max Marks: <Text style={{ color: setColors?.gray }}> {totalMarks}</Text></Text>
        <Text style={{ marginTop: HEIGHT*0.005, marginLeft: WIDTH*0.03, color: setColors?.black, fontWeight: 500 }}>Duration: <Text style={{ color: setColors?.gray }}> {duration}</Text></Text>
        </View>
        <Pressable style={{ marginTop: HEIGHT*0.01, width: WIDTH*0.3, alignItems: 'center', borderRadius: HEIGHT*0.015, paddingVertical: HEIGHT*0.004, backgroundColor: setColors?.statusRed }}>
            <Text style={{ color: setColors?.white, fontSize: 13 }}>Start Tests</Text>
        </Pressable>
    </View>
  )
}

export default ExamComp