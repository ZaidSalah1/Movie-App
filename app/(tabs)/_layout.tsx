import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          resizeMode="stretch"
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center
              items-center align-center rounded-full overflow-hidden "
        >
          <Image
            source={icon}
            className="size-5"
            style={{ tintColor: "#151312" }}
          />
          <Text className="text-secondary text-base font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      </>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor={"#A8B5DB"} className="size-5" />
    </View>
  );
};

const _layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          // بدون padding عمودي عشان أيقونة/حبة تاخذ ارتفاع الشريط كله
          paddingVertical: 0,
        },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Math.max(16, insets.bottom + 8),
          paddingBottom: 8 + insets.bottom,

          height: 64,
          backgroundColor: "#0f0d23",
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#26243d",
          paddingHorizontal: 8,
          // مهم عشان الحبة ما تطلع برا الزوايا الدائرية
          overflow: "hidden",

          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
