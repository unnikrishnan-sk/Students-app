import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { studentDetails, studentList } from '../contants/dummyData'
import StudentList from '../components/StudentList'
import ButtonComponent from '../components/ButtonComponent'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addattendance } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'

const AttendanceScreen = () => {

  const [studentsList,setStudentsList] = useState([]);
  const [presentList,setPresentList] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("present list",presentList);
  

  useEffect(()=>{
    setStudentsList(studentList);
    console.log(studentList);
    
  },[])

  const pressedCheckbox = (id) => {
    console.log("pressed",id);
    if(presentList.includes(id)){
      setPresentList(presentList.filter(item=>item !== id))
    }else{
      setPresentList([...presentList,id])
    }
  }

  const handleMarkAttendance = () => {
    console.log("pressed mark");
    const currentDate = moment().format("YYYY-MM-DD")
    const attendanceData = {
      date: currentDate,
      presentStudents: presentList
    }
    dispatch(addattendance(attendanceData))
    navigation.navigate('dashboard')
    console.log("present",attendanceData);
    
  }

  return (
    <View style={{
      backgroundColor: setColors.white,
      height: HEIGHT
    }}>
      <ProfileNavbar backBtn={left_icon} title="Attendance"/>
      <View style={{
        borderTopRightRadius: HEIGHT*0.02,
        // borderWidth: 1,
        backgroundColor: setColors.white,
        // height: HEIGHT
      }}>
       <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: HEIGHT*0.02,
                backgroundColor: setColors.violetShade,
                paddingHorizontal: WIDTH*0.04,
                paddingVertical: HEIGHT*0.01
            }}>
            <Text style={{
                color: setColors.white,
                fontWeight: '500'
            }}>Students</Text>
            <Text style={{
                color: setColors.white,
                fontWeight: '500'
            }}>Roll No</Text>
            <Text style={{
                color: setColors.white,
                fontWeight: '500'
            }}>Action</Text>
            </View>

            <FlatList contentContainerStyle={{marginTop: HEIGHT*0.015, paddingHorizontal: WIDTH*0.04}} data={studentList ? studentList : []} ListEmptyComponent={()=> <Text>Data not available</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <StudentList data={item} pressedCheckbox={pressedCheckbox} attendance={true} presentList={presentList}/>} keyExtractor={item => item.id}/> 

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: HEIGHT*0.03
          }}>
            <ButtonComponent title="MARK" onButtonPress={handleMarkAttendance}/> 
            </View>

            {/* <Pressable style={{
              borderWidth: 1,
              // height: HEIGHT*0.04,
              alignItems: 'center',
              justifyContent: 'center'

            }}>
              <Text>Mark</Text>
            </Pressable>
         */}
      </View>
      
    </View>
  )
}

export default AttendanceScreen