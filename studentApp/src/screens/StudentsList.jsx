import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { classList } from '../contants/dummyData'
import StudentList from '../components/StudentList'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { setColors } from '../contants/colors'
import { useSelector } from 'react-redux'
import { filterData, getData } from '../http/api'
import DropdownComponent from '../components/DropdownComponent'

const StudentsList = () => {
    
    const [students,setStudents] = useState();
    const [value,setValue] = useState();
    const [focus,setFocus] = useState();
    const adminStatus = useSelector((state)=> state?.isAdmin?.admin )
    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = getStudentsData();
        return () => unsubscribe;
    },[])
    const getStudentsData = async () =>{
        try{
            const studentDta = await getData('Students');
            setStudents(studentDta)
        }catch(err){
            console.log("getStudentsData_StudentsList",err);
        }
    }
    const onStudentEdit = (name) => {
        if(name){
            const stud = students.filter(item => item.name===name)
            navigation.navigate('addstudent', {data: stud})
        }
    }
    const handleDropChange = async (key,newValue) => {
        try{
            const filterValue = newValue?.value;
            const filteredData = await filterData('Students','className',filterValue)
            setStudents(filteredData)
        }catch(err){
            console.log("handleDropChange_StudentsList",err);
        }   
    }

  return (
    <View style={{ height: HEIGHT, backgroundColor: setColors.white }}>
        <ProfileNavbar backBtn={left_icon} title={'Student List'}/>
        <View style={{ paddingTop: HEIGHT*0.005, backgroundColor: setColors.white, borderTopRightRadius: HEIGHT*0.03 }}>
            <View style={{ alignItems: 'flex-end', paddingHorizontal: WIDTH*0.04, flexDirection: 'row', justifyContent: 'space-between' }}>
            { adminStatus ? <Pressable 
            onPress={()=>navigation.navigate('addstudent')}
            style={{ paddingVertical: HEIGHT*0.01, width: WIDTH*0.2, alignItems: 'center', borderRadius: WIDTH*0.02, backgroundColor: setColors.violetShade, }}>
                <Text style={{ color: setColors.white, fontWeight: 600 }}>Add</Text>
            </Pressable> : null }
            <DropdownComponent data={classList} placeholderColor={setColors?.black} title="Sort According to Class" width={WIDTH*0.5} value={value} focus={focus} setFocus={setFocus} handleChange={(value)=>handleDropChange('selected',value)} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT*0.015, backgroundColor: setColors.violetShade, paddingHorizontal: WIDTH*0.04, paddingVertical: HEIGHT*0.01 }}>
            <Text style={{ color: setColors?.white, fontWeight: 500 }}>Students</Text>
            <Text style={{ color: setColors?.white, fontWeight: 500 }}>Class</Text>
            <Text style={{ color: setColors?.white, fontWeight: 500 }}>Roll No</Text>
            <Text style={{ color: setColors?.white, fontWeight: 500 }}>Action</Text>
            </View>
            <FlatList contentContainerStyle={{marginTop: HEIGHT*0.015, paddingHorizontal: WIDTH*0.04}} data={students} ListEmptyComponent={()=> <Text>Data not available</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <StudentList data={item} onStudentEdit={onStudentEdit} />} keyExtractor={item => item.id}/>  
        </View>
    </View>
  )
}

export default StudentsList