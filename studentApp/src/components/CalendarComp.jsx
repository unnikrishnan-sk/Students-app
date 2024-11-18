import React from 'react'
import { Text, View } from 'react-native'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import moment from 'moment'

const CalendarComp = ({data}) => {
    const { id, date, month, eventAdded, desc } = data;
    const constant = { EXAM: 'Exam', EVENT: 'Event', MONTH: 'MMM', DATE: 'DD' }

  return (
    <>
    <View style={{ paddingVertical: HEIGHT*0.007, flexDirection: 'row' }}>
        <View style={{ height: HEIGHT*0.07, width: HEIGHT*0.07, borderRadius: HEIGHT*0.05, backgroundColor: setColors?.calendarRed, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: setColors?.white, fontSize: 17 }}>{moment(date)?.format(constant?.DATE)}</Text>
          <Text style={{ color: setColors?.white, fontSize: 11 }}>{moment(date)?.format(constant?.MONTH)?.toUpperCase()}</Text>
        </View>
        <View style={{ marginLeft: WIDTH*0.02, paddingHorizontal: WIDTH*0.03, paddingVertical: HEIGHT*0.005, width: WIDTH*0.75, borderRadius: HEIGHT*0.015, backgroundColor: desc===constant?.EVENT ? setColors?.calImpColor : setColors?.calImpGreenColor }}>
          <Text style={{ fontSize: 14, fontWeight: 700, color: setColors?.black }}>{eventAdded}</Text>
          <Text style={{ color: setColors?.gray, fontWeight: 500, fontSize: 13 }}>{desc}</Text>
        </View>
      </View>
      </>
  )
}

export default CalendarComp