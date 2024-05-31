import * as React from 'react';
import { auth, db } from '../firebase';
import { ref, get, child } from 'firebase/database';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ViewStudentMarks({ navigation, route }) {
  const { RegistrationNumber } = route.params;
  const [marks, setMarks] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch the student ID using the email
    get(child(ref(db), 'students'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const students = snapshot.val();
          const studentId = Object.keys(students).find(
            (key) => students[key].RegistrationNumber === parseInt(RegistrationNumber)
          );

          if (studentId) {
            // Fetch the marks of the student using the student ID
            get(child(ref(db), 'marks'))
              .then((marksSnapshot) => {
                if (marksSnapshot.exists()) {
                  const allMarks = marksSnapshot.val();
                  const studentMarks = {};
                  // Filter marks by studentId and organize by terms and subjects
                  for (const term in allMarks) {
                    for (const markId in allMarks[term]) {
                      const mark = allMarks[term][markId];
                      if (mark.studentId === studentId) {
                        if (!studentMarks[term]) {
                          studentMarks[term] = [];
                        }
                        studentMarks[term].push({
                          subject: mark.subject,
                          marks: mark.marks,
                          totalMarks: mark.totalMarks,
                        });
                        console.log("HErree")
                      }
                    }
                  }
                  setMarks(studentMarks);
                } else {
                  Alert.alert('No marks found for this student');
                }
              })
              .catch((error) => {
                console.error('Error fetching marks:', error);
              });
          } else {
            Alert.alert('No student found with this email');
          }
        } else {
          Alert.alert('No students found in the database');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, [RegistrationNumber]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons style={{ marginLeft: 10, marginTop: 2 }} name="arrow-back" size={35} color="red" />
            </TouchableOpacity>
            <Text style={styles.fashionista}>Student Marks</Text>
          </View>
        </View>

        {Object.keys(marks).length === 0 ? (
          <Text style={styles.noMarksText}>No marks available</Text>
        ) : (
          Object.keys(marks).map((term) => (
            <View key={term} style={styles.termContainer}>
              <Text style={styles.termTitle}>{term}</Text>
              {marks[term].map((subjectMark, index) => (
                <View key={index} style={styles.subjectContainer}>
                  <Text style={styles.subjectText}>
                    {subjectMark.subject}: {subjectMark.marks} / {subjectMark.totalMarks}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fashionista: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
    marginTop: 8,
  },
  noMarksText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  termContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
  },
  termTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  subjectContainer: {
    marginTop: 5,
  },
  subjectText: {
    fontSize: 18,
    color: 'black',
  },
});
