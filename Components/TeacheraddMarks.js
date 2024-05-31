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

import { auth, db, get, child, } from '../firebase';
import { ref, set, onValue, once, getDatabase, query, orderByChild, equalTo } from 'firebase/database';
const Bold = props => (
  <Text
    style={{
      fontWeight: 'bold',
    }}>
    {props.children}
  </Text>
);

const below = () => {

}
export default function TeacherAddMarks({ navigation, route }) {

  const [data, setdata] = React.useState('');
  const [teacherData, setTeacherData] = React.useState(null);
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();

        const teachersRef = ref(db, 'teachers'); // Assuming 'teachers' is the path to the teacher data
        const emailQuery = query(teachersRef, orderByChild('Email'), equalTo(route.params.email));

        const snapshot = await get(emailQuery);
        console.log("Fetching teacher data...")
        if (snapshot.exists()) {
          let teacher = null;
          snapshot.forEach(childSnapshot => {
            teacher = { ...childSnapshot.val(), key: childSnapshot.key };
          });

          try {
            const studentsRef = ref(db, 'students');
            const filteredQuery = query(studentsRef, orderByChild('AdmissionClass'), equalTo(teacher.AdmissionClass));

            const snapshot = await get(filteredQuery);
            console.log("I am hereeee")
            if (snapshot.exists()) {
              const studentsData = [];
              snapshot.forEach(childSnapshot => {
                const obj = { ...childSnapshot.val(), key: childSnapshot.key };
                studentsData.push(obj);
              });
              setdata(studentsData);
            } else {
              console.log("No data available");
            }
          } catch (error) {
            console.error('Error fetching data: ', error);
            // setError(error);
          } finally {
            // setLoading(false);
          }
          setTeacherData(teacher);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        // setError(error);
      } finally {
        // setLoading(false);
      }


    };

    fetchData();
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);


  let ArrayOfPeopleObject = Object.values(data);

  const renderr = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10
      }}>
      <View style={{}}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
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
          onPress={() => {
            // console.log(teacherData)
            navigation.navigate('TeacherAddMarks2', { studentId: item.key, teacherId: teacherData });

          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Add Marks
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Ionicons
              style={{ marginLeft: 10, marginTop: 6 }}
              name="menu"
              size={35}
              color="red"
            />
          </TouchableOpacity>
          <Text style={styles.fashionista}>Teacher Dashboard</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Text style={styles.search}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 15 }}>
        </Text>
      </View>
      {loader ? (
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
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => String(index)}
            style={{ alignSelf: 'center', }}
            data={ArrayOfPeopleObject}
            renderItem={renderr}
          />
        </View>)}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
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
