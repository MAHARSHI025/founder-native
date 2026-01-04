import { useEffect } from "react";
import { Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "@/helper/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

GoogleSignin.configure({
  webClientId: "1078741769144-ikec7ib70p92auvr00vm35elhtm17k9m.apps.googleusercontent.com",
});

export default function GoogleLogin() {

  const signInWithGoogle = async () => {
    const { idToken }:any = await GoogleSignin.signIn();
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
    console.log("✅ Logged in successfully!");
  };

  return (
    <Button title="Sign In with Google" onPress={signInWithGoogle} />
  );
}
