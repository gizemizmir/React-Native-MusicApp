import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylists, setTrendingPlaylist } from "../store";
import PlaylistItem from "../components/PlaylistItem";
import MusicItem from "../components/MusicItem";

const Home = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const playlists = useSelector((state) => state.playlists.playlistItems);
  const trendingPlaylist = useSelector(
    (state) => state.trendingPlaylist.trendingItems
  );
  const dispatch = useDispatch();

  // Getting playlist
  const handleGetPlaylists = () => {
    axios
      .get(
        `http://api.napster.com/v2.2/playlists?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=6`
      )
      .then((response) => {
        dispatch(setPlaylists({ playlists: response.data.playlists }));
      });
  };

  // Getting Global Trending Playlist
  const handleGetTrendingMusic = () => {
    axios
      .get(
        `http://api.napster.com/v2.2/playlists/pp.222517949/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10`
      )
      .then((response) => {
        dispatch(
          setTrendingPlaylist({ trendingPlaylist: response.data.tracks })
        );
      });
  };

  // Searching playlits.
  useEffect(() => {
    handleGetPlaylists();
    handleGetTrendingMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPlaylistItem = ({ item }) => {
    return <PlaylistItem playlist={item} />;
  };

  const renderMusicItem = ({ item }) => {
    return <MusicItem music={item} />;
  };

  const flatHeaderComponent = () => {
    return (
      <View style={styles.playlistContainer}>
        <Text style={[styles.playlistTitle, { color: theme.color }]}>
          Playlist / Categories
        </Text>
        <FlatList
          numColumns={2}
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item, index) => `playlist-${item.id}`}
        />
        <Text style={[styles.musicTitle, { color: theme.color }]}>
          Global Trending
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.homeContainer, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.musicContainer}>
        <FlatList
          ListHeaderComponent={flatHeaderComponent}
          data={trendingPlaylist}
          renderItem={renderMusicItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `music-${item.id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 30,
  },
  playlistTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  musicTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
  musicContainer: {
    flex: 1,
  },
});

export default Home;
