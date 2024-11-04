import React, { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import ProfileNavbar from '../components/ProfileNavbar'
import { down_arrow, left_icon, up_arrow } from '../assets'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import CalendarComp from '../components/CalendarComp'
import { calendarDet } from '../contants/dummyData'
import StudentList from '../components/StudentList'
import moment from 'moment'
import { addevent } from '../redux/slice'
import { useNavigation } from '@react-navigation/native'
import RenderCustomHeader from '../components/RenderCustomHeader'
import { FadeInView, SlideIn } from '../contants/common'
import { getData, storeData } from '../http/api'

const CalendarScreen = () => {

  const [events,setEvents] = useState([]);
  const [selectedDate,setSelectedDate] = useState(new Date());
  const [selectedMonth,setSelectedMonth] = useState(null)
  const [monthChange,setMonthChange] = useState(moment().month())
  const [yearChange,setYearChange] = useState(moment().year())
  const [event,setEvent] = useState("");
  const [error,setError] = useState("");
  const [calendarMonth,setCalendarMonth] = useState(null);
  const monthRef = useRef(null);
  const [filteredEvents,setFilteredEvents] = useState();
  const [isAdmin, eventsRedux] = useSelector((state)=> [state?.isAdmin?.admin, state?.isAdmin?.event]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDate = `${yearChange}-${String(monthChange +1)}`

  const constants = {
    EVENT: 'Event',
    EXAM: 'Exam'
  }

  useEffect(()=>{
    const unsubscribe = getCalendarData();
    renderAllEvents()
    return () => unsubscribe;
  },[])

  

  useEffect(()=>{
    eventsOnSelectedDate()
  },[selectedDate])

  useEffect(()=>{
    renderAllEvents()
  },[monthChange,events])

  const getCalendarData = async () =>{
    const calendarDta = await getData('Calendars');
    setEvents(calendarDta)
    // console.log("calendar here",calendarDta);
}

  const renderAllEvents = () => {
    // console.log("selectedMonth_calendar",moment(selectedDate).format('MMM'));
    
    const initialEvents = events.filter(event => moment(event.date).format('MMM')===moment(selectedDate).format('MMM'))
    // console.log("initial Events",initialEvents);
    
    setFilteredEvents(initialEvents);
  }

  const eventsOnSelectedDate = () => {
    // console.log("month_change_calendar",monthChange);
    // console.log("events_here",events);
    const month = moment(selectedDate).format('MM')-1
    const year = moment(selectedDate).format('YYYY')
    // console.log("month_inside_calendar",month, year);
      setMonthChange(month)
      setYearChange(year)
    // console.log("selectedDate",moment(selectedDate).format('MM')-1);
    const filteredEvent = events.filter(event => event.date===moment(selectedDate).format('YYYY-MM-DD'))
    // console.log("calendar_filtered_events",filteredEvent);
    
    setFilteredEvents(filteredEvent)
  }

  const onHandleDayPress = (day) => {
    // console.log("day",day);
    
    setSelectedDate(day.dateString)
}

onHandleTextChange = (text) => {
    setEvent(text)
    setError("")
}

  const onCalendarAdd = () => {
    if(event=="") setError("Add an event") 
    else{
      const calendarData = {
        date: moment(selectedDate).format('YYYY-MM-DD'),
        eventAdded: event,
        desc: 'Event'
      }
      storeData('Calendars',calendarData)
      dispatch(addevent(calendarData))
      // console.log("event", calendarData);
    }
  }

  const markedDates = {
    [selectedDate]: {
    customStyles: {
    container: { backgroundColor: setColors.calendarRed, 
      borderRadius: HEIGHT*0.03, 
      alignItems: 'center', 
      justifyContent: 'center'},
    text: { color: selectedDate ? setColors.white :setColors.black, 
      fontWeight: '500'}
    }
  }
}

events.forEach((event)=>{
  markedDates[event.date] = {
    marked: true,
    dotColor: event?.desc === constants.EVENT ? setColors.calendarRed : setColors.backgroundGreen,
    customStyles: {
      container: {
        borderRadius: HEIGHT*0.03,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: selectedDate===event.date ? setColors.calendarRed : setColors.black,
        fontWeight: '500'
      }
    }
  }
})

// const onHandleMonthChange = (month) => {
//   console.log("dateString",month);
//   if(monthChange === 11){
//     setMonthChange(0);
//     setYearChange(yearChange+1)
//   }else{
//     setMonthChange(monthChange+1)
//   }
//   setSelectedMonth(moment(month?.dateString).format('MMM'))
//   setMonthChange(moment(month?.dateString).format('MMMM'))
//   console.log("setMonthChange",setMonthChange);
//   console.log("month",moment(month?.dateString).format('MMM'));
// }

  handleOnMonthAdd = () => {
    // monthRef(moment(selectedDate).format('YYYY-MM-DD'))
    // console.log("moment month here",moment(selectedDate).format('YYYY-MM-DD'));
    // console.log("currentData_calendar",currentDate);

    // console.log("selectedDate_calendar",moment(selectedDate).format('MMM'));
    
    
    if(Number(monthChange) === 11){
      setMonthChange(0);
      setYearChange(Number(yearChange)+1)
    }else{
      setMonthChange(Number(monthChange)+1)
    }
    // console.log("month change here",monthChange);
  }

  handleOnMonthSub = () => {
    if(Number(monthChange) === 0){
      setMonthChange(11);
      setYearChange(Number(yearChange)-1)
    }else{
      setMonthChange(Number(monthChange)-1)
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
    <View style={{
      backgroundColor: setColors.white,
      // height: HEIGHT
      flex: 1
    }}>
       <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        paddingBottom: HEIGHT*0.01
    }}>
      <ProfileNavbar backBtn={left_icon} title={'Calendar'} upArrow={up_arrow} downArrow={down_arrow} calendar="calendar" year={yearChange} handleOnMonthAdd={handleOnMonthAdd} handleOnMonthSub={handleOnMonthSub}/>
      <View style={{
        borderTopRightRadius: HEIGHT*0.03,
        // borderWidth: 1,
        backgroundColor: setColors.white,
        // paddingHorizontal: WIDTH*0.05
      }}>
        
      <Calendar markingType={'custom'} firstDay={1}
        style={{ backgroundColor: setColors.white, marginTop: HEIGHT*0.04 }}
        hideArrows={true}
        theme={{ 
        textMonthFontSize: 16, 
        monthTextColor: setColors.violetShade,
        textDayFontSize: 15, 
        textDayFontWeight: '600', 
        textMonthFontWeight: '500', 
        calendarBackground: setColors.white,  
        monthTextColor: setColors.black, 
        WeekTextColor: setColors.black, 
        textSectionTitleFontWeight: '700',
        selectedDayTextColor: setColors.black,
        dayTextColor: setColors.black}}
        // minDate={new Date('YYYY-MM-DD')}
        // ref={monthRef}
        current={currentDate}
        key={currentDate}
        // onMonthChange={onHandleMonthChange}
        onDayPress={day => { onHandleDayPress(day)}}
        markedDates={markedDates} 
        // renderArrow={onRenderArrow}
        renderHeader={()=>
        <RenderCustomHeader month={selectedMonth} monthChange={monthChange} yearChange={yearChange}/>
        }
        />
      </View>

      {isAdmin && 
      <View style={{
        borderWidth: 1,
        borderColor: setColors.grayShade,
        paddingHorizontal: WIDTH*0.05,
        // paddingVertical: HEIGHT*0.02
        paddingBottom: HEIGHT*0.01
      }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <InputComponent marginTop={HEIGHT*0.01} componentWidth={WIDTH*0.4} height={HEIGHT*0.06} onChangeText={(text)=>onHandleTextChange(text)}/>
        <ButtonComponent buttonWidth={WIDTH*0.4} marginTop={HEIGHT*0.01} title={'Add Event'} onButtonPress={onCalendarAdd}/>
      </View>
      {error && <Text style={{ color: setColors.errorRed, fontWeight: '600', marginTop: HEIGHT*0.005,}}>{error}</Text>}
      </View>
      
      }
      </ScrollView>
     
      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{
        marginBottom: HEIGHT*0.02
      }}>
      <FlatList contentContainerStyle={{marginTop: HEIGHT*0.02, paddingHorizontal: WIDTH*0.05, paddingBottom: HEIGHT*0.02}} showsVerticalScrollIndicator={false} data={filteredEvents} ListEmptyComponent={()=> <Text>No Event for the day</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => 
      <FadeInView duration='600'>
      {/* <SlideIn initial={-100} final={0}> */}
      <CalendarComp data={item} eventsOnSelectedDate={eventsOnSelectedDate}/>
      {/* </SlideIn > */}
      </FadeInView>
      } keyExtractor={item => item.id}/>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  )
}

export default CalendarScreen