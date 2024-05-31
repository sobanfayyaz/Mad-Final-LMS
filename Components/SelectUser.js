import React, {useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import LoginScreen from './LoginScreen';

export default function SelectUser({navigation, route}) {
  const [email, setemail] = useState(
    route.params !== null ? '' : route.params.e,
  );
  const [password, setpass] = useState(
    route.params !== null ? '' : route.params.p,
  );
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('!!userId', value);
    } catch (e) {
      throw e;
    }
  };

  const main = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        storeData(userCredential.user.uid);
        navigation.navigate('Home');
      })
      .catch(error => {
        setErr('Invalid Credentials');
      });
  };

  const showPass = () => {
    if (show === false) {
      setShow(true);
      return;
    }
    setShow(false);
  };
  return (
    <KeyboardAvoidingView style={styles.container1}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style = {styles.titleText}>Select User</Text>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center',}}>
            <TouchableOpacity style={styles.selecter} onPress={()=>{
                  navigation.navigate("Login", {
                    userType: "admin"
                  })
                }}><Text style={styles.selecterText}>Admin</Text></TouchableOpacity>
            <TouchableOpacity style={styles.selecter}  onPress={() => navigation.navigate("Login" , {userType: "teacher"})}><Text style={styles.selecterText}>Teachers</Text></TouchableOpacity>
            <TouchableOpacity style={styles.selecter}  onPress={() => navigation.navigate("Login", {userType: "student"})}><Text style={styles.selecterText}>Student</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white'
  },
  selecter:{
    backgroundColor:'black',
    width:'30%',
    padding:10,
    margin:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    , borderRadius:10
  },
  selecterText:{
    fontSize: 18,
    fontWeight:'bold',
    color: 'white'

  },
  
  titleText:{
    fontSize: 18,
    fontWeight:'bold',
    color: 'black'

  },
  container: {
    display:'flex',
    height:'100%',
    backgroundColor: 'white',
    padding: 8,
  },
  inside: {
    marginTop: 250,
    borderTopLeftRadius: 40,
    backgroundColor: `#dcdcdc`,
    height: '100%',
    alignItems: 'center',
  },
  logintext: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    alignSelf: 'center',
  },
  emailinput: {
    width: '75%',
    height: 40,
    marginTop: 100,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  passinput: {
    width: '75%',
    height: 40,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  loginbutton: {
    backgroundColor: 'red',
    width: '75%',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 40,
  },
});
