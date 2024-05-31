import * as firebase from 'firebase/app';
import 'firebase/auth';
import {getAuth} from 'firebase/auth';
import {getDatabase, get, child} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyANMcrUV7DWR8d9L_xoCRd5MBPuLre8H3Y",
  authDomain: "lms-app-60e03.firebaseapp.com",
  projectId: "lms-app-60e03",
  storageBucket: "lms-app-60e03.appspot.com",
  messagingSenderId: "1051944770736",
  appId: "1:1051944770736:web:7a869096d40ef5324cef75"
};

const app = firebase.initializeApp(firebaseConfig);
var auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
auth = getAuth(app);
const storage = getStorage(app);

const db = getDatabase(app);
export {auth, db , get, child, storage};
