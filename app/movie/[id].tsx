import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


import BackButton from "../components/backButton";

const KEY = "fav_list";

const MovieDetails = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams<{ id: string }>();

  // hook 1: جلب بيانات الفيلم
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(String(id)), true);

  const [isFav, setIsFav] = useState(false);

  const readFavs = async () => {
    const raw = await AsyncStorage.getItem(KEY);

    if (!raw) return [];

    try {
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch {
      await AsyncStorage.removeItem(KEY);
      return [];
    }
  };

  useEffect(() => {
    if (!movie) return;
    (async () => {
      const list = await readFavs();
      setIsFav(list.some((m) => m.id === movie.id));
    })();
  }, [movie?.id]);

  const toggleFav = async () => {
    if (!movie) return;

    const list = await readFavs();

    const exists = list.some((m) => m.id === movie.id);

    const next = exists
      ? list.filter((m) => m.id !== movie.id)
      : [
          ...list,
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
        ];

    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    setIsFav(!exists);
    console.log(exists ? "Removed from favs" : "Added to favs");
  };

  const logFavs = async () => {
    const list = await readFavs();
    console.log("FAVS ->\n", JSON.stringify(list, null, 2));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>
          {error ? error.message : "Movie Not Found"}
        </Text>
      </View>
    );
  }

  // تجهيز الصورة
  const imagePath = movie.backdrop_path ?? movie.poster_path;
  const imageUri = imagePath
    ? `https://image.tmdb.org/t/p/w500${imagePath}`
    : "https://placehold.co/800x450/1a1a1a/ffffff.png?text=No+Image";

return (
  <>
    {/* Hide the default header from the Stack Navigator */}
    <Stack.Screen options={{ headerShown: false }} />

    {/* Main screen container with safe area and background color */}
    <SafeAreaView className="flex-1 bg-primary">

      {/* Root container for all content */}
      <View style={{ flex: 1, position: "relative" }}>
        
        {/* Scrollable content (to handle long movie details) */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Movie poster section with back button */}
          <View>
            {/* Main movie poster image */}
            <Image
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={styles.hero}
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
            />

            {/* Back button (absolute position over the image) */}
            <View style= {{
              position:'absolute',
              padding: 15
              
              }}>
              <BackButton/>
            </View>
          </View>

          {/* Movie details section */}
          <View className="px-8 py-10">
            
            {/* Movie title + favorite button */}
            <View className="flex-row gap-2 items-center">
              <Text className="text-white text-2xl">{movie.title}</Text>
              <MaterialIcons
                name={isFav ? "favorite" : "favorite-outline"}
                size={30}
                color={isFav ? "#ff4f6d" : "#AB8Bff"}
                onPress={toggleFav}
              />
            </View>

            {/* Release date */}
            <Text className="text-light-200 mt-2 mb-4">
              {movie.release_date}
            </Text>

            {/* Rating box */}
            <View
              className="flex-row"
              style={{
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                alignSelf: "flex-start",
                paddingHorizontal: 15,
                paddingVertical: 6,
              }}
            >
              <Image source={icons.star} className="mr-2" />
              <Text className="text-white mr-4">
                {Math.round(movie.vote_average)}/10
              </Text>
              <Text className="text-light-300">
                ({movie.vote_count.toLocaleString()} votes)
              </Text>
            </View>

            {/* Movie overview/description */}
            <Text className="text-light-300 text-base py-7 pb-5">
              {movie.overview}
            </Text>
          </View>
        </ScrollView>

        {/* Fixed button at the bottom */}
        <Button
          icon="eye"
          mode="contained"
          onPress={logFavs}
          textColor="white"
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            borderRadius: 10,
          }}
          contentStyle={{ paddingVertical: 8 }}
        >
          Watch Movie
        </Button>
      </View>
    </SafeAreaView>
  </>
);

};

export default MovieDetails;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: "100%",
    height: 340,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
});
