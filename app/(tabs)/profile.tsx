import Header from "@/components/header";
import MarketCard from "@/components/MarketCard";
import { AuthContext } from "@/context/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { ActivityIndicator, Button, Pressable, Text, View } from "react-native";
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
          onPress={logout}>
          <MaterialIcons name="logout" size={20} color={'white'} />
        </Pressable>
      } />


      <MarketCard data={data} />

    </SafeAreaView>
  );
};

export default ProfileTab;
