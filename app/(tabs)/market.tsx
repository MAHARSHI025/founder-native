import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, FlatList, Pressable } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import MarketCard from "@/components/MarketCard";
import Header from "@/components/header";
import HapticButton from "@/components/haptic-button";
import { Icon } from "expo-router/unstable-native-tabs";
import { IconSymbol } from "@/components/ui/icon-symbol";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import LoadingScreen from "@/components/loading-screen";

export default function Market() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter()
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
      <LoadingScreen />
    ) : null;

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Header text={'Market'} component={<>
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
          onPress={() => router.push('/contact')}
        >
          <MaterialIcons name="people" size={20} color="white" />
        </Pressable>
      </>} />

      <FlatList
        data={users}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => <MarketCard data={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        style={{marginBottom:50}}
      />
    </SafeAreaView>
  );
}
