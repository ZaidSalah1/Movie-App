import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(String(id)), true);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.center}>
        <Text>{error ? error.message : "Movie Not Found"}</Text>
      </View>
    );
  }

  // If the value in the left is null or undefind then use the right
  const imagePath = movie.backdrop_path ?? movie.poster_path;

  const imageUri = imagePath
    ? `https://image.tmdb.org/t/p/w500${imagePath}`
    : "https://placehold.co/800x450/1a1a1a/ffffff.png?text=No+Image";

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView contentContainerStyle={{}}>
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={styles.hero}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
          <View className="px-8 py-10">
            <Text className="text-white text-2xl">{movie.title}</Text>
            <Text className="text-light-200 mt-2 mb-4">
              {movie.release_date}
            </Text>

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

            <Text className="text-light-300 text-base py-7 pb-5">{movie.overview}</Text>
          </View>
        </ScrollView>
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
    borderBottomLeftRadius: 16, // ⬅️ مهم جداً
  },
});
