import React, { useCallback, useState } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect } from "expo-router";

interface Message {
  message: string;
}

export default function Market() {
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://founder-backend-l3na.onrender.com/api/fetch",
            {
              sender_email: "starbucks@gmail.com",
              receiver_email: "sal@gmail.com",
            }
          );
          console.log(response);
          
          setData(response.data.data);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to fetch data");
        }
      };

      fetchData();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      {data.map((msg:any, i) => (
        <Text key={i} style={{color:'white'}}>{msg.message}</Text>
      ))}
    </View>
  );
}
