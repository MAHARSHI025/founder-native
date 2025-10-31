import React, { useContext, useEffect, useState } from "react";
import { Button, View, Alert, Platform, TextInput, Text, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { ThemedText } from "@/components/themed-text";
import axios from "axios";
import { AuthContext } from "@/context/userContext";
import { useRouter } from "expo-router";



export default function SignupScreen({setAction}:any) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const { login, logout, user, userToken } = useContext(AuthContext);
    const router = useRouter()

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12, display: 'flex' }}>

                <Text style={{ fontSize: 50, color: 'black', marginBottom: 30, fontWeight: '700', fontFamily: 'MozillaHeadline-bold' }}>Signup</Text>

                <TextInput placeholderTextColor={'#888888ff'} value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{
                    color: 'black', borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 10, width: '70%', borderRadius: 10, fontSize: 18, shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 0,
                    backgroundColor: 'white'
                }} />
                <TextInput placeholderTextColor={'#888888ff'} value={username} onChangeText={(text) => setUsername(text)} placeholder="Username" style={{
                    color: 'black', borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 10, width: '70%', borderRadius: 10, fontSize: 18, shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 0,
                    backgroundColor: 'white'
                }} />
                <TextInput placeholderTextColor={'#888888ff'} value={pass} onChangeText={(text) => setPass(text)} placeholder="Password" style={{
                    color: 'black', borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 10, width: '70%', borderRadius: 10, fontSize: 18, shadowOpacity: 1,
                    shadowOffset: { height: 2, width: 2 },
                    shadowRadius: 0,
                    backgroundColor: 'white'
                }} />

                <TouchableOpacity
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 12,
                        paddingHorizontal: 30,
                        borderRadius: 10,
                        marginTop: 20,
                        width: '70%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOpacity: 1,
                        shadowOffset: { height: 2, width: 2 },
                        shadowRadius: 0,
                        borderStyle: 'solid',
                        borderWidth: 1,
                    }}
                    onPress={handleLogin}
                >
                    <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
                        Signup
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={()=>setAction('login')}
                >
                    <Text style={{ color: "black"}}>
                        Already have a account ?  Login
                    </Text>
                </TouchableOpacity>

            </View>
        </>
    );
}
