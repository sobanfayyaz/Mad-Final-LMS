import  React from 'react';
import { } from 'react-native';
import Admindash from './AdminDashboard'
import Adminedititem from './Adminedititem';
import Adminadditem from './Adminadditem';
import Admindeleteitem from './Admindeleteitem';
import Admineditform from './Admineditform';
import Admindash2 from './AdminDash2';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
export default function TabNavigator(){
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='AdminDashboard2' component={Admindash2}></Tab.Screen>
        <Tab.Screen name='Adminadditem' component={Adminadditem}></Tab.Screen>
        <Tab.Screen name='Adminedititem' component={Adminedititem}></Tab.Screen>
        <Tab.Screen name='Admindeleteitem' component={Admindeleteitem}></Tab.Screen>
        <Tab.Screen name='Admineditform' component={Admineditform}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>

}