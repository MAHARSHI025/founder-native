import { AuthContext } from "@/context/userContext";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

const ProfileTab: React.FC = () => {
  const { userToken, user, loading, logout }: any = useContext(AuthContext);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (!loading && !userToken) {
        router.push("/login");
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", color: "black" }}>
        Welcome, {user?.organization_name || "User"} 👋
      </Text>
      <Text style={{ color: "gray" }}>{user?.email}</Text>
      <Button title="Logout" color={"red"} onPress={logout} />
    </View>
  );
};

export default ProfileTab;
