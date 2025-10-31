import { View, StyleSheet, Button } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {

  const router = useRouter()
  return (
    <View style={{display:"flex", justifyContent:'center', alignItems:'center', flex:1}}>
      <Button title="back" onPress={()=>router.push('/login')}></Button>
    </View>
  );
}


