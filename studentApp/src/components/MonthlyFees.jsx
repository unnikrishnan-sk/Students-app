import React from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import { FadeInView } from '../contants/common'
import { setColors } from '../contants/colors'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { dropdown_icon, up_arrow } from '../assets'
import FeeDetailComp from './FeeDetailComp'
import { schoolFeeDetails } from '../contants/dummyData'

const MonthlyFees = (props) => {

    const {feeDetails,fees,onDetailFeesPress,data} = props;
    const {id,month,status} = data;
    const constant = {
        PAID: "Paid",
        NOT_PAID: "Not Paid"
    }

  return (
    <>
       <View style={{ borderBottomWidth: feeDetails ? 0.5: 0, borderColor: setColors.gray, marginTop: HEIGHT*0.03, borderTopLeftRadius: HEIGHT*0.02, borderTopRightRadius: HEIGHT*0.02, borderBottomLeftRadius: feeDetails ? 0 : HEIGHT*0.02, borderBottomRightRadius: feeDetails?0:HEIGHT*0.02, backgroundColor: setColors.blueShade, paddingHorizontal: WIDTH*0.05, paddingVertical: HEIGHT*0.015, }}>
            <Text style={{ color: setColors.gray, fontSize: 13, fontWeight: '500', marginTop: HEIGHT*0.01 }}>School Fee for {month}</Text>

                <View style={{ flexDirection: 'row', marginTop: HEIGHT*0.01, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 20, color: setColors.black }}>$ {fees}</Text>
                
                <View style={{ height: HEIGHT*0.03, marginLeft: WIDTH*0.02, paddingHorizontal: WIDTH*0.03, borderRadius: HEIGHT*0.015, backgroundColor: constant.PAID===status ?setColors.backgroundGreen:setColors.errorRed, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: setColors.white, fontSize: 12 }}>{status}</Text> 
                </View>
                </View>
                <Pressable onPress={(id)=>onDetailFeesPress(id)}>
                <Image style={{ height: HEIGHT*0.04, width: WIDTH*0.04, tintColor: setColors.calendarRed }} 
                source={feeDetails ? up_arrow : dropdown_icon}/>
                </Pressable>
                </View>
            </View>
            { feeDetails && 
            <FadeInView duration="100">
            <View style={{ backgroundColor: setColors.blueShade, borderBottomLeftRadius: HEIGHT*0.02, borderBottomRightRadius: HEIGHT*0.02,}}>
                <FlatList contentContainerStyle={{marginTop: HEIGHT*0.02,  paddingBottom: HEIGHT*0.02}} showsVerticalScrollIndicator={false} data={schoolFeeDetails} ListEmptyComponent={()=> <Text>No Event for the day</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <FeeDetailComp data={item} fees={fees} />} keyExtractor={item => item.id}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: WIDTH*0.05, paddingBottom: HEIGHT*0.03, marginTop: HEIGHT*0.02 }}>
                    <Text style={{ fontWeight: '800', fontSize: 14, color: setColors.black }}>{status===constant.PAID?'Paid Fee':'Payable Fee'}</Text>
                    <Text style={{ fontWeight: '800', fontSize: 14, color: setColors.black }}>${fees}</Text>
                </View>
            </View>
        </FadeInView>}
    </>
  )
}

export default MonthlyFees