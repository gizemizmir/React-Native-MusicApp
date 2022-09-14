import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import { View, Text } from 'react-native';
import SettingsScreen from '../screens/settings';
import { useSelector } from 'react-redux';

const EmptyScreen = () => {
    return (
      <View>
        <Text>Set Empty  Screen</Text>
      </View>
    );
  };

const SettingsStackNav = createStackNavigator();
const SettingsStackNavigation = () => {
  const theme = useSelector(state => state.theme.activeTheme);

  return (
    <SettingsStackNav.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <SettingsStackNav.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
            headerBackTitle: 'Profile',
            headerTitle: 'Settings',
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            },
            headerTitleStyle: {
              color: theme.color,
            },
          }}
      />
      <SettingsStackNav.Screen
        name="ThemeSettingsScreen"
        component={EmptyScreen}
        options={{
          headerTitle: 'Theme Setting',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
      />
      <SettingsStackNav.Screen
        name="ProfileSettingsScreen"
        component={EmptyScreen}
        options={{
          headerTitle: 'Profile Setting',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
      />
    </SettingsStackNav.Navigator>
  );
};

export default SettingsStackNavigation;
