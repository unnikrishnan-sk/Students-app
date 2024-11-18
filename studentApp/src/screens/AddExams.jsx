import React, { useCallback, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { dropdown_icon, left_icon } from '../assets'
import InputComponent from '../components/InputComponent'
import { examDetails, examDurationList, totalMarksList } from '../contants/dummyData'
import DropdownComponent from '../components/DropdownComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useDispatch } from 'react-redux'
import { addevent, addexam } from '../redux/slice'
import isEmpty from 'lodash/isEmpty'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { storeData } from '../http/api'

const AddExams = () => {

  const [durationValue,setDurationValue] = useState();
  const [marksValue,setMarksValue] = useState();
  const [examMain,setExamMain] = useState([]);
  const [error,setError] = useState('');
  const [focus,setFocus] = useState();
  const [timeDate,setTimeDate] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const constant = { DURATION: 'duration', MARKS: 'marks', APPROVE: 'APPROVE', TIMEFORMAT: 'YYYY-MM-DD', EXAMDATE: 'Exam Date', EXAMDURATION: 'Exam Duration', TOTAL_MARKS: 'Total Marks', ADD_EXAMS: 'Add Exams'}
  
  const handleChange = useCallback((item,type) => {
    if(type===constant.DURATION) setDurationValue(item.value);
    else if(type === constant?.MARKS) setMarksValue(item.value)
    setFocus(false);
  }, [setDurationValue, setMarksValue, setFocus]);
  const handleChangeForm = (key,value) => {
    examMain[key] = value;
    setExamMain({...examMain})
    setError('')  
}
  const onHandleForm = () => {
    if(isEmpty(examMain.examName) || (isEmpty(examMain.subject)) || isEmpty(durationValue) || isEmpty(marksValue)) setError("Add all fields")
      else{
        const examMainDetails = {
          examName : examMain.examName,
          subject: examMain.subject,
          duration: durationValue,
          totalMarks: marksValue,
          date: examMain?.ExmDate
        }
        const calendarData = {
          date: moment(examMain?.ExmDate)?.format('YYYY-MM-DD'),
          eventAdded: examMain?.subject,
          desc: 'Exam'
        }
        try{
          storeData('Exams',examMainDetails)
          storeData('Calendars',calendarData)
          dispatch(addexam(examMainDetails))
          dispatch(addevent(calendarData))
          navigation.navigate('exam')
        }catch(err){
          console.log("onHandleForm_AddExams",err);
        }
    }
  }
  const onExamDateAdd = () => {
    setTimeDate(!timeDate)
  }
  const handleDateChange = (date) => {
    setExamMain(prevState => ({
      ...prevState,
      "ExmDate": moment(date).format('YYYY-MM-DD hh:mm')
    }
  ))
  }

  return (
    <View style={{ backgroundColor: setColors.white, height: HEIGHT }}>
        <ProfileNavbar backBtn={left_icon} title={constant?.ADD_EXAMS}/>
        <View style={{ borderTopRightRadius: HEIGHT*0.03, backgroundColor: setColors.white, }}>
          <Text style={{ textAlign: 'center', marginTop: HEIGHT*0.02, fontSize: 16, fontWeight: 600, color: setColors.black }}>Provide exam details to add Exams</Text>
           <View style={{ borderRadius: HEIGHT*0.02, borderColor: setColors.gray, paddingHorizontal: WIDTH*0.05, paddingTop: HEIGHT*0.03 }}>
           {examDetails.map((item)=>(
                 <InputComponent key={item.id} icon={item.icon} placeholder={item.name} marginTop={HEIGHT*0.01} onChangeText={text=>handleChangeForm(item.value,text)}/>
            ))}
            <View style={{ flexDirection: 'row', }}>
            <DropdownComponent data={examDurationList} title={constant?.EXAMDURATION} value={durationValue} focus={focus} setFocus={setFocus} handleChange={(item)=>handleChange(item, 'duration')} width={WIDTH*0.42} />
            <DropdownComponent data={totalMarksList} title={constant?.TOTAL_MARKS} value={marksValue} focus={focus} setFocus={setFocus} handleChange={(item)=>handleChange(item,'marks')} width={WIDTH*0.4} marginLeft={WIDTH*0.075}/>
            </View>
            <Pressable 
            onPress={()=>onExamDateAdd()}
            style={{ borderWidth: 2, width: WIDTH*0.42, height: HEIGHT*0.055, marginTop: HEIGHT*0.015, borderRadius: HEIGHT*0.015, borderColor: setColors.darkgrayShade, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={{ marginLeft: WIDTH*0.02, color: examMain?.ExmDate ? setColors.black :setColors.gray }}>{examMain?.ExmDate ? moment(examMain?.ExmDate).format(constant?.TIMEFORMAT)  : constant?.EXAMDATE}</Text>
              <Image style={{ height: HEIGHT*0.025, width: HEIGHT*0.025, marginRight: WIDTH*0.02, tintColor: setColors.gray }} source={dropdown_icon}></Image>
            </Pressable>
            { timeDate &&  <View>
        <DatePicker mode='datetime' date={examMain?.ExmDate ? new Date(examMain?.ExmDate) : new Date()} minimumDate={new Date()} onDateChange={handleDateChange} />
        <Pressable onPress={()=>setTimeDate(false)} 
          style={{ marginTop: HEIGHT * 0.02, backgroundColor: setColors.violetShade, padding: HEIGHT * 0.015, borderRadius: HEIGHT * 0.02, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: setColors.white,
              fontWeight: 700
             }}>Set</Text>
        </Pressable>
      </View> }
            <Text style={{ color: setColors?.errorRed, fontWeight: 600, marginTop: HEIGHT*0.005,}}>{error}</Text>
            </View>
            <View style={{ paddingHorizontal: WIDTH*0.05, marginTop: HEIGHT*0.08
            }}>
            <ButtonComponent title={constant?.APPROVE} onButtonPress={onHandleForm}/>
            </View>
        </View>
    </View>
  )
}

export default AddExams