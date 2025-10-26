import React, { useContext, useEffect, useState } from "react";
import { Button, View, Alert, Platform, TextInput, Text, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { ThemedText } from "@/components/themed-text";
import axios from "axios";
import { AuthContext } from "@/context/userContext";



export default function LoginScreen() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { login, logout, user, userToken } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response: any = await axios.post(
                "https://founder-weld.vercel.app/api/user/login",
                { email, password: pass }
            );
            

            const { _id, organization_name } = response.data.user;

            if (!_id || !organization_name) {
                return Alert.alert("Login failed");
            }

            await login(_id, { email, organization_name });

            Alert.alert("Login successful!");

        } catch (err: any) {
            console.error(err);
            Alert.alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>

                <Text style={{ fontSize: 40, color: 'white', marginBottom: 30 }}>Login</Text>

                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{ color: 'white', borderColor: 'white', borderStyle: 'solid', borderWidth: 1, padding: 10, width: '60%', borderRadius: 10, fontSize: 15 }} />
                <TextInput value={pass} onChangeText={(text) => setPass(text)} placeholder="Password" style={{ color: 'white', borderColor: 'white', borderStyle: 'solid', borderWidth: 1, padding: 10, width: '60%', borderRadius: 10, fontSize: 15 }} />

                <TouchableOpacity
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 12,
                        paddingHorizontal: 30,
                        borderRadius: 10,
                        marginTop: 10,
                    }}
                    onPress={handleLogin}
                >
                    <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
