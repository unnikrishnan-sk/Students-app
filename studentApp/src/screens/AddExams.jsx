import React, { useCallback, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { dropdown_icon, left_icon } from '../assets'
import InputComponent from '../components/InputComponent'
import { academicYearList, examDetails, examDurationList, totalMarksList } from '../contants/dummyData'
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

  console.log(durationValue,marksValue);
  console.log("error",error);
  console.log("date",examMain);
  

  const variable = {
    DURATION: 'duration',
    MARKS: 'marks' 
  }

  const handleSetDate = () => {
    console.log("pressed");
    
  }
  
  const handleChange = useCallback((item,type) => {
    // console.log(item);
    if(type===variable.DURATION) setDurationValue(item.value);
    else if(type === variable.MARKS) setMarksValue(item.value)
    setFocus(false);
  }, [setDurationValue, setMarksValue, setFocus]);

  const handleChangeForm = (key,value) => {
    examMain[key] = value;
    console.log(examMain);
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
          date: moment(examMain?.ExmDate).format('YYYY-MM-DD'),
          eventAdded: examMain?.subject,
          desc: 'Exam'
        }
        storeData('Exams',examMainDetails)
        storeData('Calendars',calendarData)
        dispatch(addexam(examMainDetails))
        dispatch(addevent(calendarData))
        navigation.navigate('exam')
    }
  }

  const onExamDateAdd = () => {
    setTimeDate(!timeDate)
    console.log("pressed");
    
  }

  const handleDateChange = (date) => {
    setExamMain(prevState => ({
      ...prevState,
      "ExmDate": moment(date).format('YYYY-MM-DD hh:mm')
    }
  ))
  }

  return (
    <View style={{
        backgroundColor: setColors.white,
        height: HEIGHT
    }}>
        <ProfileNavbar backBtn={left_icon} title={"Add Exams"}/>

        <View style={{
            // height: HEIGHT*0.1,
            borderTopRightRadius: HEIGHT*0.03,
            backgroundColor: setColors.white,
            // paddingHorizontal: WIDTH*0.05
        }}>
          <Text style={{
            textAlign: 'center',
            marginTop: HEIGHT*0.02,
            fontSize: 16,
            fontWeight: '600',
            color: setColors.black
          }}>Provide exam details to add Exams</Text>
           <View style={{
                // borderWidth: 1,
                borderRadius: HEIGHT*0.02,
                borderColor: setColors.gray,
                paddingHorizontal: WIDTH*0.05,
                paddingTop: HEIGHT*0.03
            }}>

           {examDetails.map((item)=>(
                 <InputComponent key={item.id} icon={item.icon} placeholder={item.name} marginTop={HEIGHT*0.01} onChangeText={text=>handleChangeForm(item.value,text)}/>
            ))}

            {/* {examDetails.map((item)=>( */}

            <View style={{
              flexDirection: 'row',
              // borderWidth: 1
            }}>
            <DropdownComponent data={examDurationList} title="Exam Duration" value={durationValue} focus={focus} setFocus={setFocus} handleChange={(item)=>handleChange(item, 'duration')} width={WIDTH*0.42} />

            <DropdownComponent data={totalMarksList} title="Total Marks" value={marksValue} focus={focus} setFocus={setFocus} handleChange={(item)=>handleChange(item,'marks')} width={WIDTH*0.4} marginLeft={WIDTH*0.075}/>
            </View>
            <Pressable 
            onPress={()=>onExamDateAdd()}
            style={{
              borderWidth: 2,
              width: WIDTH*0.42,
              height: HEIGHT*0.055,
              marginTop: HEIGHT*0.015,
              borderRadius: HEIGHT*0.015,
              borderColor: setColors.darkgrayShade,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row'
              // marginLeft: WIDTH*0.03
            }}>
              <Text style={{
                marginLeft: WIDTH*0.02,
                color: examMain?.ExmDate ? setColors.black :setColors.gray
              }}>{examMain?.ExmDate ? moment(examMain?.ExmDate).format('YYYY-MM-DD')  : 'Exam Date'}</Text>
              <Image style={{
                height: HEIGHT*0.025,
                width: HEIGHT*0.025,
                marginRight: WIDTH*0.02,
                tintColor: setColors.gray
              }} source={dropdown_icon}></Image>
            </Pressable>
            { timeDate &&  <View style={{
        // borderWidth: 1,
        // height: HEIGHT*0.1
      }}>
        <DatePicker mode='datetime' date={examMain?.ExmDate ? new Date(examMain.ExmDate) : new Date()} minimumDate={new Date()} onDateChange={handleDateChange} />
        <Pressable onPress={()=>setTimeDate(false)} 
          style={{ marginTop: HEIGHT * 0.02, backgroundColor: setColors.violetShade, padding: HEIGHT * 0.015, borderRadius: HEIGHT * 0.02, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: setColors.white,
              fontWeight: '700'
             }}>Set</Text>
        </Pressable>
      </View> }
            {/* <DropdownComponent data={examDurationList} title="Exam Date" value={durationValue} focus={focus} setFocus={setFocus} handleChange={(item)=>handleChange(item, 'duration')} width={WIDTH*0.42} /> */}
            {/* ))} */}
            <Text style={{ color: setColors.errorRed, fontWeight: '600', marginTop: HEIGHT*0.005,}}>{error}</Text>
            </View>
            <View style={{
              paddingHorizontal: WIDTH*0.05,
              marginTop: HEIGHT*0.08
            }}>
            <ButtonComponent title="APPROVE" onButtonPress={onHandleForm}/>
            </View>
            
        </View>

        
      {/* <Modal > */}
     
      {/* </Modal> */}
    </View>
  )
}

export default AddExams