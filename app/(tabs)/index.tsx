import { View, StyleSheet, Button, Text, ScrollView, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { NumberTicker } from "@/components/number-ticker";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HomeScreen() {

  const router = useRouter()
  return (
    <SafeAreaView style={{ gap: 10 }} edges={['top']}>
      <Header component={''} text={'Founder'} />

      <ScrollView >

        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', padding: 10, gap: 10 }}>
          <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
            <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0, fontWeight: 500 }}>🤝 Make Contacts</Text>
            <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0, fontWeight: 500 }}>💼 Get Collab</Text>
          </View>

          <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
            <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0, fontWeight: 500 }}>💬 Chat Partner</Text>
            <Text style={{ width: '50%', borderWidth: 1, borderRadius: 500, padding: 10, backgroundColor: 'white', elevation: 5, shadowOffset: { height: 3, width: 3 }, shadowOpacity: 1, shadowRadius: 0, fontWeight: 500 }}>📈Business Profile</Text>
          </View>

        </View>

        <View style={{ display: 'flex', margin: 10, backgroundColor: 'black', padding: 20, borderRadius: 15, gap: 20, alignItems: 'flex-end', paddingVertical: 30 }}>
          <Text style={{ fontSize: 40, fontWeight: 600, color: 'white' }}>
            Find, Collab & Grow
          </Text>
          <Text style={{ fontSize: 10, fontWeight: 600, color: 'white', textAlign: 'justify' }}>A smart B2B platform that connects businesses, streamlines communication, and accelerates growth through secure and seamless collaboration.</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ margin: 10, paddingVertical: 5 }}
        >
          <View style={{
            backgroundColor: 'white',
            alignItems: 'baseline',
            width: 150,
            borderWidth: 1,
            borderRadius: 15,
            elevation: 10,
            shadowOpacity: 1,
            shadowOffset: { height: 3, width: 3 },
            shadowRadius: 0,
            padding: 10,
            marginRight: 10
          }}>
            <NumberTicker value={20} />
            <Text style={{ fontSize: 15 }}>brands profile</Text>
          </View>

          <View style={{
            backgroundColor: 'white',
            alignItems: 'baseline',
            width: 150,
            borderWidth: 1,
            borderRadius: 15,
            elevation: 10,
            shadowOpacity: 1,
            shadowOffset: { height: 3, width: 3 },
            shadowRadius: 0,
            padding: 10,
            marginRight: 10
          }}>
            <NumberTicker value={12} />
            <Text style={{ fontSize: 15 }}>active founders</Text>
          </View>

          <View style={{
            backgroundColor: 'white',
            alignItems: 'baseline',
            width: 150,
            borderWidth: 1,
            borderRadius: 15,
            elevation: 10,
            shadowOpacity: 1,
            shadowOffset: { height: 3, width: 3 },
            shadowRadius: 0,
            padding: 10,
            marginRight: 10
          }}>
            <NumberTicker value={206} />
            <Text style={{ fontSize: 15 }}>total projects</Text>
          </View>

        </ScrollView>

        <View style={{
          backgroundColor: 'white',
          alignItems: 'baseline',
          paddingHorizontal: 10,
          padding: 10
        }}>
          <Text style={{ fontSize: 30 }}>Want a part of it?</Text>
          <Pressable onPress={()=>router.push('/market')} style={{display:'flex', backgroundColor:'black', width:'100%', padding:15, borderRadius:15, flexDirection:'row', justifyContent:'center', alignItems:'center', gap:1} }>
            <Text style={{color:'white', textAlign:'center', fontWeight:'500', alignItems:'center', display:'flex', justifyContent:'center'}}>Explore </Text>
            <AntDesign name="compass" size={15} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


