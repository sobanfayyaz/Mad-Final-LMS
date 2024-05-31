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

export default function StudentViewSyllabus({ navigation, route }) {
    const [documentData, setDocumentData] = React.useState(null);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
              const documentRef = ref(`timetable/-NywKZcRK0dd5Wc0f0lW`);
              const snapshot = await documentRef.once('value');
              if (snapshot.exists()) {
                setDocumentData(snapshot.val());
                console.log(snapshot.val());
              } else {
                console.log('No data available');
              }
            } catch (error) {
              console.error('Error fetching document: ', error);
              // setError(error);
            } finally {

            }
          };
      
          fetchData();
    })

  return (
    <ScrollView>
      <SafeAreaView>
      <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/lms-app-60e03.appspot.com/o/images%2F1000127194.jpg?alt=media&token=1f8f1ebc-627b-41ba-bdbb-d0bb98fab82d'}}
       style={{width: 400, height: 400}} />

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    
});
