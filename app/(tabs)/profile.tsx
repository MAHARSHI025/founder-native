import Header from "@/components/header";
import InfoSection from "@/components/info-section";
import MarketCard from "@/components/MarketCard";
import { AuthContext } from "@/context/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { ActivityIndicator, Button, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab: React.FC = () => {
  const { userToken, user, loading, logout }: any = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<any>([])

  useFocusEffect(
    useCallback(() => {
      if (!loading && !userToken) {
        router.push("/login");
      } else {
        const getData = async () => {
          const response: any = await axios.post('https://founder-weld.vercel.app/api/user/getuser', { email: user?.email })
          // console.log(response.data);
          setData(response.data.user)
        }
        getData()
      }
    }, [loading, userToken])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userToken) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text={'Profile'} component={
        <Pressable style={{
          backgroundColor: '#ff5757ff',
          borderRadius: 20,
          padding: 10,
          flexDirection: 'column',
          shadowOpacity: 1,
          shadowOffset: { height: 2, width: 2 },
          shadowRadius: 0,
          borderStyle: 'solid',
          borderWidth: 1,
        }}
          onPress={()=>router.push('/setting')}>
          <MaterialIcons name="logout" size={20} color={'white'} />
        </Pressable>
      } />

      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: data?.coverimage }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20, marginLeft: 10, gap:10 }}>
          <Image
            source={{ uri: data?.profileimage }}
            style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 1, borderColor: 'gray' }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>{data?.organization_name}</Text>
            <Text style={{ fontSize: 12 }}>{data?.email}</Text>
          </View>
          <Pressable style={{ backgroundColor: '#ff5757ff', borderRadius: 20, padding: 5, flexDirection: 'column', shadowOpacity: 1, shadowOffset: { height: 2, width: 2 }, shadowRadius: 0, borderStyle: 'solid', borderWidth: 1, }} >
            <MaterialIcons name="edit" size={18} color={'white'} />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15, marginLeft: 10 }}>
          {data?.badges?.map((b: string) => (
            <View key={b} style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 20, marginRight: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 14 }}>{b}</Text>
            </View>
          ))}
        </View>

        <View style={{marginTop:10 }}>
          <InfoSection title={'About'} content={data?.about}/>
        </View>
        <View style={{marginTop:10 }}>
          <InfoSection title={'Bio'} content={data?.bio}/>
        </View>
        <View style={{marginTop:10 }}>
          <InfoSection title={'Description'} content={data?.description}/>
        </View>
      </View>


    </SafeAreaView >
  );
};

export default ProfileTab;
