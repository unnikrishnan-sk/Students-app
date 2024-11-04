import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { setColors } from '../contants/colors'
import { HEIGHT, WIDTH } from '../contants/dimensions'

const ExamComp = ({data}) => {

    const {duration,examName,subject,totalMarks,date } = data;

  return (
    <View style={{
        // borderWidth: 1,
        marginTop: HEIGHT*0.02,
        paddingHorizontal: WIDTH*0.05,
        paddingVertical: HEIGHT*0.01,
        backgroundColor: '#D4FFEA',
        borderRadius: HEIGHT*0.02,
        paddingVertical: HEIGHT*0.03
    }}>
        <Text style={{
            // marginTop: HEIGHT*0.01,
            fontWeight: '600',
            fontSize: 16,
            color: setColors.black
            // borderWidth: 1
        }}>{examName}</Text>
        <View style={{
            flexDirection: 'row',
            // justifyContent: 'space-between'
        }}>
        <Text style={{
            marginTop: HEIGHT*0.01,
            color: setColors.black,
            fontWeight: '500'
        }}>Subject: <Text style={{
            color: setColors.gray
        }}> {subject}</Text></Text>
         <Text style={{
            marginTop: HEIGHT*0.01,
            marginLeft: WIDTH*0.05,
            color: setColors.black,
            fontWeight: '500'
        }}>Date: <Text style={{
            color: setColors.gray
        }}> {date}</Text></Text>
        
        </View>
        <View style={{
            flexDirection: 'row',
        }}>
         <Text style={{
            marginTop: HEIGHT*0.01,
            color: setColors.black,
            fontWeight: '500'
        }}>Max Marks: <Text style={{
            color: setColors.gray
        }}> {totalMarks}</Text></Text>
        <Text style={{
            marginTop: HEIGHT*0.01,
            marginLeft: WIDTH*0.03,
            color: setColors.black,
            fontWeight: '500'
        }}>Duration: <Text style={{
            color: setColors.gray
        }}> {duration}</Text></Text>
       
        </View>
        <Pressable style={{
            // borderWidth: 1,
            marginTop: HEIGHT*0.02,
            width: WIDTH*0.3,
            alignItems: 'center',
            borderRadius: HEIGHT*0.02,
            paddingVertical: HEIGHT*0.005,
            backgroundColor: setColors.calendarRed
        }}>
            <Text style={{
                color: setColors.white,
            }}>Start Tests</Text>
        </Pressable>
    </View>
  )
}

export default ExamComp