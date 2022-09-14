import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Settings = () => {
    const {navigate} = useNavigation();

  return (
    <View>
      <Text>Settings</Text>
      <Text onPress={() => navigate('ThemeSettingsScreen')}>Go to Theme</Text>
    </View>
  )
}

export default Settings