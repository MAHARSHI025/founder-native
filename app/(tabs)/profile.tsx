import LoginScreen from "@/components/login-screen";
import { AuthContext } from "@/context/userContext";
import React, { useContext } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

const ProfileTab: React.FC = () => {
  const { userToken, user, loading, logout }:any = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userToken) {
    console.log('hello');
    
    return <LoginScreen />;
  }

  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", color:'white' }}>
        Welcome, {user?.organization_name || "User"} 👋
      </Text>
      <Text style={{ color: "gray" }}>{user?.email}</Text>
      <Button title="Logout" color={'red'} onPress={logout}></Button>
    </View>
  );
};

export default ProfileTab;
