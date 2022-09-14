import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './bottomTabNavigation';
import SettingsStackNavigation from './settingsStackNavigation';
import { View, Text } from 'react-native';
import {useSelector} from 'react-redux';
import GenreDetails from '../screens/genreDetails';

const EmptyScreen = () => {
    return (
      <View>
        <Text>Empty Screen</Text>
      </View>
    );
  };

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
const theme = useSelector(state => state.theme.activeTheme);
const user = {};

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
            component={EmptyScreen}
            options={{headerShown: false}}
          />
          <MainStackNav.Screen
            name="SignUp"
            component={EmptyScreen}
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
