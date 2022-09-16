import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import MusicItem from "../components/MusicItem";

const Profile = () => {
  const likes = useSelector((state) => state.likes.likeItems);
  const theme = useSelector((state) => state.theme.activeTheme);

  const renderMusicItem = ({ item }) => {
    return <MusicItem music={item} />;
  };

  return (
    <View
      style={[
        styles.musicContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <Text style={[styles.pageTitle, { color: theme.color }]}>
        Liked Songs
      </Text>
      {Object.keys(likes).length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={likes}
          renderItem={renderMusicItem}
          keyExtractor={(item, index) => `music-${item.id}`}
        />
      ) : (
        <Text style={[styles.profilePageText, { color: theme.color }]}>
          Couldn't Find Any Likes
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  musicContainer: {
    flex: 1,
    padding: 30,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePageText: {
    display: "flex",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "50%",
  },
});

export default Profile;
