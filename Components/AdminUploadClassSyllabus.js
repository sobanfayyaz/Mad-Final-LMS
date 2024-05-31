import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { getDatabase, set, ref as dbref, update, push } from 'firebase/database';
import { ActivityIndicator } from 'react-native-paper';

export default function AdminUploadClassSyllabus({ navigation }) {

    const [loading, setLoading] = React.useState(false);
    const [classNum, setClassNum] = React.useState(1);
    const [selectedLanguage, setSelectedLanguage] = React.useState();


    const options = {
        mediaType: "photo"
    }

    const pickImage = async () => {
        setLoading(true);
        

        const resp = await launchImageLibrary(options);
        const imguri = resp.assets[0].uri;
        const linkdonw = await uploadImage(imguri, resp.assets[0].fileName);

        const app = getApp();
        const db = getDatabase(app);

        const imageUrlRef = dbref(db, `syllabus`);
        const data = {
            image: linkdonw,
            classNumber: classNum
        }
            await push(imageUrlRef, data);

        setLoading(false);

        Alert.alert("uploaded successfully");

    }


    const uploadImage = async (uri, imageName) => {
        try {

            const response = await fetch(uri);
            const blob = await response.blob();
            const app = getApp();
            const storage = getStorage(app);
            const storageref = ref(storage, `syllabus/${imageName}`);

            await uploadBytes(storageref, blob)

            const linkurl = await getDownloadURL(storageref)

            return linkurl;

        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };



    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Ionicons
                                style={{ marginLeft: 10, marginTop: 6 }}
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


                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        paddingTop: 5,
                        marginLeft: 10,
                    }}
                >
                    Upload Class Syllabus
                </Text>



                <Picker
                    selectedValue={classNum}
                    onValueChange={(itemValue, itemIndex) =>
                        setClassNum(itemValue)
                    }>
                    <Picker.Item label="Nursery" value="Nursery" />

                    <Picker.Item label="Prep" value="Prep" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" /> 
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                </Picker>

                <Text>Select Class Number </Text>

                {loading ?
                    <ActivityIndicator size={'large'} color='black' /> :
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Upload Here</Text>
                    </TouchableOpacity>
                }




                {/* 
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 15 }}>
            Orders
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent:'space-evenly',marginTop: 10, marginLeft: 15 }}>
          <TouchableOpacity>
            <Ionicons
              style={{ marginLeft: 10, marginRight: 15 }}
              name="checkmark-done-circle-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={{ marginLeft: 10, marginRight: 15 }}
              name="timer-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={{ marginLeft: 10 }}
              name="cube-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent:'space-evenly' ,marginTop: 10,  }}>
          <Text style={{ }}>Completed</Text>
          <Text style={{  }}>Pending</Text>
          <Text>Exchange</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 15 }}>
            Suppliers
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent:'space-evenly',marginTop: 10, marginLeft: 15 }}>
          <TouchableOpacity>
            <Ionicons
              style={{}}
              name="body-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={{  }}
              name="cart-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={{ }}
              name="cash-outline"
              size={100}
              color="black"
            />
          </TouchableOpacity>
        </View> */}
            </SafeAreaView>
        </ScrollView>
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
        fontWeight: '',
        color: 'red',
        marginRight: 10,
        marginTop: 15,
    }, button: {
        backgroundColor: 'black', // Button background color
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 24, // Horizontal padding
        borderRadius: 8, // Border radius
        marginTop: 20,
        marginHorizontal: 20
    },
    buttonText: {
        color: '#ffffff', // Text color
        fontSize: 16, // Text size
        fontWeight: 'bold', // Text weight
        textAlign: 'center', // Text alignment
    },
});