import  React from 'react';
import { } from 'react-native';

import Adminadditem from './Adminaddstudent'
import Admindash from './AdminDashboard'
import Adminedititem from './Admineditstudent';
import Admindeleteitem from './Admindeletestudent';
import Admineditform from './Admineditform';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function Admindash2() {
  return (
    //<Home2/>
    //<Adminedititem/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='AdminDashboard' component={Admindash}></Stack.Screen>
        <Stack.Screen name='Adminadditem' component={Adminadditem}></Stack.Screen>
        <Stack.Screen name='Adminedititem' component={Adminedititem}></Stack.Screen>
        <Stack.Screen name='Admindeleteitem' component={Admindeleteitem}></Stack.Screen>
        <Stack.Screen name='Admineditform' component={Admineditform}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


