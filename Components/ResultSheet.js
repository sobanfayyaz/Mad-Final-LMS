import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import {auth, db, get, child,} from '../firebase';
import {ref, set, onValue,once} from 'firebase/database';
const ResultSheet = () => {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    // Fetch result data from Firebase
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
      <Text style={styles.header}>Result Sheet</Text>
      <View style={styles.tableHeader}>
        <Text>Registration No</Text>
        <Text>Student Name</Text>
        <Text>Class</Text>
        <Text>Grade</Text>
      </View>
      <View>
        {resultData.map((result) => (
          <View style={styles.tableRow} key={result.registrationNo}>
            <Text>{result.registrationNo}</Text>
            <Text>{result.studentName}</Text>
            <Text>{result.class}</Text>
            <Text>{result.grade}</Text>
          </View>
        ))}
      </View>
    </View>
  );
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

export default ResultSheet;
