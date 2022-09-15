import { View, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MusicItem from "../components/MusicItem";
import axios from "axios";
import { useSelector } from "react-redux";

const GenreDetails = () => {
  const {
    params: { genreDetails, playlistDetails },
  } = useRoute();
  const theme = useSelector((state) => state.theme.activeTheme);

  const navigation = useNavigation();
  const [tracks, setTracks] = useState([]);

  // Getting tracks of selected playlist
  const handleGetPlaylistMusic = () => {
    axios
      .get(
        `http://api.napster.com/v2.2/playlists/${playlistDetails.id}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=15`
      )
      .then((response) => {
        setTracks(response.data.tracks);
      });
  };

  // Getting tracks of selected genre
  const handleGetGenreMusic = () => {
    axios
      .get(
        `http://api.napster.com/v2.2/genres/${genreDetails.id}/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=15`
      )
      .then((response) => {
        setTracks(response.data.tracks);
      });
  };

  // Searching playlits.
  useEffect(() => {
    if (playlistDetails) {
      handleGetPlaylistMusic();
    } else if (genreDetails) {
      handleGetGenreMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: playlistDetails?.name || genreDetails?.name,
    });
  }, []);

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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tracks}
        renderItem={renderMusicItem}
        keyExtractor={(item, index) => `music-${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  musicContainer: {
    flex: 1,
    padding: 30,
  },
});

export default GenreDetails;
