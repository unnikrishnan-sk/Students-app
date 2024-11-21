import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors';
import { tick_mark } from '../assets';

const StudentList = (props) => {

  const {data,pressedCheckbox,attendance,presentList,onStudentEdit} = props;
  const {id, name, className, rollNo } = data;
  const isPresent = presentList ? presentList.includes(id) : null

  return (
    <View style={{ marginTop: HEIGHT*0.01, borderBottomWidth: 1, borderColor: setColors?.darkgrayShade, paddingBottom: HEIGHT*0.015, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{flex: 1}}>
      <Text style={{ color: setColors?.black, fontWeight: 500 }}>{String(name).charAt(0).toUpperCase()+String(name).slice(1)}</Text>
      </View>
      <View style={{flex: 1}}>
      <Text style={{ color: setColors?.black, fontWeight: 500 }}>{className}</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{ color: setColors?.black, fontWeight: 500 }}>{rollNo}</Text>
      </View>
      { attendance ? <Pressable 
      onPress={()=>pressedCheckbox(id)}
      style={{ borderWidth: 2, borderColor: setColors.grayShade, backgroundColor: isPresent ? setColors.backgroundGreen : setColors.white, width: WIDTH*0.1, height: HEIGHT*0.03, alignItems: 'center', justifyContent: 'center', borderRadius: HEIGHT*0.01 }}>
        {isPresent ? <Image style={{ height: HEIGHT*0.02, width: HEIGHT*0.02, tintColor: setColors?.white, }} source={tick_mark} ></Image> : null}
      </Pressable> : 
      <Pressable onPress={()=>onStudentEdit(name)}>
        <Text style={{ color: setColors?.violetShade, fontWeight: 500, textDecorationLine:'underline' }}>Edit</Text>
        </Pressable>
      }
    </View>
  )
}

export default StudentList