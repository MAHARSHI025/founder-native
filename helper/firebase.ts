// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5AlXh6U50PXGJ1DwdOvw9Nqyh2b8la3g",
  authDomain: "nativefounder.firebaseapp.com",
  projectId: "nativefounder",
  storageBucket: "nativefounder.firebasestorage.app",
  messagingSenderId: "808369071541",
  appId: "1:808369071541:web:3592d85a3774023bab65fc",
  measurementId: "G-Q0QVJNBHWK"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

