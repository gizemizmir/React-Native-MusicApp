import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
import { useSelector } from "react-redux";
import SearchScreen from "../screens/search";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, View, Text } from "react-native";

const BottomNav = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);
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

  const profileHeaderLeft = () => {
    return (
     <View style={styles.profileInfo}>
       <Image
          style={styles.profileImage}
          source={{ uri: "https://i.pravatar.cc/100?img=2" }}
        />
        <Text  style={styles.profileEmail}>{user.email}</Text>
     </View>
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
          headerTitle: "",
          headerLeft: profileHeaderLeft,
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
  profileInfo: {
    flex:1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileImage: {
    width:30,
    height:30,
    borderRadius:30,
    marginLeft:20
  },
  profileEmail: {
    fontSize:16,
    fontWeight: "bold",
    marginLeft:10,
  }
});
export default BottomTabNavigation;
