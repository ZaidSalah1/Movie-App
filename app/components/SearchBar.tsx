import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

// What this inteface dose is to tell the react native what this props types
interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (test: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        value={value} // ✅ يستعمل القيمة الجاية من الخارج
        onChangeText={onChangeText} // ✅ يغير القيمة من الخارج
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
