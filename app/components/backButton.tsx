import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // useRouter if you use Expo Router

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        marginRight: 10
      }}
    >
      <MaterialIcons name="arrow-back" size={24} color={"#fff"} />
    </TouchableOpacity>
  );
};

export default BackButton;
const styles = StyleSheet.create({});
