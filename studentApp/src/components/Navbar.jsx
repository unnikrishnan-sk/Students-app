import React from 'react'
import { Image, View } from 'react-native'
import { FadeInView } from '../contants/common'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { logo } from '../assets'
import { setColors } from '../contants/colors'

const Navbar = () => {
  return (
    <>
    <View style={{ position: 'absolute', borderWidth: 1, height: HEIGHT*0.05, width: WIDTH*0.1, backgroundColor: setColors?.violetShade, right: 0, top: HEIGHT*0.39 }}>
    </View>
    <View style={{ height: HEIGHT*0.4, width: WIDTH*1.1, alignItems: 'center', justifyContent: 'center', backgroundColor: setColors.violetShade, borderBottomLeftRadius: HEIGHT*0.03 }}>
        <FadeInView duration='900'>
        <Image style={{ height: HEIGHT*0.11, width: HEIGHT*0.125 }} source={logo}></Image>
        </FadeInView>
    </View>
    </>
  )
}

export default Navbar