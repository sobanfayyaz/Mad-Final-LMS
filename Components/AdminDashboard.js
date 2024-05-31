import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AdminuploadTimeTable from './AdminUploadTimeTable';

const screenWidth = Dimensions.get('window').width;

export default function Admindash({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView>
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
            <Text style={styles.fashionista}>Admin Dashboard</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
            onPress={() => navigation.popToTop() }
            >
              <Text style={styles.search}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>




        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginLeft: 15 }}>
          <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Adminaddteacher")
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Add Teacher</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate("Adminaddstudent")
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Add Student</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              navigation.navigate("Admineditform")
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Edit Student</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              navigation.navigate("Admindeletestudent", {
                gender: "male"
              })
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Delete Student</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              navigation.navigate("StudentAgeRecord")
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Student Age Record</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              navigation.navigate("ResultSheet")
            }}>

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>Student Result Sheet</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate("AdminuploadTimeTable")}>

              <View style={styles.tile}>
                <Text style={styles.tileTitleRed}>Upload Time Table</Text>
              </View>

            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigation.navigate("AdminUploadClassSyllabus")}>

            <View style={styles.tile}>
                <Text style={styles.tileTitleRed}>Upload Syllabus</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>





      </SafeAreaView>
    </ScrollView>
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
  tile: {
    width: screenWidth * 0.9, // 90% of screen width
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  tileTitleRed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});
