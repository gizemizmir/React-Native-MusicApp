import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const {navigate} = useNavigation();

  return (
    <View>
      <Text>Profile</Text>
      <Text onPress={() => navigate('Settings')}>Go to Settings</Text>
    </View>
  )
}

export default Profile