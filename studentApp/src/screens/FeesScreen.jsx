import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { addFees } from '../contants/dummyData'
import { setColors } from '../contants/colors'
import { left_icon } from '../assets'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import isEmpty from 'lodash/isEmpty'
import { useDispatch } from 'react-redux'
import { addfees } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'
import { getData, storeData, updateData } from '../http/api'

const FeesScreen = () => {

    const [fees,setFees] = useState({});
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const constant={ FEES_STRUCTURE: 'Fees Structure', EDIT: 'EDIT', ADD: 'ADD' }
    useEffect(()=>{
        const unsubscribe = getFeesData();
        return () => unsubscribe;
    },[])
    const getFeesData = async () =>{
        try{
            const feesDta = await getData('Fees');
            setFees(feesDta[0])
        }catch(err){
            console.log("getFeesData_FeesScreen", feesDta);
        }
    }
    const handleChangeForm = (key,value) => {
        fees[key] = value;
        setFees({...fees})
        setError('')  
    }
    const onFeesFn = () => {
        const valid = validateForm();
        if(valid){
            if(fees){
                updateData('Fees',fees?.id,fees)
            }else{
                storeData('Fees',fees)
                dispatch(addfees(fees))
            }
            navigation.navigate('dashboard')
        }   
    }
    const validateForm = () => {
        const {Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10} = fees;
        let error = '';
        if(isEmpty(Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10)) error = '* All fields required'
        setError(error)
        return isEmpty(error)
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex:1 }}>
    <View style={{ backgroundColor: setColors.white, flex: 1 }}>
        <ProfileNavbar backBtn={left_icon} title={constant?.FEES_STRUCTURE}/>
        <View style={{ borderTopRightRadius: HEIGHT*0.03, backgroundColor: '#FFFFFF', flex:1 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH*0.04, justifyContent: 'space-between', marginTop: HEIGHT*0.04, paddingVertical: HEIGHT*0.01, backgroundColor: setColors.violetShade }}>
                <Text style={{ color: setColors.white, fontSize: 16, fontWeight: 600}}>Class</Text>
                <Text style={{ color: setColors.white, fontSize: 16, fontWeight: 600 }}>Yearly Fees</Text> 
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: WIDTH*0.02, paddingBottom: HEIGHT*0.05 }}>
                    {addFees.map((item)=>(
                        <View key={item?.id} style={{ flexDirection: 'row', paddingHorizontal: WIDTH*0.02, justifyContent: 'space-between', marginTop: HEIGHT*0.005 }}>
                        <Text style={{ marginTop: HEIGHT*0.01, color: setColors.black, fontWeight: 700 }}>{item?.class}</Text>
                        <InputComponent style={{borderWidth:1, width: WIDTH*0.3}} 
                        key={item?.id} value={fees?.[item?.value]} onChangeText={text => handleChangeForm(item?.value,text)} number={item?.number}
                        height={HEIGHT*0.055} componentWidth={WIDTH*0.3} marginTop={HEIGHT*0.005}/>
                        </View>
                    ))}
                     {error ? <Text style={{ color: setColors.errorRed, fontWeight: 600, marginTop: HEIGHT*0.005, textAlign: 'right', marginRight: WIDTH*0.015}}>{error}</Text> : null}
                    <View style={{ paddingHorizontal: WIDTH*0.04, marginBottom: HEIGHT*0.02 }}>
                    <ButtonComponent title={fees ? constant?.EDIT : constant?.ADD} onButtonPress={onFeesFn}/>
                    </View>
                </ScrollView>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default FeesScreen