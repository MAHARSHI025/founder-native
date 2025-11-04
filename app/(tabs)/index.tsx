import { View, StyleSheet, Button, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

  const router = useRouter()
  return (
    <SafeAreaView>

      <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, gap: 5 }}>
          <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0 }}>Make contacts</Text>
          <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0 }}>Get collab</Text>
        </View>
        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, gap: 5 }}>
          <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0 }}>Chat Partner</Text>
          <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0 }}>Business Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


