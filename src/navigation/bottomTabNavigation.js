import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import {useSelector} from 'react-redux';
import SearchScreen from '../screens/search';

const BottomNav = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useSelector(state => state.theme.activeTheme);

  return (
    <BottomNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {backgroundColor: theme.backgroundColor},
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
          tabBarLabel: 'Home',
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
          tabBarIcon: () => (
            <Ionicons name="person" size={25} color={theme.color} />
          ),
        }}
        component={ProfileScreen}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabNavigation;
