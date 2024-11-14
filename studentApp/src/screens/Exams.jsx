import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import ProfileNavbar from '../components/ProfileNavbar'
import { left_icon } from '../assets'
import { HEIGHT, WIDTH } from '../contants/dimensions'
import { setColors } from '../contants/colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import ExamComp from '../components/ExamComp'
import { getData } from '../http/api'

const Exams = () => {
    const [exams,setExams] = useState();
    const [isAdmin, examRedux] = useSelector((state)=> [state?.isAdmin?.admin, state?.isAdmin?.exam])
    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = getExamsData();
        return () => unsubscribe;
    },[exams])

    const getExamsData = async () =>{
        const examDta = await getData('Exams');
        setExams(examDta)
    }

  return (
    <View style={{ backgroundColor: setColors.white,height: HEIGHT }}>
        <ProfileNavbar backBtn={left_icon} title="Examination"/>
        <View>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: HEIGHT*0.35 }}
        style={{ borderTopRightRadius: WIDTH*0.03, backgroundColor: '#FFFFFF', paddingTop: HEIGHT*0.005, paddingHorizontal: WIDTH*0.04 }}>
           { isAdmin && <Pressable 
            onPress={()=>navigation.navigate('addexam')}
            style={{ paddingVertical: HEIGHT*0.01, width: WIDTH*0.25, alignItems: 'center', borderRadius: WIDTH*0.03, backgroundColor: setColors.violetShade, }}>
                <Text style={{ color: setColors.white, fontWeight: '600' }}>Add Exams</Text>
            </Pressable> }
            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: HEIGHT*0.01, color: setColors.violetShade }}>Examination List</Text>
        <FlatList contentContainerStyle={{marginTop: HEIGHT*0.005, }} showsVerticalScrollIndicator={false} data={exams} ListEmptyComponent={()=> <Text>No Exams to show here</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <ExamComp data={item} />} keyExtractor={item => item.id}/>
        </ScrollView>
        </View>
    </View>
  )
}

export default Exams