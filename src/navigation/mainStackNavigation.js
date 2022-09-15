import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './bottomTabNavigation';
import SettingsStackNavigation from './settingsStackNavigation';
import { View, Text } from 'react-native';
import {useSelector} from 'react-redux';
import GenreDetails from '../screens/genreDetails';
import SignUpScreen from '../screens/signUp';
import SignInScreen from '../screens/signIn';

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
const theme = useSelector(state => state.theme.activeTheme);
const user = useSelector(state => state.auth.user);

  return (
    <MainStackNav.Navigator
      initialRouteName={'BottomNav'}
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        // Check there is a registered user in State
        <>
        <MainStackNav.Screen name="BottomNav" component={BottomTabNavigation} />
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
            options={{headerShown: false}}
          />
          <MainStackNav.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: true,
              headerTitle: '',
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: '#FFF',
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
