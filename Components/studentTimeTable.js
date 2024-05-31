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
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function StudentTimeTable({ navigation, route }) {
    const [documentData, setDocumentData] = React.useState(null);


  return (
    <ScrollView>
      <SafeAreaView>
      <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/lms-app-60e03.appspot.com/o/images%2F1000127958.jpg?alt=media&token=7df3512a-8b7f-4428-bca4-4b7749d62be6'}}
       style={{width: 400, height: 400}} />

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    
});
