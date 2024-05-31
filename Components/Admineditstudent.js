import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {auth, db, get, child,} from '../firebase';
import {ref, set, onValue,once} from 'firebase/database';
const Bold = props => (
  <Text
    style={{
      fontWeight: 'bold',
    }}>
    {props.children}
  </Text>
);

const below = ()=>{
  
}
export default function Admineditstudent({navigation, route}) {

    const [data, setdata] = React.useState('');
    const [loader, setLoader] = React.useState(true);

    React.useEffect(()=>{
        const dbRef = ref(db)
        get(child(dbRef,('students'))).then((snapshot) => {
            console.log("I am hereeee")
            if (snapshot.exists()) {
             
                snapshot.forEach(snapshot => {
                    const obj = {...snapshot.val(),key:snapshot.key}
                    setdata(prev=>[...prev,obj]) 
                });
              
            } else {
                console.log("No data available")
            }
        }).catch((error) => {
            console.error(error)
        })
        setTimeout(() => {
          setLoader(false);
        }, 3000);
    }, []);
    
    
      let ArrayOfPeopleObject = Object.values(data);

    const renderr = ({item})=>(
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin:10
          }}>
          <View style={{}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {item.Name}
            </Text>
            <Text>
              <Bold>Reg Number:</Bold> {item.RegistrationNumber}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 130,
                height: 40,
                marginLeft: 70,
                justifyContent: 'center',
              }}
              onPress={()=>{
                navigation.navigate("Admineditform",{
                    item
                    /*gender: route.params.gender,
                    name: item.Name,
                    price : item.Price,
                    color: item.Color,
                    quantity: item.Quantity,
                    category: item.Category,
                    desc : item.Description*/
                })
              }}
              >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Edit Fee Status
              </Text>
            </TouchableOpacity>
          </View>

          
        </View>
    );

  return (
      <SafeAreaView style={{flex:1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Ionicons
                style={{marginLeft: 10, marginTop: 6}}
                name="menu"
                size={35}
                color="red"
              />
            </TouchableOpacity>
            <Text style={styles.fashionista}>Admin Dashboard</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text style={styles.search}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', paddingLeft: 15}}>
          </Text>
        </View>
        {loader?(
          <View>
          <ActivityIndicator size='large' color='blue' />
          <Text
            style={{
              color: '#020D28',
              alignSelf: 'center',
              margin: 20,
            }}>
            Fetching students...
          </Text>
        </View>
        ):(
        <View style={{flex:1}}>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          style={{alignSelf: 'center',}}
          data={ArrayOfPeopleObject}
          renderItem={renderr}
        />
        </View>)}

        <View style={{marginTop: 20, marginBottom:20}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 100,
              height: 30,
              marginLeft: 250,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fashionista: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
    marginTop: 8,
  },
  search: {
    fontSize: 15,
    fontWeight: '',
    color: 'red',
    marginRight: 10,
    marginTop: 15,
  },
});
