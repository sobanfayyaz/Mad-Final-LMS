import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
  {
    label: 'Cash',
  },
  {
    label: 'Card',
  },
];

import {auth, db, get, child} from '../firebase';
import {ref, set} from 'firebase/database';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('!!userId')
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
  }

}

export default function Checkout() {
  React.useEffect(()=>{
    const dbRef = ref(db)
    get(child(dbRef,('users/'))).then((snapshot) => {
      if (snapshot.exists()) {
              const obj = snapshot.val()
              setuser(obj) 
      }
    }
    ).catch((error) => {
      console.error(error)
  })
    console.log(getData())  
    
  }, [])
  const [user, setuser] = React.useState("")

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={{ backgroundColor: 'white', padding: 5 }}>
        <Text style={[styles.header, { marginVertical: 20 }]}>
          Contact Information
        </Text>
        <View style={styles.contact}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
            }}
          />
          <View>
            <Text>Ahmad Khan</Text>
            <Text>mazk001@gmail.com</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 15 }}>Shipping Address</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <TextInput
          placeholder="Address"
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            margin: 10,
          }}
          placeholderTextColor="black"
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="Country"
            style={{
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="City"
            style={{
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
            placeholderTextColor="black"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="Postal Code"
            style={{
              width: '35%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="Number"
            style={{
              width: '55%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
              
            }}
            placeholderTextColor="black"
          />
        </View>
      </View>

      <View style={{ backgroundColor: 'white', marginTop: 20, padding: 20 }}>
      <TouchableOpacity
          style={{
            backgroundColor: 'red',
            margin: 10,
            marginLeft: 250,
            height: 40,
            width:80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '', color: 'white' }}>
            Save
          </Text>
        </TouchableOpacity>
        <Text>Payment</Text>
        <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
        <TextInput
          placeholder="Card Number"
          style={{
            backgroundColor: '',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            borderColor:'black',
            borderWidth: 1
          }}
          placeholderTextColor="black"
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: 'gray',
          padding: 10,
          margin: 10,
        }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Checkout</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      

      <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 15, fontSize: 20 }}>CONTACT US?</Text>
          <Text style={{ fontSize: 20, paddingRight: 15 }}>FAQS</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
        <TouchableOpacity><Ionicons
                name="logo-whatsapp"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="logo-facebook"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="logo-instagram"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="call"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 20,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
