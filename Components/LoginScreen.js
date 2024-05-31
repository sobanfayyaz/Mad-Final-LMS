import React, { useState } from 'react';
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
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebase';
import { ref, onValue } from 'firebase/database';


export default function LoginScreen({ navigation, route }) {
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
        <Text style={styles.logintext}>LOGIN</Text>
        <View style={styles.inside}>
          <Text style={styles.logintext}>LOGIN</Text>
          <TextInput
            placeholder="  email"
            style={styles.emailinput}
            value={email}
            onChangeText={setemail}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="  password"
            value={password}
            onChangeText={setpass}
            style={styles.passinput}
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              color: 'red',
              alignSelf: 'center',
              fontFamily: 'Poppins-Bold',
            }}>
            {err}
          </Text>
          <TouchableOpacity
            onPress={() => {
              
              console.log("I am in student");
              if (route.params.userType == "admin") {
                if (email === 'admin@gmail.com' && password == "12345678") {
                  navigation.navigate('AdminDashboard');
                }
              } else if (route.params.userType == "teacher") {
                console.log("I am in teacher");
                const teachersRef = ref(db, 'teachers');
                onValue(teachersRef, (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                    const teacherList = Object.values(data);
                    const matchedTeacher = teacherList.find(teacher => teacher.Email === email);

                    if (matchedTeacher && matchedTeacher.password === password) {
                      Alert.alert('Success', 'Successfully logged in.');
                      // Navigate to student dashboard or another screen
                      console.log("This is teachrs email")
                      console.log(email)
                      navigation.navigate('TeacherDashboard', {
                        email : email
                      })
                    } else {
                      Alert.alert('Error', 'Invalid registration number or password.');
                    }
                  } else {
                    Alert.alert('Error', 'No teacher data available.');
                  }
                }, {
                  onlyOnce: true
                });
              } else {
                console.log("I am in studnet");
                const studentsRef = ref(db, 'students');
                onValue(studentsRef, (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                    const studentList = Object.values(data);
                    const matchedStudent = studentList.find(student => student.RegistrationNumber === parseInt(email));

                    if (matchedStudent && matchedStudent.password === password) {
                      Alert.alert('Success', 'Successfully logged in.');
                      // Navigate to student dashboard or another screen
                      navigation.navigate('StudentDashboard', {
                        RegistrationNumber: email
                      })
                    } else {
                      Alert.alert('Error', 'Invalid registration number or password.');
                    }
                  } else {
                    Alert.alert('Error', 'No student data available.');
                  }
                }, {
                  onlyOnce: true
                });

              }
              // if (email === 'Admin@gmail.com' && password == "12345678") {
              //   navigation.navigate('AdminDashboard');
              // } else {
              //   main();
              // }
            }}
            // disabled={email.length < 5 || password.length < 5}
            style={styles.loginbutton}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>LOGIN</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 80 }}>
              Don't Have an account? Sign UP
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'black',
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
