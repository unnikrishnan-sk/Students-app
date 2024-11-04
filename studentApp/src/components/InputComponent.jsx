import React from 'react'
import { HEIGHT, WIDTH } from '../contants/dimensions';
import { Image, Text, TextInput, View } from 'react-native';
import { setColors } from '../contants/colors';

const InputComponent = (props) => {

    const { icon,placeholder,componentWidth, error, onChangeText, value, backgroundColor, color, multiline, height, row, marginTop, number, maxLength, autoFocus, centered } = props;

  return (
    <>
    <View style={{ borderWidth: error ? 1 : 1, borderColor: error ? setColors.errorRed : setColors.gray, backgroundColor: backgroundColor ? backgroundColor : setColors.white, borderRadius: HEIGHT*0.01, flexDirection: 'row', alignItems: 'center', justifyContent: centered? 'center': null, marginTop: marginTop? marginTop:HEIGHT*0.05, borderBottomWidth: 1 }}>
      <Image style={{ marginLeft: WIDTH*0.05, marginBottom: multiline ? HEIGHT*0.15 : 0}} source={icon}></Image>

    <TextInput style={{ flex:centered==='center'?0:1, flexShrink:centered==='center'? 0:1, width:componentWidth, borderRadius: HEIGHT*0.01, height: height ? height :HEIGHT*0.060, color: color ? color: setColors.black, paddingLeft: WIDTH*0.03, marginBottom: HEIGHT*0.002,backgroundColor: backgroundColor? backgroundColor: setColors.white, textAlignVertical:'top' }} placeholder={placeholder} placeholderTextColor={error? setColors.errorRed : setColors.gray} onChangeText={onChangeText} value={value} multiline={multiline?multiline:false} keyboardType={number===true? 'numeric':'none'} maxLength={maxLength} autoFocus={autoFocus}/>
    </View>

    {error && <Text style={{ color: setColors.errorRed, fontWeight: '600', marginTop: HEIGHT*0.005,}}>{error}</Text> }
    </>
  )
}

export default InputComponent