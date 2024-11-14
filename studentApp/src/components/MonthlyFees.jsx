import React from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import { FadeInView } from '../contants/common'
import { setColors } from '../contants/colors'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { down_arrow_triangle, dropdown_icon, up_arrow, up_arrow_triangle } from '../assets'
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
       <View style={{ borderBottomWidth: feeDetails ? 0.5: 0, borderColor: setColors.gray, marginTop: HEIGHT*0.02, borderTopLeftRadius: HEIGHT*0.015, borderTopRightRadius: HEIGHT*0.015, borderBottomLeftRadius: feeDetails ? 0 : HEIGHT*0.015, borderBottomRightRadius: feeDetails?0:HEIGHT*0.015, backgroundColor: setColors.blueShade, paddingHorizontal: WIDTH*0.02, paddingVertical: HEIGHT*0.01, }}>
            <Text style={{ color: setColors.gray, fontSize: 12, fontWeight: '600', marginTop: HEIGHT*0.007 }}>School Fee for {month}</Text>

                <View style={{ flexDirection: 'row', marginTop: HEIGHT*0.001, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 18, color: setColors.black }}>$ {fees}</Text>
                
                <View style={{ marginLeft: WIDTH*0.017, paddingHorizontal: WIDTH*0.025, paddingVertical:HEIGHT*0.001, borderRadius: HEIGHT*0.015, backgroundColor: constant.PAID===status ?setColors.backgroundGreen:setColors.statusRed, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: setColors.white, fontSize: 11 }}>{status}</Text> 
                </View>
                </View>
                <Pressable onPress={(id)=>onDetailFeesPress(id)} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image style={{ height: HEIGHT*0.02, width: WIDTH*0.032, tintColor: setColors.black, }} 
                source={feeDetails ? up_arrow_triangle : down_arrow_triangle}/>
                </Pressable>
                </View>
            </View>
            { feeDetails && 
            <FadeInView duration="200">
            <View style={{ backgroundColor: setColors.blueShade, borderBottomLeftRadius: HEIGHT*0.02, borderBottomRightRadius: HEIGHT*0.02,}}>
                <FlatList contentContainerStyle={{marginTop: HEIGHT*0.01,  paddingBottom: HEIGHT*0.01}} showsVerticalScrollIndicator={false} data={schoolFeeDetails} ListEmptyComponent={()=> <Text>No Event for the day</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <FeeDetailComp data={item} fees={fees} />} keyExtractor={item => item.id}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: WIDTH*0.05, paddingBottom: HEIGHT*0.015, marginTop: HEIGHT*0.01 }}>
                    <Text style={{ fontWeight: '800', fontSize: 13, color: setColors.black }}>{status===constant.PAID?'Paid Fee':'Payable Fee'}</Text>
                    <Text style={{ fontWeight: '800', fontSize: 14, color: setColors.black }}>${fees}</Text>
                </View>
            </View>
        </FadeInView>}
    </>
  )
}

export default MonthlyFees