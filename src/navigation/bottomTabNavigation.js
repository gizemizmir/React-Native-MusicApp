import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
import { useSelector } from "react-redux";
import SearchScreen from "../screens/search";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const BottomNav = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const { navigate } = useNavigation();

  const profileHeaderRight = () => {
    return (
      <Ionicons
        style={styles.settingIcon}
        name="settings-sharp"
        size={25}
        color={theme.color}
        onPress={() => navigate("Settings")}
      />
    );
  };

  return (
    <BottomNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.backgroundColor },
        tabBarInactiveTintColor: theme.color,
      }}
    >
      <BottomNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-sharp" size={25} color={theme.color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: () => (
            <Ionicons name="search-sharp" size={25} color={theme.color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="Profile"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerRight: profileHeaderRight,
          tabBarIcon: () => (
            <Ionicons name="person" size={25} color={theme.color} />
          ),
        }}
        component={ProfileScreen}
      />
    </BottomNav.Navigator>
  );
};

const styles = StyleSheet.create({
  settingIcon: {
    marginRight: 20,
  },
});
export default BottomTabNavigation;
