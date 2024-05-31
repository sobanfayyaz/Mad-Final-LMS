import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import {auth, db, get, child,} from '../firebase';
import {ref, set, onValue,once} from 'firebase/database';
const StudentAgeRecord = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch student data from Firebase
    const fetchData = () => {
        const dbRef = ref(db);
        get(child(dbRef, 'students'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const newData = [];
              snapshot.forEach((childSnapshot) => {
                const obj = { ...childSnapshot.val(), key: childSnapshot.key };
                newData.push(obj);
              });
              setStudentData(newData);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
          });
      };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Age Record</Text>
      <View style={styles.tableHeader}>
        <Text>Registration No</Text>
        <Text>Student Name</Text>
        <Text>Father Name</Text>
        <Text>Date of Birth</Text>
        <Text>Age (Years & Months)</Text>
      </View>
      <View>
        {studentData.map((student) => (
          <View style={styles.tableRow} key={student.registrationNo}>
            <Text>{student.RegistrationNumber}</Text>
            <Text>{student.Name}</Text>
            <Text>{student.FatherName}</Text>
            <Text>{student.dateOfBirth}</Text>
            {/* Calculate age and display */}
            <Text>{calculateAge(student.DateOfBirth)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    
    const currentDate = new Date();
    
    let age = currentDate.getFullYear() - dob.getFullYear();
    
    if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default StudentAgeRecord;
