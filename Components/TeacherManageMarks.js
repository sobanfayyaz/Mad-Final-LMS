import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const TeacherManageMarksScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [teacher, setTeacher] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [term, setTerm] = useState('first-term');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [marksData, setMarksData] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = () => {
    const db = getDatabase();
    const teacherRef = ref(db, 'teachers');

    onValue(teacherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teacherList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const matchedTeacher = teacherList.find(teacher => teacher.Email === route.params.email);
        setTeacher(matchedTeacher);
      } else {
        setTeacher(null);
      }
    });
  };

  useEffect(() => {
    if (teacher) {
      fetchStudents();
    }
  }, [teacher]);

  const fetchStudents = () => {
    const db = getDatabase();
    const studentsRef = ref(db, 'students');

    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setStudents(studentsList);
      } else {
        setStudents([]);
      }
    });
  };

  useEffect(() => {
    console.log(studentName)
    console.log(teacher)
    if (studentName && teacher) {
      const filtered = students.filter(student =>
        student.AdmissionClass === teacher.AdmissionClass && student.Name.toLowerCase().includes(studentName.toLowerCase())
      );
      // console.log(student.AdmissionClass)
      console.log(teacher.AdmissionClass)
      
      console.log("Printing Filtered")
      console.log(filtered)
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [studentName, students, teacher]);

  const fetchMarks = (studentId) => {
    const db = getDatabase();
    const marksRef = ref(db, `marks/${studentId}`);

    onValue(marksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Dataaa")
        
        console.log(data)
        const marksList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        console.log("Marks List")

        console.log(marksList)
        setMarksData(marksList);
      } else {
        setMarksData([]);
      }
    });
  };

  const handleUpdate = async (studentId, markId) => {
    if (!marks || !subject || !term) {
      setError('Please enter all fields.');
      return;
    }

    const db = getDatabase();
    const data = {
      marks,
      subject,
      term
    };

    try {
      const markRef = ref(db, `marks/${studentId}/${markId}`);
      await update(markRef, data);
      alert('Marks updated successfully');
      fetchMarks(studentId);
    } catch (error) {
      console.error('Error updating marks: ', error);
      setError(error.message);
    }
  };

  const handleDelete = async (studentId, markId) => {
    const db = getDatabase();
    try {
      const markRef = ref(db, `marks/${studentId}/${markId}`);
      await remove(markRef);
      alert('Marks deleted successfully');
      fetchMarks(studentId);
    } catch (error) {
      console.error('Error deleting marks: ', error);
      setError(error.message);
    }
  };

  if (!teacher) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const classSubjects = {
    "Nursery": ["English", "Urdu", "Math", "Nazra-e-Quran"],
    "Prep": ["English", "Urdu", "Math", "Nazra-e-Quran", "General Knowledge"],
    "Class 1": ["English", "Urdu", "Math", "General Knowledge", "Islamyat"],
    "Class 2": ["English", "Urdu", "Math", "General Knowledge", "Islamyat", "Computer (Part 1)", "Computer (Part 2)"],
    "Class 3": ["English", "Urdu", "Math", "General Knowledge", "Islamyat", "Computer (Part 1)", "Computer (Part 2)"],
    "Class 4": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer (Part 1)", "Computer (Part 2)"],
    "Class 5": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer (Part 1)", "Computer (Part 2)"],
    "Class 6": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer (Part 1)", "Computer (Part 2)", "Quran"],
    "Class 7": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer (Part 1)", "Computer (Part 2)", "Quran"],
    "Class 8": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer (Part 1)", "Computer (Part 2)", "Quran"],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Student Name</Text>
      <TextInput
        style={styles.input}
        value={studentName}
        onChangeText={setStudentName}
      />

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.UserId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => fetchMarks(item.id)}>
            <Text style ={{
              color: 'black',
              fontSize: 26
            }}>{item.Name}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={marksData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.markItem}>
            <Text>Term: {item.term}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Marks: {item.marks}</Text>
            <TextInput
              style={styles.input}
              placeholder="Update Marks"
              value={marks}
              onChangeText={setMarks}
            />
            <RNPickerSelect
              onValueChange={(value) => setSubject(value)}
              items={classSubjects["Class " + teacher.AdmissionClass].map((subj) => ({ label: subj, value: subj }))}
              value={subject}
            />
            <View style={styles.radioGroup}>
              <View style={styles.radioItem}>
                <RadioButton
                  value="first-term"
                  status={term === 'first-term' ? 'checked' : 'unchecked'}
                  onPress={() => setTerm('first-term')}
                />
                <Text>First Term</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton
                  value="mid-term"
                  status={term === 'mid-term' ? 'checked' : 'unchecked'}
                  onPress={() => setTerm('mid-term')}
                />
                <Text>Mid Term</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton
                  value="final-term"
                  status={term === 'final-term' ? 'checked' : 'unchecked'}
                  onPress={() => setTerm('final-term')}
                />
                <Text>Final Term</Text>
              </View>
            </View>
            <Button title="Update" onPress={() => handleUpdate(item.studentId, item.id)} />
            <Button title="Delete" onPress={() => handleDelete(item.studentId, item.id)} />
          </View>
        )}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  markItem: {
    marginVertical: 8,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default TeacherManageMarksScreen;
