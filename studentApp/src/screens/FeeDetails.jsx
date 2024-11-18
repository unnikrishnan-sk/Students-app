import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { feeMonthsDet } from '../contants/dummyData'
import { getData } from '../http/api'
import MonthlyFees from '../components/MonthlyFees'

const FeeDetails = () => {
    const [fees,setFees] = useState([]);
    const [openDet,setOpenDet] = useState(null);
    const constant = { FEE_DETAILS: 'Fee Details'}

    useEffect(()=>{
        const unsubscribe = getFeesData();
        return () => unsubscribe;
    },[])
    const getFeesData = async () =>{
        try{
            const feesDta = await getData('Fees');
            setFees(feesDta[0]?.Class10);
        }catch(err){
            console.log("getFeesData_FeeDetails", err); 
        }
    }
    const onDetailFeesPress = (id) => {
        setOpenDet(openDet===id?null:id)
    }

  return (
    <View style={{ height: HEIGHT, backgroundColor: setColors.white }}>
        <ProfileNavbar backBtn={left_icon} title={constant?.FEE_DETAILS}/>
        <View style={{ borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors?.white, height: HEIGHT, paddingHorizontal: WIDTH*0.04 }}>

        <FlatList contentContainerStyle={{marginTop: HEIGHT*0.02,  paddingBottom: HEIGHT*0.1 }} showsVerticalScrollIndicator={false} data={feeMonthsDet} ListEmptyComponent={()=> <Text>No Event for the day</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <MonthlyFees data={item} feeDetails={openDet===item?.id} fees={fees} onDetailFeesPress={()=>onDetailFeesPress(item?.id)} />} keyExtractor={item => item?.id}/>
        </View>
    </View>
  )
}

export default FeeDetails