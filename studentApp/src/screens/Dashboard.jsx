import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { adminDash } from '../contants/dummyData'
import DashboardComponent from '../components/DashboardComponent'
import { setColors } from '../contants/colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { adminlogout } from '../redux/slice'
import { getData } from '../http/api'

const Dashboard = () => {
  const isAdmin = useSelector((state)=>state?.isAdmin?.admin);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
    getNoticeData(); 
  },[])
  const getNoticeData = async () =>{
    try{
      const noticeDta = await getData('Notice');
    }catch(err){
      console.log("getNoticeData_Dashboard",err);
      
    }
    
}
  const constant = { STUDENT: 'studentslist', ATTENDANCE: 'attendance', NOTICE: 'notice', FEES: 'fees', CALENDARS: 'calendars', EXAM: 'exam' }
  const onClickDash = (route) => {
    if(route===constant?.FEES && !isAdmin){
      navigation.navigate('feedetails')
    }else if(route===constant?.NOTICE && !isAdmin){
      navigation.navigate('noticedetails')
    }else{
      navigation.navigate(route)
    }
  }
  const onLogout = () => {
    dispatch(adminlogout())
    navigation.navigate('login')
  }

  return (
  <View style={{ backgroundColor: setColors?.violetShade, height: HEIGHT }}>
    <ProfileNavbar />
    <View style={{ borderTopRightRadius: HEIGHT * 0.03, backgroundColor: setColors?.violetShade, paddingHorizontal: WIDTH * 0.05,
    }}>
      <FlatList 
      contentContainerStyle={{  }}
      columnWrapperStyle={{ justifyContent: 'space-between' }} 
      numColumns={3} data={adminDash} showsHorizontalScrollIndicator={false} renderItem={({ item }) => <DashboardComponent data={item} onClickDash={onClickDash}/>} keyExtractor={item => item?.id} />
    </View>
    <Text 
    onPress={()=>onLogout()}
    style={{ color: setColors?.white, textAlign: 'center', marginTop: HEIGHT*0.3 }}>Logout</Text>
  </View>
  )
}

export default Dashboard