import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./bottomTabNavigation";
import SettingsStackNavigation from "./settingsStackNavigation";
import { useDispatch, useSelector } from "react-redux";
import GenreDetails from "../screens/genreDetails";
import SignUpScreen from "../screens/signUp";
import SignInScreen from "../screens/signIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "../store";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue != null) {
      // Incoming data is saved to Global State
      dispatch(signIn(JSON.parse(jsonValue)));
    }
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user?.email, user?.password).then(
      (response) => {
        // Sign in
      }
    );
  };

  useEffect(() => {
    getData();
    if (user && user.email) {
      handleSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainStackNav.Navigator
      initialRouteName={"BottomNav"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        // Check there is a registered user in State
        <>
          <MainStackNav.Screen
            name="BottomNav"
            component={BottomTabNavigation}
          />
          <MainStackNav.Screen
            name="GenreDetails"
            component={GenreDetails}
            options={{
              headerShown: true,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: theme.backgroundColor,
              },
              headerTitleStyle: {
                color: theme.color,
              },
            }}
          />
          <MainStackNav.Screen
            name="Settings"
            component={SettingsStackNavigation}
          />
        </>
      ) : (
        <>
          <MainStackNav.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <MainStackNav.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#FFF",
                shadowOpacity: 0,
              },
            }}
          />
        </>
      )}
    </MainStackNav.Navigator>
  );
};

export default MainStackNavigation;
