import * as React from 'react';
import { auth, db } from '../firebase';
import { ref, set, update, remove, onValue } from 'firebase/database';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Admindeletestudent({ navigation, route }) {
  const [students, setStudents] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    // Fetch students from database
    const studentRef = ref(db, 'students');
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }));
        setStudents(studentList);
      }
    });
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    if (!selectedStudent) {
      Alert.alert('Error', 'Please select a student.');
      return;
    }

    // Remove student data from Firebase
    remove(ref(db, `students/${selectedStudent.key}`))
      .then(() => {
        Alert.alert('Success', 'Student deleted successfully.');
        navigation.navigate('AdminDashboard');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Ionicons
                style={{ marginLeft: 10, marginTop: 2 }}
                name="menu"
                size={35}
                color="red"
              />
            </TouchableOpacity>
            <Text style={styles.fashionista}>Admin Dashboard</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text style={styles.search}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 15 }}>
            Delete Student
          </Text>
        </View>

        <View style={{ backgroundColor: '#E5E5E5', marginTop: 20 }}>
          <View style={{ margin: 10, marginTop: 30 }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Select Student:
            </Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedStudent ? selectedStudent.RegistrationNumber : 'Select a student'}
              </Text>
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdown}>
                {students.map((student) => (
                  <TouchableOpacity
                    key={student.key}
                    onPress={() => handleStudentSelect(student)}
                    style={styles.dropdownItem}
                  >
                    <Text>{student.RegistrationNumber}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            Delete
          </Text>
        </TouchableOpacity>
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
  dropdownButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: '',
    color: 'white',
  },
});
