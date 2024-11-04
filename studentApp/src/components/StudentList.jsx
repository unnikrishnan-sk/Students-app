import React from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors';
import InputComponent from './InputComponent';
import { tick_mark } from '../assets';

const StudentList = (props) => {

  const {data,pressedCheckbox,attendance,presentList,onStudentEdit} = props;
  const {id, name, className, rollNo } = data;

  const isPresent = presentList ? presentList.includes(id) : null

  return (
    <View style={{
      marginTop: HEIGHT*0.01,
      // borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: setColors.darkgrayShade,
      paddingBottom: HEIGHT*0.025,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <View style={{flex: 1}}>
      <Text style={{
        color: setColors.black,
        fontWeight: '500'
      }}>{name}</Text>
      </View>
      <View style={{flex: 1}}>
      <Text style={{
        color: setColors.black,
        fontWeight: '500'
      }}>{className}</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{
        color: setColors.black,
        fontWeight: '500'
      }}>{rollNo}</Text>
      </View>
      { attendance ? <Pressable 
      onPress={()=>pressedCheckbox(id)}
      style={{
        borderWidth: 2,
        borderColor: setColors.grayShade,
        backgroundColor: isPresent ? setColors.backgroundGreen : setColors.white,
        width: WIDTH*0.1,
        height: HEIGHT*0.03,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isPresent && <Image style={{
          height: HEIGHT*0.02,
          width: HEIGHT*0.02,
          tintColor: setColors.white,
        }} source={tick_mark}></Image>}
      </Pressable> : 
      <Pressable onPress={()=>onStudentEdit(name)}>
        <Text style={{
          color: setColors.violetShade,
          fontWeight: '500'
        }}>Edit</Text>
        </Pressable>
      }
    </View>
  )
}

export default StudentList