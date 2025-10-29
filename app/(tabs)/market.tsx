import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Dimensions, Alert, ScrollView } from "react-native";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MarketCard from "@/components/MarketCard";
import Header from "@/components/header";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.95;
const CARD_SPACING = (width - CARD_WIDTH) / 2;

export default function Market() {
  const [data, setData] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://founder-weld.vercel.app/api/market/get",
            { limit: 0, excludeIds: [] }
          );
          setData(response.data.allUser || []);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to fetch data");
        }
      };
      fetchData();
    }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ padding: 10 }}
        >
          <>
            <Header />
            {data.map((item,i) =>
              <MarketCard data={item} key={i} />
            )}
          </>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
