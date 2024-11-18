import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { academicYearList, classList, genderList, sectionList, studentDetails } from '../contants/dummyData'
import InputComponent from '../components/InputComponent'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import ButtonComponent from '../components/ButtonComponent'
import { setColors } from '../contants/colors'
import DropdownComponent from '../components/DropdownComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addstudents } from '../redux/slice'
import isEmpty from 'lodash/isEmpty'
import { storeData, updateData } from '../http/api'

const AddStudent = () => {
    const [studentData,setStudentData] = useState({
        name:'',className:'',section:'',gender:'',acadYear:'',rollNo:'', gurdName:'',contactNo:''
    });
    const [error,setError] = useState({});
    const [focus,setFocus] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute()
    const { data } = route.params || {};

    const constant = { EDIT: 'Edit', ADD: 'Add', ACADEMIC_YEAR: 'Academic Year', ENTER_GENDER: 'Enter Gender', ENTER_SECTION: 'Enter Section', ENTER_CLASS: 'Enter Class', ADD_STUDENT: 'Add Student' }
    
    useEffect(()=>{
        if(data && data.length>0){
            setStudentData(data[0])
        }
    },[data])
    const handleDropChange = useCallback((key,newValue) => {
        setStudentData(prevState => ({
            ...prevState,
            [key]: newValue.value
        }))
        setFocus(false);
      }, []);
      const handleChangeForm = (key,newValue) => {
         setStudentData(prevState => ({
            ...prevState,
            [key]: newValue
        }))
        setError('')  
    }
    const handleAddStudent = async () => {
        const valid = validateLoginForm();
        if(valid){
        if(data){
            try{
                updateData('Students',data[0]?.id,studentData)
            }catch(err){
                console.log("handleAddStudent_AddStudent_update",err); 
            }   
        }else{
            try{
                storeData('Students',studentData)
                dispatch(addstudents(studentData));
            }catch(err){
                console.log("handleAddStudent_AddStudent_store",err);
            }
        }
        navigation.navigate('studentslist');
        let error = {}
        } 
    }

    const validateLoginForm = () => {
        const {acadYear,contactNo,gender,gurdName,name,rollNo,section,className} = studentData;
        let error = {};
        if(isEmpty(acadYear)) error.acadYear = 'Enter Academic Year'
        if(isEmpty(contactNo)) error.contactNo = 'Enter Contact Number'
        if(isEmpty(gender)) error.gender = 'Enter Gender'
        if(isEmpty(gurdName)) error.gurdName = 'Enter Guardian Name'
        if(isEmpty(name)) error.name = 'Enter Name'
        if(isEmpty(rollNo)) error.rollNo = 'Enter Roll Number'
        if(isEmpty(section)) error.gender = 'Enter Section'
        if(isEmpty(className)) error.class = 'Enter Class'
        setError({...error})
        return isEmpty(error)
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    <View style={{ backgroundColor: setColors.white, flex: 1
    }}>
        <ProfileNavbar backBtn={left_icon} title={constant?.ADD_STUDENT}/>
        <View style={{ backgroundColor: setColors.white, borderTopRightRadius: HEIGHT*0.03, paddingBottom: HEIGHT*0.12 }}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: HEIGHT*0.1, borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors.white }}>
            <View key={studentDetails?.id}
            style={{ marginTop: HEIGHT*0.025, paddingHorizontal: WIDTH*0.05 }}>
            <View style={{ borderRadius: HEIGHT*0.02, borderColor: setColors?.gray }}>
            <InputComponent key={studentDetails?.id} icon={studentDetails?.icon} placeholder={"Enter Name"} marginTop={HEIGHT*0.01} number={studentDetails?.number} onChangeText={text=>handleChangeForm("name",text)} value={studentData?.name} error={error?.name}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <DropdownComponent data={classList} title={constant?.ENTER_CLASS} value={studentData?.className} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('className',value)} width={WIDTH*0.4}/>
            <DropdownComponent data={sectionList} title={constant?.ENTER_SECTION} value={studentData?.section} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('section',value)} width={WIDTH*0.4} marginLeft={WIDTH*0.1}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <DropdownComponent data={genderList} title={constant?.ENTER_GENDER} value={studentData?.gender} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('gender',value)} width={WIDTH*0.4}/>
            <DropdownComponent data={academicYearList} title={constant?.ACADEMIC_YEAR} value={studentData?.acadYear} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('acadYear',value)} width={WIDTH*0.4} marginLeft={WIDTH*0.1}/>
            </View>
            {studentDetails.map((item)=>(
                 <InputComponent key={item?.id} icon={item?.icon} placeholder={item?.name} marginTop={HEIGHT*0.01} number={item?.number} onChangeText={text=>handleChangeForm(item?.value,text)} value={studentData[item?.value]} error={error?.[item?.value]}/>
            ))}
            </View>
            <View style={{ paddingHorizontal: WIDTH*0.05 }}>
            <ButtonComponent title={data ? constant?.EDIT : constant?.ADD} onButtonPress={handleAddStudent}/>
            </View>
    </ScrollView>
    </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default AddStudent