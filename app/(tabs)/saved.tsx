import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import MovieCard from "../components/MovieCard";
import BackButton from "../components/backButton";

const KEY = "fav_list";

const Saved = () => {
  const [list, setList] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const readFavs = async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      await AsyncStorage.removeItem(KEY);
      return [];
    }
  };

  const loadFavs = async () => {
    setLoading(true);
    const data = await readFavs();
    setList(data);
    setLoading(false);
  };

  // يحدث كل ما تفتح أو ترجع للصفحة
  useFocusEffect(
    useCallback(() => {
      loadFavs();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavs();
    setRefreshing(false);
  };

  const removeOne = async (id) => {
    const curr = await readFavs();
    const next = curr.filter((m) => m.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    setList(next);
  };

  const clearAll = async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify([]));
    setList([]);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Saved" }} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0b1220",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Saved",
          headerStyle: { backgroundColor: "#0b1220" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <View style={{ flex: 1, backgroundColor: "#0b1220", padding: 16 }}>
        {list.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
              No saved movies yet
            </Text>
            <Text style={{ color: "#bbb", textAlign: "center" }}>
              Add movies to your favorites from the details page to see them
              here.
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View style= {{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <BackButton />
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}
                >
                  Your Favorites ({list.length})
                </Text>
              </View>
              <TouchableOpacity
                onPress={clearAll}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                <Text style={{ color: "#fff" }}>Clear All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={list}
              keyExtractor={(item) => String(item.id)}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-evenly",
                marginBottom: 12,
              }}
              renderItem={({ item }) => (
                <MovieCard
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  release_date={item.release_date}
                  showHeart
                  onHeartPress={() => removeOne(item.id)} // ← أهم سطر
                />
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          </>
        )}
      </View>
    </>
  );
};

export default Saved;
