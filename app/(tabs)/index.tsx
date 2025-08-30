import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import SearchBar from "../components/SearchBar";

import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

import MovieCard from "@/app/components/MovieCard";

import { fetchMovieDetails } from "@/services/api";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} style={styles.bg} resizeMode="stretch" />

      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 selft-center"
          />
        ) : moviesError ? (
          <Text>{moviesError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies ?? []}
                keyExtractor={(item) => String(item.id)}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                  <MovieCard
                    id={item.id}
                    title={item.title}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                  />
                )}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // مثال
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
});
