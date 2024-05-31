import * as React from 'react';
import { auth, db } from '../firebase';
import { ref, set, push } from 'firebase/database';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function AdminAddStudent({ navigation, route }) {
  const [registrationNumber, setRegistrationNumber] = React.useState('');
  const [dateOfAdmission, setDateOfAdmission] = React.useState('');
  const [name, setName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [fatherName, setFatherName] = React.useState('');
  const [caste, setCaste] = React.useState('');
  const [occupation, setOccupation] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [admissionClass, setAdmissionClass] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remarks, setRemarks] = React.useState('');

  const classNames = [
    { label: 'Nursery', value: 'Nursery' },
    { label: 'Prep', value: 'Prep' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' }
  ];

  function addItem() {
    // Validation for Registration Number
    const regNumber = parseInt(registrationNumber, 10);
    if (isNaN(regNumber) || regNumber < 0 || regNumber > 1000) {
      Alert.alert('Error', 'Registration Number must be a number between 0 and 1000.');
      return;
    }

    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;

        // Save student details in the database
        push(ref(db, 'students'), {
          RegistrationNumber: regNumber,
          DateOfAdmission: dateOfAdmission,
          Name: name,
          DateOfBirth: dob,
          Gender: gender,
          FatherName: fatherName,
          Caste: caste,
          Occupation: occupation,
          Residence: residence,
          AdmissionClass: admissionClass,
          Email: email,
          Remarks: remarks,
          password: password,
          UserId: user.uid,
        });

        Alert.alert('Student Added Successfully');
        navigation.navigate('AdminDashboard');
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert('Error', error.message);
      });
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Ionicons style={{ marginLeft: 10, marginTop: 2 }} name="menu" size={35} color="red" />
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
            Add Student
          </Text>
        </View>

        <View style={{ backgroundColor: '#E5E5E5', marginTop: 20 }}>
          {/* Registration Number */}
          <View style={{ flexDirection: 'column', marginLeft: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Registration Number:
            </Text>
            <TextInput
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              placeholder="0-1000"
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          {/* Date of Admission */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Date of Admission:
            </Text>
            <TextInput
              value={dateOfAdmission}
              onChangeText={setDateOfAdmission}
              placeholder="YYYY-MM-DD"
              style={styles.input}
            />
          </View>

          {/* Name */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Name:
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Student Name"
              style={styles.input}
            />
          </View>

          {/* Date of Birth */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Date of Birth:
            </Text>
            <TextInput
              value={dob}
              onChangeText={setDob}
              placeholder="YYYY-MM-DD"
              style={styles.input}
            />
          </View>

          {/* Gender */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Gender:
            </Text>
            <TextInput
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
              style={styles.input}
            />
          </View>

          {/* Father Name */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Father Name:
            </Text>
            <TextInput
              value={fatherName}
              onChangeText={setFatherName}
              placeholder="Father's Name"
              style={styles.input}
            />
          </View>

          {/* Caste */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Caste:
            </Text>
            <TextInput
              value={caste}
              onChangeText={setCaste}
              placeholder="Caste"
              style={styles.input}
            />
          </View>

          {/* Occupation */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Occupation:
            </Text>
            <TextInput
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Occupation"
              style={styles.input}
            />
          </View>

          {/* Residence */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Residence:
            </Text>
            <TextInput
              value={residence}
              onChangeText={setResidence}
              placeholder="Residence"
              style={styles.input}
            />
          </View>

          {/* Admission Class */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Admission Class:
            </Text>

            <RNPickerSelect
              onValueChange={(value) => setAdmissionClass(value)}
              items={classNames}
              value={admissionClass}
            />
          </View>

          {/* Email */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Email:
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={{ flexDirection: 'column', margin: 10, }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Password:
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
          </View>

          {/* Remarks */}
          <View style={{ flexDirection: 'column', margin: 10, marginBottom: 30 }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>
              Remarks:
            </Text>
            <TextInput
              value={remarks}
              onChangeText={setRemarks}
              placeholder="Remarks"
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={addItem}
          disabled={
            !registrationNumber ||
            !dateOfAdmission ||
            !name ||
            !dob ||
            !gender ||
            !fatherName ||
            !caste ||
            !occupation ||
            !residence ||
            !admissionClass ||
            !email ||
            !password
          }
        >
          <Text style={{ fontSize: 20, color: 'white' }}>
            Save
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
    color: 'red',
    marginRight: 10,
    marginTop: 15,
  },
  input: {
    width: '60%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: 'red',
    margin: 10,
    marginTop: 30,
    marginLeft: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
