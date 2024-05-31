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

export default function AdminFeeForm({ navigation, route }) {
  const [students, setStudents] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [studentName, setStudentName] = React.useState('');
  const [amountDue, setAmountDue] = React.useState('');
  const [amountPaid, setAmountPaid] = React.useState('');
  const [payableAmount, setPayableAmount] = React.useState('');
  const [paymentDate, setPaymentDate] = React.useState('');
  const [lateFees, setLateFees] = React.useState('No');
  const [remarks, setRemarks] = React.useState('');

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
    setStudentName(student.Name);
    setShowDropdown(false);

    // Fetch the fee details for the selected student if they exist
    const feeRef = ref(db, `fees/${student.key}`);
    onValue(feeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAmountDue(data.AmountDue);
        setAmountPaid(data.AmountPaid);
        setPayableAmount(data.PayableAmount);
        setPaymentDate(data.PaymentDate);
        setLateFees(data.LateFees);
        setRemarks(data.Remarks);
      } else {
        // Clear the form if no fee data is found
        setAmountDue('');
        setAmountPaid('');
        setPayableAmount('');
        setPaymentDate('');
        setLateFees('No');
        setRemarks('');
      }
    });
  };

  const handleSave = () => {
    if (!selectedStudent) {
      Alert.alert('Error', 'Please select a student.');
      return;
    }

    const feeData = {
      StudentName: studentName,
      AmountDue: amountDue,
      AmountPaid: amountPaid,
      PayableAmount: payableAmount,
      PaymentDate: paymentDate,
      LateFees: lateFees,
      Remarks: remarks,
    };

    // Save fee data to Firebase
    update(ref(db, `fees/${selectedStudent.key}`), feeData)
      .then(() => {
        Alert.alert('Success', 'Fee status updated successfully.');
        navigation.navigate('AdminDashboard');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const handleDelete = () => {
    if (!selectedStudent) {
      Alert.alert('Error', 'Please select a student.');
      return;
    }

    // Remove fee data from Firebase
    remove(ref(db, `fees/${selectedStudent.key}`))
      .then(() => {
        Alert.alert('Success', 'Fee status deleted successfully.');
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
            Edit Fee Status
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

          <View style={{ flexDirection: 'column', margin: 10,}}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Student Name:
            </Text>
            <TextInput
              value={studentName}
              onChangeText={setStudentName}
              placeholder="Student Name"
              style={{
                width: '60%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10,  }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Amount Due:
            </Text>
            <TextInput
              value={amountDue}
              onChangeText={setAmountDue}
              placeholder="0"
              keyboardType="numeric"
              style={{
                width: '30%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10,  }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Amount Paid:
            </Text>
            <TextInput
              value={amountPaid}
              onChangeText={setAmountPaid}
              placeholder="0"
              keyboardType="numeric"
              style={{
                width: '30%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Payable Amount:
            </Text>
            <TextInput
              value={payableAmount}
              onChangeText={setPayableAmount}
              placeholder="0"
              keyboardType="numeric"
              style={{
                width: '30%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10,  }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Payment Date:
            </Text>
            <TextInput
              value={paymentDate}
              onChangeText={setPaymentDate}
              placeholder="YYYY-MM-DD"
              style={{
                width: '40%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Late Fees:
            </Text>
            <TextInput
              value={lateFees}
              editable={false}
              style={{
                width: '40%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Remarks:
            </Text>
            <TextInput
              value={remarks}
              onChangeText={setRemarks}
              placeholder="Remarks"
              style={{
                width: '60%',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            margin: 10,
            marginTop: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={handleSave}
        >
          <Text style={{ fontSize: 20, fontWeight: '', color: 'white' }}>
            Save
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            margin: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={handleDelete}
        >
          <Text style={{ fontSize: 20, fontWeight: '', color: 'white' }}>
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
});

