import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./MusicItem.style";
import { useSelector } from "react-redux";

const MusicItem = ({ music }) => {
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <View style={styles.musicItem}>
      <Image
        style={styles.musicImage}
        source={{ uri: `https://api.napster.com/imageserver/v2/albums/${music.albumId}/images/200x200.jpg` }}
      />
      <View style={styles.musicDetails}>
        <Text style={[styles.musicName, { color: theme.color }]}>
          {music.name}
        </Text>
        <Text
          style={[styles.musicArtist, { color: theme.color }]}
        >
          {music.artistName}
        </Text>
      </View>
    </View>
  );
};

export default MusicItem;
