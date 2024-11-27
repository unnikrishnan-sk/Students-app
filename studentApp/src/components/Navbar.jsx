import React from 'react'
import { Image, Pressable, StatusBar, View } from 'react-native'
import { FadeInView } from '../contants/common'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { logo } from '../assets'
import { setColors } from '../contants/colors'


const Navbar = () => {
  return (
    <>
    <View style={{ position: 'absolute', borderWidth: 1, height: HEIGHT*0.05, width: WIDTH*0.1, backgroundColor: setColors?.violetShade, right: 0, top: HEIGHT*0.49 }}>
    </View>
    <View style={{ height: HEIGHT*0.5, width: WIDTH, alignItems: 'center', justifyContent: 'center', backgroundColor: setColors?.violetShade, borderBottomLeftRadius: HEIGHT*0.03 }}>
    <StatusBar
          backgroundColor={setColors?.violetShade}
        />
        <FadeInView duration='1000'>
        <Image style={{ height: HEIGHT*0.15, width: HEIGHT*0.175 }} source={logo}></Image>
        </FadeInView>
    </View>
    </>
  )
}

export default Navbar