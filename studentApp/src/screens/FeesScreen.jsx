import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { addFees } from '../contants/dummyData'
import { setColors } from '../contants/colors'
import { left_icon } from '../assets'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import isEmpty from 'lodash/isEmpty'
import { useDispatch, useSelector } from 'react-redux'
import { addfees } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'
import { dropdown_icon } from '../assets'
import { getData, storeData, updateData } from '../http/api'

const FeesScreen = () => {

    const [fees,setFees] = useState({});
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const existingFees = useSelector((state)=>state?.isAdmin?.fees)

    console.log("existing",existingFees);

    useEffect(()=>{
        // if(existingFees) setFees(existingFees)
        const unsubscribe = getFeesData();
        return () => unsubscribe;
    },[])

    const getFeesData = async () =>{
        const feesDta = await getData('Fees');
        setFees(feesDta[0])
        console.log("fees here",feesDta[0]);
    }
    

    const handleChangeForm = (key,value) => {
        fees[key] = value;
        console.log(fees);
        setFees({...fees})
        setError('')  
    }

    const onFeesFn = () => {
        const valid = validateForm();
        console.log("error",error);
        if(valid){
            if(fees){
                console.log("edited fees",fees.id);
                updateData('Fees',fees?.id,fees)
            }else{
                console.log("fees_here", fees);
                storeData('Fees',fees)
                dispatch(addfees(fees))
            }
            navigation.navigate('dashboard')
        }   
    }

    const validateForm = () => {
        console.log("fees",fees);
        const {Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10} = fees;
        console.log("fees!",Class1);
        
        let error = '';
        if(isEmpty(Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10)) error = '* All fields required'
            setError(error)
            return isEmpty(error)
        
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex:1 }}>
    <View style={{
        backgroundColor: setColors.white,
        // height: HEIGHT
        flex: 1
    }}>
        <ProfileNavbar backBtn={left_icon} title={'Fees Structure'}/>
        <View style={{
            borderTopRightRadius: HEIGHT*0.03,
            backgroundColor: '#FFFFFF',
            // borderWidth: 1
            flex:1
        }}>
            <View style={{
                // height: HEIGHT*0.1,
                // borderWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: WIDTH*0.05,
                justifyContent: 'space-between',
                marginTop: HEIGHT*0.04,
                paddingVertical: HEIGHT*0.01,
                backgroundColor: setColors.violetShade
            }}>
                <Text style={{
                    color: setColors.white,
                    fontSize: 16,
                    fontWeight: '600'
                }}>Class</Text>
                <Text style={{
                    color: setColors.white,
                    fontSize: 16,
                    fontWeight: '600'
                }}>Yearly Fees</Text> 
            </View>

            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{
                paddingHorizontal: WIDTH*0.05,
                marginBottom: HEIGHT*0.05,
            }}>
                    {addFees.map((item)=>(
                        <View key={item.id} style={{
                            flexDirection: 'row',
                            // borderWidth: 1,
                            paddingHorizontal: WIDTH*0.02,
                            justifyContent: 'space-between',
                            marginTop: HEIGHT*0.01
                        }}>
                        <Text style={{
                            marginTop: HEIGHT*0.02,
                            color: setColors.black,
                            fontWeight: '700'
                            // borderBottomWidth: 1,
                            // borderColor: setColors.black
                        }}>{item.class}</Text>
                        <InputComponent style={{borderWidth:1,
                        width: WIDTH*0.3}} 
                        key={item.id} value={fees?.[item.value]} onChangeText={text => handleChangeForm(item.value,text)} number={item.number}
                        height={HEIGHT*0.055} componentWidth={WIDTH*0.3} marginTop={HEIGHT*0.006}/>
                        </View>
                    ))}
                     {error && <Text style={{ color: setColors.errorRed, fontWeight: '600', marginTop: HEIGHT*0.005, textAlign: 'right', marginRight: WIDTH*0.015}}>{error}</Text> }

                    <ButtonComponent title={fees ? 'EDIT' : 'ADD'} onButtonPress={onFeesFn}/>
                </ScrollView>

        </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default FeesScreen