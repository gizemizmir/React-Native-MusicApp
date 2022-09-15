import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import styles from "./MusicItem.style";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addLike, deleteLike } from "../../store";

const MusicItem = ({ music }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.activeTheme);
  const likes = useSelector((state) => state.likes.likeItems);
  const isLiked = likes?.find((like) => like.id === music.id);
  const index = likes.indexOf(isLiked);

  const deleteLikeFromState = (selectedMusic) => {
    const index = likes.indexOf(selectedMusic);
    if (index > -1) {
      dispatch(deleteLike(index));
    }
  }

  useEffect(() => {
  }, [likes, isLiked]);
  return (
    <View style={styles.musicItem}>
      <Image
        style={styles.musicImage}
        source={{
          uri: `https://api.napster.com/imageserver/v2/albums/${music.albumId}/images/200x200.jpg`,
        }}
      />
      <View style={styles.musicDetails}>
        <Text
          numberOfLines={2}
          style={[styles.musicName, { color: theme.color }]}
        >
          {music.name}
        </Text>
        <Text style={[styles.musicArtist, { color: theme.color }]}>
          {music.artistName}
        </Text>
      </View>
      <View style={styles.musicLike}>
        {isLiked ? (
          <Ionicons
            name="ios-heart"
            size={25}
            color={theme.color}
            onPress={() => deleteLikeFromState(music)}
          />
        ) : (
          <Ionicons
            name="ios-heart-outline"
            size={25}
            color={theme.color}
            onPress={() => dispatch(addLike(music))}
          />
        )}
      </View>
    </View>
  );
};

export default MusicItem;
