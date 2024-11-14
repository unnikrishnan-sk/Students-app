import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { add_student_icon } from '../assets'
import { adminDash } from '../contants/dummyData'
import DashboardComponent from '../components/DashboardComponent'
import { setColors } from '../contants/colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { adminlogout } from '../redux/slice'
import { getData } from '../http/api'
import LocalNotification from '../../Notification'

const Dashboard = () => {

  const isAdmin = useSelector((state)=>state?.isAdmin?.admin);
  const [notices,setNotices] = useState();

  // console.log("isAdmin",isAdmin);
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
    getNoticeData();
    // LocalNotification(notices)
    
  },[])

  const getNoticeData = async () =>{
    const noticeDta = await getData('Notice');
    // LocalNotification(noticeDta)
    // setNotices(noticeDta[0].notice)
    // console.log("notices here",noticeDta[0].notice);
}


  const constant = {
    STUDENT: 'studentslist',
    ATTENDANCE: 'attendance',
    NOTICE: 'notice',
    FEES: 'fees',
    CALENDARS: 'calendars',
    EXAM: 'exam'
  }

  const onClickDash = (route) => {
    if(route===constant.FEES && !isAdmin){
      navigation.navigate('feedetails')
    }else if(route===constant.NOTICE && !isAdmin){
      navigation.navigate('noticedetails')
    }else{
      navigation.navigate(route)
    }
  }

  const onLogout = () => {
    console.log("isAdmin_logout",isAdmin);
    dispatch(adminlogout())
    navigation.navigate('login')
  }

  return (
  <View style={{
    backgroundColor: setColors.violetShade,
    height: HEIGHT,
    // flex: 1
  }}>
    <ProfileNavbar />
    <View style={{
      borderTopRightRadius: HEIGHT * 0.03,
      backgroundColor: setColors.violetShade,
      // borderWidth: 1,
      // paddingTop: HEIGHT * 0.05,
      paddingHorizontal: WIDTH * 0.05,
      // flexDirection: 'row',
      // justifyContent: 'space-between'
    }}>

      <FlatList 
      contentContainerStyle={{  }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        // paddingHorizontal: WIDTH*0.05
      }} 
      numColumns={3} data={adminDash} showsHorizontalScrollIndicator={false} renderItem={({ item }) => <DashboardComponent data={item} onClickDash={onClickDash}/>} keyExtractor={item => item.id} />
    </View>
    <Text 
    onPress={()=>onLogout()}
    style={{
      // alignItems: 'center',
      // justifyContent: 'flex-end',
      color: setColors.white,
      textAlign: 'center',
      marginTop: HEIGHT*0.3
    }}>Logout</Text>
  </View>
  )
}

export default Dashboard