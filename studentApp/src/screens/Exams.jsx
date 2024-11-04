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
    console.log(exams);

    useEffect(()=>{
        const unsubscribe = getExamsData();
        return () => unsubscribe;
    },[exams])

    const getExamsData = async () =>{
        const examDta = await getData('Exams');
        setExams(examDta)
        console.log("exams here",examDta);
    }

  return (
    <View style={{
        backgroundColor: setColors.white,
        height: HEIGHT,
        // borderWidth: 1
    }}>
        <ProfileNavbar backBtn={left_icon} title="Examination"/>
        <View style={{
            // borderWidth: 1
        }}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            // backgroundColor: setColors.white,
            paddingBottom: HEIGHT*0.35
        }}
        style={{
            // borderWidth:1,
            borderTopRightRadius: WIDTH*0.03,
            backgroundColor: '#FFFFFF',
            paddingTop: HEIGHT*0.02,
            paddingHorizontal: WIDTH*0.05
        }}>
            {/* <View style={{
                borderWidth: 1
            }}> */}
           { isAdmin && <Pressable 
            onPress={()=>navigation.navigate('addexam')}
            style={{
                // borderWidth: 1,
                paddingVertical: HEIGHT*0.01,
                width: WIDTH*0.25,
                alignItems: 'center',
                borderRadius: WIDTH*0.03,
                backgroundColor: setColors.violetShade,
                // marginLeft: WIDTH*0.05
            }}>
                <Text style={{
                    color: setColors.white,
                    fontWeight: '600'
                }}>Add Exams</Text>
            </Pressable> }

            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                marginTop: HEIGHT*0.02,
                color: setColors.violetShade
            }}>Examination List</Text>

<FlatList contentContainerStyle={{marginTop: HEIGHT*0.02, }} showsVerticalScrollIndicator={false} data={exams} ListEmptyComponent={()=> <Text>No Exams to show here</Text>}  showsHorizontalScrollIndicator={false} renderItem={({item}) => <ExamComp data={item} />} keyExtractor={item => item.id}/>

{/* </View> */}
        </ScrollView>
        </View>
        {/* <Text>Exams</Text> */}
    </View>
  )
}

export default Exams