import  React from 'react';
import { } from 'react-native';
import SignupScreen  from './Components/SignupScreen';
import LoginScreen  from './Components/LoginScreen';
import Home  from './Components/Home'
import Home2 from './Components/Home2'
import ProductDetails from './Components/productdetails'
import ViewCart from './Components/ViewCart'
import Checkout from './Components/Checkout'
import FAQS from './Components/FAQS'
import Drawer from './Components/drawer'
import Admindash from './Components/AdminDashboard'
import Admineditform from './Components/Admineditform';
import SelectUser from './Components/SelectUser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Adminaddstudent from './Components/Adminaddstudent';
import Admineditstudent from './Components/Admineditstudent';
import Admindeletestudent from './Components/Admindeletestudent';
import StudentAgeRecord from './Components/StudentAgeRecord';
import ResultSheet from './Components/ResultSheet';
import AdminuploadTimeTable from './Components/AdminUploadTimeTable';
import StudentDashboard from './Components/StudentDashboard';
import StudentTimeTable from './Components/studentTimeTable';
import StudentViewSyllabus from './Components/studentSyllabus';
import AdminAddTeacher from './Components/Adminaddteacher';
import TeacherAddMarks from './Components/TeacheraddMarks';
import "./firebase"
import AdminUploadClassSyllabus from './Components/AdminUploadClassSyllabus';
import TeacherDashboard from './Components/TeacherDashboard';
import TeacherAddMarks2 from './Components/TeacheraddMarks2';
import TeacherManageMarksScreen from './Components/TeacherManageMarks';
import ViewStudentMarks from './Components/StudentViewMarks';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    //<Home2/>
    //<Adminedititem/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='SelectedUser' component={SelectUser}></Stack.Screen>
        <Stack.Screen name='AdminDashboard' component={Admindash}></Stack.Screen>
        <Stack.Screen name='StudentAgeRecord' component={StudentAgeRecord}></Stack.Screen>
        <Stack.Screen name='ResultSheet' component={ResultSheet}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignupScreen}></Stack.Screen>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='Checkout' component={Checkout}></Stack.Screen>
        <Stack.Screen name='Home2' component={Home2}></Stack.Screen>
        <Stack.Screen name='Cart' component={ViewCart}></Stack.Screen> 
        <Stack.Screen name='productdetails' component={ProductDetails}></Stack.Screen> 
        <Stack.Screen name='Menu' component={Drawer}></Stack.Screen>
        <Stack.Screen name='FAQS' component={FAQS}></Stack.Screen>
        <Stack.Screen name='Adminaddstudent' component={Adminaddstudent}></Stack.Screen>
        <Stack.Screen name='Adminaddteacher' component={AdminAddTeacher}></Stack.Screen>
        <Stack.Screen name='Admineditstudent' component={Admineditstudent}></Stack.Screen>
        <Stack.Screen name='Admindeletestudent' component={Admindeletestudent}></Stack.Screen>
        <Stack.Screen name='Admineditform' component={Admineditform}></Stack.Screen>
        <Stack.Screen name='AdminuploadTimeTable' component={AdminuploadTimeTable}></Stack.Screen>
        <Stack.Screen name='AdminUploadClassSyllabus' component={AdminUploadClassSyllabus}></Stack.Screen>
        <Stack.Screen name='StudentDashboard' component={StudentDashboard}></Stack.Screen>
        <Stack.Screen name='StudentViewTimeTable' component={StudentTimeTable}></Stack.Screen>
        <Stack.Screen name='StudentViewSyllabus' component={StudentViewSyllabus}></Stack.Screen>
        <Stack.Screen name='StudentViewMarks' component={ViewStudentMarks}></Stack.Screen>
        <Stack.Screen name='TeacherDashboard' component={TeacherDashboard}></Stack.Screen>
        <Stack.Screen name='TeacherAddMarks' component={TeacherAddMarks}></Stack.Screen>
        <Stack.Screen name='TeacherAddMarks2' component={TeacherAddMarks2}></Stack.Screen>
        <Stack.Screen name='TeacherManageMarks' component={TeacherManageMarksScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


