import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/context/userContext";
import io from "socket.io-client";
import { SafeAreaView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LoadingScreen from "@/components/loading-screen";

export default function ChatScreen() {
    const { userToken, user, logout }: any = useContext(AuthContext);

    const { user: receiver } = useLocalSearchParams();
    const receiverData = JSON.parse(receiver as string);

    const [message, setMessage] = useState<any>();
    const [chat, setChat] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter()

    const socketRef = useRef<any>(null);

    const sender_email = user?.email;
    const receiver_email = receiverData.email;

    useEffect(() => {
        socketRef.current = io("https://founder-backend-l3na.onrender.com");
        return () => socketRef.current.disconnect();
    }, []);

    useEffect(() => {
        if (!socketRef.current || !sender_email) return;

        socketRef.current.emit("join", sender_email);

        socketRef.current.on("receive_message", (data: any) => {
            setChat((prev: any) => [...prev, data]);
        });

        return () => socketRef.current.off("receive_message");
    }, [sender_email]);

    useEffect(() => {
        if (!sender_email || !receiver_email) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://founder-backend-l3na.onrender.com/api/fetch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sender_email, receiver_email }),
                });
                const data = await res.json();

                if (data?.data) {
                    setChat(data.data.reverse());

                    setTimeout(() => {
                        flatListRef.current?.scrollToEnd({ animated: false });
                    }, 100);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [sender_email, receiver_email]);


    const sendMessage = () => {
        if (!message?.trim()) return;

        socketRef.current.emit("send_message", {
            sender_email,
            receiver_email,
            message,
        });

        setMessage("");
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [chat]);


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >

                <View style={{ flex: 1, backgroundColor: "white" }}>

                    <View style={{
                        backgroundColor: '#f2f2f2ff',
                        borderRadius: 20,
                        padding: 10,
                        flexDirection: 'row',
                        shadowOpacity: 1,
                        shadowOffset: { height: 5, width: 5 },
                        shadowRadius: 0,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        elevation: 5,
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 5
                    }}>
                        <Pressable style={{
                            backgroundColor: 'gray',
                            borderRadius: 20,
                            padding: 5,
                            flexDirection: 'column',
                            shadowOpacity: 1,
                            shadowOffset: { height: 2, width: 2 },
                            shadowRadius: 0,
                            borderStyle: 'solid',
                            borderWidth: 1,
                        }}
                            onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color={'white'} />
                        </Pressable>
                        <Image
                            source={{ uri: receiverData?.profileimage }}
                            style={{ height: 40, width: 40, borderRadius: 50 }}
                        />
                        <View>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>
                                {receiverData?.organization_name}
                            </Text>
                            <Text style={{ color: 'black', fontSize: 10 }}>
                                {receiverData?.city}
                            </Text>
                        </View>
                    </View>

                    {loading ? <LoadingScreen /> :

                        <FlatList
                            ref={flatListRef}
                            data={chat}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ padding: 15 }}
                            keyExtractor={(_, index) => index.toString()}
                            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
                            renderItem={({ item }) => {
                                const isMe = item.sender_email === sender_email;
                                return (
                                    <View style={{ marginBottom: 5, alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                                        <Text style={{ fontSize: 12, marginBottom: 2, textAlign: isMe ? "right" : "left" }}>
                                            {isMe ? "You" : item.sender_email}
                                        </Text>
                                        <View style={{
                                            backgroundColor: isMe ? "#f0f0f0" : "#E9FFD8",
                                            padding: 10,
                                            borderRadius: 8,
                                            shadowOffset: isMe ? { height: 2, width: 2 } : { height: 2, width: -2 },
                                            shadowOpacity: 5,
                                            shadowRadius: 0,
                                            borderWidth: 1
                                        }}>
                                            <Text>{item.message}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    }


                    <View style={{ flexDirection: "row", padding: 15, borderTopWidth: 1, borderColor: "#ddd" }}>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type a message"
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "black",
                                padding: 10,
                                borderRadius: 20,
                                marginRight: 10,
                                shadowOpacity: 1,
                                shadowOffset: { height: 1, width: -0.5 },
                                shadowRadius: 0,
                                borderStyle: 'solid',
                                elevation: 5,
                                backgroundColor: 'white'
                            }}
                        />
                        <Pressable
                            onPress={sendMessage}
                            style={{
                                backgroundColor: "#dbdbdb", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,
                                shadowOpacity: 1,
                                shadowOffset: { height: 2, width: 2 },
                                shadowRadius: 0,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                elevation: 5,
                            }}
                        >
                            <Text style={{ color: 'black' }} >Send</Text>
                        </Pressable>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}
