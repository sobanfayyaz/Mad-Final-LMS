import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, set, update, push } from 'firebase/database';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const TeacherAddMarks2 = ({ route }) => {
  const { studentId, teacherId } = route.params;
  const [term, setTerm] = useState('first-term');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
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

  useEffect(() => {
    const teacherClass = route.params.teacherId.AdmissionClass;
    let selectedClass = `Class ${teacherClass}`;
    if (classSubjects.hasOwnProperty(selectedClass)) {
      setSubjects(classSubjects[selectedClass]);
    }
  }, [route.params.teacherId]);

  const handleSubmit = async () => {
    if (!marks) {
      setError('Please enter marks.');
      return;
    }

    let totalMarks;
    if (subject === 'Computer (Part 1)' || subject === 'Computer (Part 2)') {
      totalMarks = term === 'final-term' ? 100 : 50;
    } else {
      totalMarks = term === 'final-term' ? 100 : 50;
    }

    if (subject === 'Computer (Part 1)') {
      totalMarks = term === 'final-term' ? 70 : 35;
    } else if (subject === 'Computer (Part 2)') {
      totalMarks = term === 'final-term' ? 30 : 15;
    }

    const db = getDatabase();
    const timestamp = new Date().toISOString();
    const data = {
      studentId,
      teacherId,
      term,
      subject,
      marks,
      totalMarks,
      timeUpdated: timestamp
    };

    try {
      const newMarkRef = push(ref(db, `marks/${studentId}/${term}`));
      await set(newMarkRef, data);
      alert('Marks updated successfully');
    } catch (error) {
      console.error('Error updating marks: ', error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fashionista}>Teacher Dashboard</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Text style={styles.search}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.label}>Select Course</Text>
      <RNPickerSelect
        onValueChange={(value) => setSubject(value)}
        items={subjects.map((subj) => ({ label: subj, value: subj }))}
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
      <Text style={styles.label}>Enter Marks</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={marks}
        onChangeText={setMarks}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

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
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
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
});

export default TeacherAddMarks2;
