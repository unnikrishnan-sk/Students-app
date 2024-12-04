import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/SplashScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./screens/Login";
import Verification from "./screens/Verification";
import Dashboard from "./screens/Dashboard";
import StudentsList from "./screens/StudentsList";
import AddStudent from "./screens/AddStudent";
import ForgotPassword from "./screens/ForgotPassword";
import CalendarScreen from "./screens/CalendarScreen";
import FeesScreen from "./screens/FeesScreen";
import Exams from "./screens/Exams";
import AddExams from "./screens/AddExams";
import AttendanceScreen from "./screens/AttendanceScreen";
import FeeDetails from "./screens/FeeDetails";
import NoticeScreen from "./screens/NoticeScreen";
import NoticeDetails from "./screens/NoticeDetails";
import Sudoku from "./screens/Sudoku";
import RulesComponent from "./components/RulesComponent";
import Animations from "./screens/Animations";
import Carousal from "./screens/Carousal";
import ParallaxCarousal from "./screens/ParallaxCarousal";
// import Note from "./screens/Note";


const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='parallaxcarousal' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='splash' component={SplashScreen} />
                <Stack.Screen name='login' component={Login} />
                <Stack.Screen name='verification' component={Verification} />
                <Stack.Screen name='dashboard' component={Dashboard} />
                <Stack.Screen name='studentslist' component={StudentsList} />
                <Stack.Screen name='addstudent' component={AddStudent} />
                <Stack.Screen name='forgotpass' component={ForgotPassword} />
                <Stack.Screen name='createpass' component={ForgotPassword} />
                <Stack.Screen name='calendars' component={CalendarScreen} />
                <Stack.Screen name='fees' component={FeesScreen} />
                <Stack.Screen name='exam' component={Exams} />
                <Stack.Screen name='addexam' component={AddExams} />
                <Stack.Screen name='attendance' component={AttendanceScreen} />
                <Stack.Screen name='feedetails' component={FeeDetails} />
                <Stack.Screen name='notice' component={NoticeScreen} />
                <Stack.Screen name='noticedetails' component={NoticeDetails} />
                <Stack.Screen name='sudoku' component={Sudoku} />
                <Stack.Screen name='rules' component={RulesComponent} />
                <Stack.Screen name='animations' component={Animations} />
                <Stack.Screen name='carousal' component={Carousal} />
                <Stack.Screen name='parallaxcarousal' component={ParallaxCarousal} />
                {/* <Stack.Screen name='note' component={Note} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router