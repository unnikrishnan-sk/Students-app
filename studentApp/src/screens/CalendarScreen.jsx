import React, { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import ProfileNavbar from '../components/ProfileNavbar'
import { down_arrow_triangle, left_icon, up_arrow_triangle } from '../assets'
import { setColors } from '../contants/colors'
import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import CalendarComp from '../components/CalendarComp'
import moment from 'moment'
import { addevent } from '../redux/slice'
import RenderCustomHeader from '../components/RenderCustomHeader'
import { FadeInView } from '../contants/common'
import { getData, storeData } from '../http/api'

const CalendarScreen = () => {
  const [events,setEvents] = useState([]);
  const [selectedDate,setSelectedDate] = useState(new Date());
  const [selectedMonth,setSelectedMonth] = useState(null)
  const [monthChange,setMonthChange] = useState(moment().month())
  const [yearChange,setYearChange] = useState(moment().year())
  const [event,setEvent] = useState("");
  const [error,setError] = useState("");
  const [filteredEvents,setFilteredEvents] = useState();
  const [isAdmin, eventsRedux] = useSelector((state)=> [state?.isAdmin?.admin, state?.isAdmin?.event]);
  const dispatch = useDispatch();
  const currentDate = `${yearChange}-${String(monthChange +1)}`

  const constants = { EVENT: 'Event', EXAM: 'Exam', CALENDAR: 'Calendar' }

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
  }
  const renderAllEvents = () => {
    const initialEvents = events.filter(event => moment(event.date).format('MMM')===moment(currentDate).format('MMM'))
    setFilteredEvents(initialEvents);
  }
  const eventsOnSelectedDate = () => {
    const month = moment(selectedDate).format('MM')-1
    const year = moment(selectedDate).format('YYYY')
      setMonthChange(month)
      setYearChange(year)
    const filteredEvent = events.filter(event => event.date===moment(selectedDate).format('YYYY-MM-DD'))
    setFilteredEvents(filteredEvent)
  }
  const onHandleDayPress = (day) => {
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
      try{
        storeData('Calendars',calendarData)
        dispatch(addevent(calendarData))
      }catch(err){
        console.log("onCalendarAdd_CalenderScreen",err);
        
      }
      
    }
  }
  const markedDates = {
    [selectedDate]: {
    customStyles: {
    container: { backgroundColor: setColors.calendarRed, borderRadius: HEIGHT*0.03, alignItems: 'center', justifyContent: 'center'},
    text: { color: selectedDate ? setColors.white :setColors.black, fontWeight: 500}
    }
  }
}
events.forEach((event)=>{
  markedDates[event.date] = {
    marked: true,
    dotColor: event?.desc === constants.EVENT ? setColors.calendarRed : setColors.backgroundGreen,
    customStyles: {
      container: { borderRadius: HEIGHT*0.03, alignItems: 'center', justifyContent: 'center' },
      text: { color: selectedDate===event.date ? setColors.calendarRed : setColors.black, fontWeight: 500
      }
    }
  }
})
  handleOnMonthAdd = () => {
    if(Number(monthChange) === 11){
      setMonthChange(0);
      setYearChange(Number(yearChange)+1)
    }else{
      setMonthChange(Number(monthChange)+1)
    }
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
      <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: HEIGHT*0.01 }}>
    <View style={{ backgroundColor: setColors.white, height: HEIGHT, flex: 1 }}>
      <ProfileNavbar backBtn={left_icon} title={constants?.CALENDAR} upArrow={up_arrow_triangle} downArrow={down_arrow_triangle} calendar="calendar" year={yearChange} handleOnMonthAdd={handleOnMonthAdd} handleOnMonthSub={handleOnMonthSub}/>
      <View style={{ borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors.white, }}> 
      <Calendar markingType={'custom'} firstDay={1}
        style={{ backgroundColor: setColors.white, marginTop: HEIGHT*0.02 }}
        hideArrows={true}
        theme={{ textMonthFontSize: 16, monthTextColor: setColors.violetShade, textDayFontSize: 14, textDayFontWeight: 600, textMonthFontWeight: 500, calendarBackground: setColors.white, monthTextColor: setColors.black, WeekTextColor: setColors.black,  textSectionTitleFontWeight: 700, selectedDayTextColor: setColors.black, dayTextColor: setColors.black}}
        current={currentDate}
        key={currentDate}
        onDayPress={day => { onHandleDayPress(day)}}
        markedDates={markedDates} 
        renderHeader={()=>
        <RenderCustomHeader month={selectedMonth} monthChange={monthChange} yearChange={yearChange}/>
        }
        />
      </View>
      {isAdmin ? 
      <View style={{ borderColor: setColors.grayShade, paddingHorizontal: WIDTH*0.04, paddingBottom: HEIGHT*0.01 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <InputComponent marginTop={HEIGHT*0.01} componentWidth={WIDTH*0.4} height={HEIGHT*0.055} onChangeText={(text)=>onHandleTextChange(text)}/>
        <ButtonComponent buttonWidth={WIDTH*0.4} marginTop={HEIGHT*0.01} title={'Add Event'} onButtonPress={onCalendarAdd}/>
      </View>
      {error && <Text style={{ color: setColors.errorRed, fontWeight: 600, marginTop: HEIGHT*0.005,}}>{error}</Text>}
      </View> : null
      }
      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ paddingBottom: HEIGHT*0.05, borderTopWidth: 1, borderColor: setColors.grayShade }}>
        <Text style={{ marginLeft: WIDTH*0.04, marginTop: HEIGHT*0.02, fontSize: 15, fontWeight: 600, color: setColors.black }}>Events and Exams</Text>
      <FlatList contentContainerStyle={{marginTop: HEIGHT*0.02, paddingHorizontal: WIDTH*0.045, paddingBottom: HEIGHT*0.05}} showsVerticalScrollIndicator={false} data={filteredEvents} ListEmptyComponent={()=> <Text>No Event for the day</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => 
      <FadeInView duration='600'>
      <CalendarComp data={item} eventsOnSelectedDate={eventsOnSelectedDate}/>
      </FadeInView>
      } keyExtractor={item => item.id}/>
      </ScrollView>
    </View>
     </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CalendarScreen