import React, { forwardRef } from 'react'
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { Image, Text, TextInput, View } from 'react-native';
import { setColors } from '../contants/colors';

const InputComponent = forwardRef((props,ref) => {

    const { icon,placeholder,componentWidth, error, onChangeText, value, backgroundColor, color, multiline, height, row, marginTop, number, maxLength, autoFocus, centered } = props;

  return (
    <>
    <View style={{ borderWidth: error ? 1 : 1, borderColor: error ? setColors.errorRed : setColors.gray, backgroundColor: backgroundColor ? backgroundColor : setColors.white, borderRadius: HEIGHT*0.01, flexDirection: 'row', alignItems: 'center', justifyContent: centered? 'center': null, marginTop: marginTop? marginTop:HEIGHT*0.05, borderBottomWidth: 1 }}>
      {icon && <Image style={{ marginLeft: WIDTH*0.02, marginBottom: multiline ? HEIGHT*0.15 : null}} source={icon}></Image>}

    <TextInput style={{ flexShrink:centered==='center'? 0:1, width:componentWidth, borderRadius: HEIGHT*0.01, height: height ? height :HEIGHT*0.060, color: color ? color: setColors.black, paddingLeft: centered==='center'?WIDTH*0.04:WIDTH*0.02, marginBottom: HEIGHT*0.001,marginTop:HEIGHT*0.007,backgroundColor: backgroundColor? backgroundColor: setColors.white, textAlignVertical:'top' }} ref={ref} placeholder={placeholder} placeholderTextColor={error? setColors.errorRed : setColors.black} onChangeText={onChangeText} value={value} multiline={multiline?multiline:false} keyboardType={number===true? 'numeric':'none'} maxLength={maxLength} autoFocus={autoFocus}/>
    </View>

    {error && <Text style={{ color: setColors.errorRed, fontWeight: '600', marginTop: HEIGHT*0.005,}}>{error}</Text> }
    </>
  )
})

export default InputComponent