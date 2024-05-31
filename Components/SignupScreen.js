import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput
} from 'react-native';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
export default function SignupScreen({navigation}) {
  const [username, setuname] = useState('');
  const [email, setemail] = useState('');
  const [number, setnumber] = useState();
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [postcode, setpostcode] = useState();
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const storeData = async value => {
		try {
			await AsyncStorage.setItem('!!userId', value);
		} catch (e) {
			throw e;
		}
	};

  const main = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				storeData(userCredential.user.uid);
				const obj = {
					username: username,
					email: email,
          contactNo: number,
          address: address,
          city: city,
					password: password,
					id: userCredential.user.uid,
				};
				console.log(obj);
				set(ref(db, 'users/' + obj.id), obj);
		    navigation.navigate('Login',{
          e : email,
          p : password
        });
			})
			.catch(error => {
				console.log(error);
			});
	};
  return (
    <KeyboardAvoidingView
      style={styles.container1}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Signtext}>Sign Up</Text>
        <View style={styles.insideSign}>
          
          <TextInput
            placeholder=" UserName"
            style={styles.lnameinput}
            value={username}
            onChangeText={setuname}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" Email"
            value={email}
            onChangeText={setemail}
            style={styles.einput}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" Contact Number"
            value={number}
            onChangeText={setnumber}
            style={styles.einput}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" Address"
            style={styles.einput}
            value={address}
            onChangeText={setaddress}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" City"
            style={styles.einput}
            value={city}
            onChangeText={setcity}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" Postcode"
            style={styles.einput}
            value={postcode}
            onChangeText={setpostcode}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder=" Password"
            value={password}
            onChangeText={setpassword}
            style={styles.einput}
            placeholderTextColor="grey"
            secureTextEntry={true}
						
          />
          <TextInput
            placeholder=" Confirm Password"
            value={cpassword}
            onChangeText={setcpassword}
            style={styles.einput}
            placeholderTextColor="grey"
            secureTextEntry={true}
						
          />
          <TouchableOpacity onPress={main} style={styles.Sbutton} disabled={username<3 || email <5 || number < 10 ||  address< 2 || postcode < 5 || password < 8 || (password !== cpassword)}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40 }}>
              Already Have an account? Login
            </Text>
          </TouchableOpacity>
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
  },
  Signtext: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 90,
    alignSelf: 'center',
  },
  insideSign: {
    marginTop: 30,
    borderTopLeftRadius: 40,
    backgroundColor: `#dcdcdc`,
    height: '100%',
    alignItems: 'center',
  },
  fnameinput: {
    width: '75%',
    height: 40,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  lnameinput: {
    width: '75%',
    height: 40,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  einput: {
    width: '75%',
    height: 40,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  Sbutton: {
    backgroundColor: 'red',
    width: '75%',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 40,
  },
});
