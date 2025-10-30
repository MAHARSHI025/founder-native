import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, FlatList } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import MarketCard from "@/components/MarketCard";
import Header from "@/components/header";

export default function Market() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 4; 

  const fetchUsers = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const excludeIds = users.map(u => u._id);

      const response = await axios.post(
        "https://founder-weld.vercel.app/api/market/get",
        { limit, excludeIds }
      );

      const newUsers = response.data.allUser || [];

      setUsers(prev => [...prev, ...newUsers]);
      setHasMore(newUsers.length === limit);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Load more when scrolling to bottom
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const renderFooter = () =>
    loading ? (
      <View style={{ padding: 15, alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <FlatList
        data={users}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => <MarketCard data={item} />}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
