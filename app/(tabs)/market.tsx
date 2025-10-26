import React, { useCallback, useState } from "react";
import { View, FlatList, Dimensions, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MarketCard from "@/components/MarketCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width *0.95;
const CARD_SPACING = (width - CARD_WIDTH) / 2;

export default function Market() {
  const [data, setData] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
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
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <FlatList
        data={data}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 20} // card width + margin
        contentContainerStyle={{ paddingHorizontal: CARD_SPACING }}
        renderItem={({ item }) => <MarketCard data={item} />}
      />
    </SafeAreaView>
  );
}
