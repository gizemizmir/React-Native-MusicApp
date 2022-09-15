import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "./PlaylistItem.style";
import { useNavigation } from "@react-navigation/core";

const PlaylistItem = ({ playlist, genre }) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.playlistContainer}>
      {playlist ? (
        <Pressable
          style={styles.playlistButton}
          onPress={() => navigate("GenreDetails", { playlistDetails: playlist })}
        >
          <Text style={styles.playlistText}>{playlist.name}</Text>
        </Pressable>
      ) : genre ? (
        <Pressable
          style={styles.genreButton}
          onPress={() => navigate("GenreDetails", { genreDetails: genre })}
        >
          <Text style={styles.genreText}> {genre.name}</Text>
        </Pressable>
      ) : (
        ""
      )}
    </View>
  );
};

export default PlaylistItem;
