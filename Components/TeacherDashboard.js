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

export default function TeacherDashboard({ navigation, route }) {
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
            <Text style={styles.fashionista}>Teacher Dashboard</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.search}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>




        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginLeft: 15 }}>
          <View>

          {/* <TouchableOpacity onPress={() => {
              navigation.navigate("StudentViewSyllabus")
            }}>
              

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>View Syllabus</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate("StudentViewTimeTable")
            }}>
              

              <View style={styles.tile}>
                <Text style={styles.tileTitle}>View Time Table</Text>
              </View>
            </TouchableOpacity> */}

            
            <TouchableOpacity onPress={() => {
              navigation.navigate("TeacherAddMarks", {
                email : route.params.email
              })
            }}>
              

              <View style={styles.tile}>  
                <Text style={styles.tileTitle}>Add Marks</Text>
              </View>
            </TouchableOpacity>

            
            
            <TouchableOpacity onPress={() => {
              console.log(route.params.emailr)
              navigation.navigate("TeacherManageMarks", {
                email : route.params.email
              })
            }}>
              

              <View style={styles.tile}>  
                <Text style={styles.tileTitle}>Manage Marks</Text>
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
