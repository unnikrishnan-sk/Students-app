import React from 'react'
import { Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import moment from 'moment'
import { FadeInView, SlideIn, SlideInCalendar } from '../contants/common'

const CalendarComp = ({data}) => {

    const { id, date, month, eventAdded, desc } = data;
// console.log("renderData_calendarComp",data);

    const constant = {
      EXAM: 'Exam',
      EVENT: 'Event'
    }

  return (
    <>
    {/* // <SlideIn initial={-100} final={0}> */}
    {/* <FadeInView duration='1000'> */}
    <View style={{
        // paddingHorizontal: WIDTH*0.05,
        paddingVertical: HEIGHT*0.02,
        flexDirection: 'row'
      }}>
        <View style={{
          // borderWidth: 1,
          height: HEIGHT*0.08,
          width: HEIGHT*0.08,
          borderRadius: HEIGHT*0.05,
          backgroundColor: setColors.calendarRed,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: setColors.white,
            fontSize: 20
          }}>{moment(date).format('DD')}</Text>
          <Text style={{
            color: setColors.white,
            fontSize: 12
          }}>{moment(date).format('MMM').toUpperCase()}</Text>
        </View>
        <View style={{
          // borderWidth: 1,
          marginLeft: WIDTH*0.03,
          paddingHorizontal: WIDTH*0.04,
          paddingVertical: HEIGHT*0.005,
          width: WIDTH*0.73,
          borderRadius: HEIGHT*0.015,
          backgroundColor: desc===constant.EVENT ? setColors.calImpColor : setColors.calImpGreenColor
          // width: WIDTH*0.6
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '700',
            color: setColors.black
          }}>{eventAdded}</Text>
          <Text style={{
            color: setColors.gray,
            fontWeight: '500',
            fontSize: 13
          }}>{desc}</Text>
        </View>
      </View>
      {/* </FadeInView> */}
      {/* // </SlideIn> */}
      </>
  )
}

export default CalendarComp