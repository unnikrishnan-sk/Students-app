import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { academicYearList, addFees, classList, genderList, sectionList, studentDetails, studentList } from '../contants/dummyData'
import InputComponent from '../components/InputComponent'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import ButtonComponent from '../components/ButtonComponent'
import { setColors } from '../contants/colors'
import StudentList from '../components/StudentList'
import DropdownComponent from '../components/DropdownComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addstudents } from '../redux/slice'
import isEmpty from 'lodash/isEmpty'
import { storeData, updateData } from '../http/api'

const AddStudent = () => {

    const students = useSelector((state)=>state.isAdmin)
    const [studentData,setStudentData] = useState({
        name:'',className:'',section:'',gender:'',acadYear:'',rollNo:'', gurdName:'',contactNo:''
    });
    const [value,setValue] = useState()
    const [error,setError] = useState({});
    const [focus,setFocus] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute()
    const { data } = route.params || {};
    console.log("data",data);
    
    
    console.log(students);
    
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
            console.log("pressed");
        console.log("studentData",studentData);
        if(data){
            console.log("edited data",data[0].id);
            updateData('Students',data[0]?.id,studentData)
        }else{
            console.log("added data");
            storeData('Students',studentData)
            dispatch(addstudents(studentData));
        }
        
        navigation.navigate('studentslist');
        let error = {}
        }
        
    }

    const validateLoginForm = () => {
        console.log("studentData",studentData);
        
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
    <View style={{
        backgroundColor: setColors.white,
        // height: HEIGHT
        flex: 1
    }}>
        <ProfileNavbar backBtn={left_icon} title={'Add Student'}/>

        <View style={{
            backgroundColor: setColors.white,
            borderTopRightRadius: HEIGHT*0.03,
            paddingBottom: HEIGHT*0.12
        }}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        paddingBottom: HEIGHT*0.1,
        borderTopRightRadius: HEIGHT*0.03,
        backgroundColor: setColors.white
    }}
    style={{}}>
            <View key={studentDetails.id}
            style={{
                marginTop: HEIGHT*0.025,
                paddingHorizontal: WIDTH*0.05
            }}>
            <View style={{
                borderRadius: HEIGHT*0.02,
                borderColor: setColors.gray
            }}>
            <InputComponent key={studentDetails.id} icon={studentDetails.icon} placeholder={"Enter Name"} marginTop={HEIGHT*0.01} number={studentDetails.number} onChangeText={text=>handleChangeForm("name",text)} value={studentData.name} error={error?.name}/>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
            <DropdownComponent data={classList} title="Enter Class" value={studentData.className} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('className',value)} width={WIDTH*0.4}/>
            <DropdownComponent data={sectionList} title="Enter Section" value={studentData.section} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('section',value)} width={WIDTH*0.4} marginLeft={WIDTH*0.1}/>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
            <DropdownComponent data={genderList} title="Enter Gender" value={studentData.gender} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('gender',value)} width={WIDTH*0.4}/>
            <DropdownComponent data={academicYearList} title="Academic Year" value={studentData.acadYear} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('acadYear',value)} width={WIDTH*0.4} marginLeft={WIDTH*0.1}/>
            </View>

            {studentDetails.map((item)=>(
                 <InputComponent key={item.id} icon={item.icon} placeholder={item.name} marginTop={HEIGHT*0.01} number={item.number} onChangeText={text=>handleChangeForm(item.value,text)} value={studentData[item.value]} error={error?.[item.value]}/>
            ))}
            </View>
            <View style={{
                paddingHorizontal: WIDTH*0.05
            }}>
            <ButtonComponent title={data ? 'Edit' : 'Add'} onButtonPress={handleAddStudent}/>
            </View>
    </ScrollView>
    </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default AddStudent