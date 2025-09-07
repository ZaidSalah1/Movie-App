import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { icons } from "@/constants/icons";

const MovieCard = (props) => {
  const {
    id,
    poster_path,
    title,
    vote_average,
    release_date,
    showHeart,
    onHeartPress,
  } = props;

  const imageUri = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/ffffff.png?text=No+Image";

  const rating = Math.round((Number(vote_average) || 0) / 2);
  const year = release_date ? release_date.split("-")[0] : "—";

  return (
    // الغلاف الخارجي نفسه (يحافظ على العرض والمسافات)
    <View className="w-[30%] mb-5 relative" pointerEvents="box-none">
      {/* الكارد القابل للتنقّل كما هو */}
      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className="w-full">
          <View className="relative w-full h-52">
            <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" />
          </View>

          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center gap-x-2 mt-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {rating}
            </Text>
          </View>

          <Text className="text-xs text-light-300 font-medium mt-1">{year}</Text>
        </TouchableOpacity>
      </Link>

      {/* زرّ القلب: خارج الـLink لكن فوقه بصريًا — نفس المكان والتصميم */}
      {showHeart && (
        <Pressable
          className="absolute top-2 right-2 bg-black/50 p-1 rounded-full z-10"
          onPress={(e) => {
            e.stopPropagation?.();     // يمنع انتقال الحدث للـLink
            onHeartPress?.();
          }}
          onPressIn={(e) => e.stopPropagation?.()}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          pointerEvents="box-only"    // يتعامل مع اللمس فقط على مساحة القلب
        >
          <MaterialIcons name="favorite" size={24} color="#ff4f6d" />
        </Pressable>
      )}
    </View>
  );
};

export default MovieCard;
