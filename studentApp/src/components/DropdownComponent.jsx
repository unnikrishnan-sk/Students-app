import React from 'react'
import { Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'

const DropdownComponent = ({data,title,value,handleChange,setFocus,width,marginLeft,placeholderColor}) => {
  return (
    <View>
    <Dropdown style={{ height: HEIGHT*0.07, width:width?width:0, borderColor: setColors.darkgrayShade, marginLeft:marginLeft?marginLeft:0, borderRadius: HEIGHT*0.02, paddingHorizontal: WIDTH*0.02, borderWidth: 2, marginTop: HEIGHT*0.02, color: setColors.black, paddingLeft: WIDTH*0.05 }}
    selectedTextStyle={{fontSize: HEIGHT*0.022, color:setColors.black}}
    inputSearchStyle={{ height: HEIGHT*0.3, fontSize: HEIGHT*0.02,}}
    itemContainerStyle={{backgroundColor:setColors.white}}
    itemTextStyle={{color: setColors.black}}
    activeColor={setColors.white}
    data={data}
    maxHeight={HEIGHT*0.3}
    labelField="name"
    valueField="value"
    placeholder={title}
    placeholderStyle={{ color: placeholderColor?placeholderColor:setColors.gray, fontSize: HEIGHT*0.02 }}
    showsVerticalScrollIndicator={false}
    value={value}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    onChange={handleChange} />
    </View>
  )
}

export default DropdownComponent