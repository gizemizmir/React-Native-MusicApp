import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import MusicItem from "../components/MusicItem";
import { setSearchTracks, setGenres } from "../store";
import { useIsFocused } from "@react-navigation/native";
import PlaylistItem from "../components/PlaylistItem";

const Search = () => {
  const [searchText, SetSearchText] = useState(null);
  const [isSearched, SetIsSearched] = useState(false);
  const theme = useSelector((state) => state.theme.activeTheme);
  const searchTracks = useSelector((state) => state.search.searchTracks);
  const genres = useSelector((state) => state.genres.genreItems);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Searching according to the entered text.
  const handleGetTracks = () => {
    dispatch(setSearchTracks({}));
    if (searchText !== "") {
      axios
        .get(
          `https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${searchText}&type=track`
        )
        .then((response) => {
          // Setting searched Tracks
          dispatch(setSearchTracks({ search: response.data }));
          SetSearchText("");
        });
    } else {
      // If the search input is empty, giving a alert
      Alert.alert("Alert", "Type anything for search");
    }
  };

  const handleGetGenres = () => {
    axios
      .get(
        `https://api.napster.com/v2.2/genres?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=en-EN`
      )
      .then((response) => {
        // Setting searched Genres
        dispatch(setGenres({ genres: response.data.genres }));
      });
  };

  const renderTrackSeparatorItem = () => {
    return <View style={styles.separator} />;
  };

  const renderTrackItem = ({ item }) => {
    return <MusicItem music={item} />;
  };

  const renderGenreItem = ({ item }) => {
    return <PlaylistItem genre={item} />;
  };

  useEffect(() => {
    handleGetGenres();
    SetIsSearched(false);
    if (!isFocused) {
      dispatch(setSearchTracks({}));
    }
  }, [searchTracks, isFocused]);

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={styles.bottomArea}>
        <TextInput
          style={[styles.input, { color: theme.color }]}
          placeholder="Search"
          placeholderTextColor={theme.color}
          clearButtonMode="always"
          value={searchText}
          onFocus={() => {
            SetIsSearched(true);
            dispatch(setSearchTracks({}));
          }}
          onChangeText={(text) => {
            SetSearchText(text);
          }}
          onSubmitEditing={() => handleGetTracks()}
        />
        <Pressable onPress={() => handleGetTracks()}>
          <Ionicons
            style={styles.bottomAreaIcon}
            name="search"
            size={25}
            color="#2385E1"
          />
        </Pressable>
      </View>
      {searchTracks && Object.keys(searchTracks).length !== 0 ? (
        searchTracks?.meta?.totalCount > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.searchFlatList}
            data={searchTracks?.search?.data?.tracks}
            renderItem={renderTrackItem}
            keyExtractor={(item, index) => `Track-${item.id}`}
            ItemSeparatorComponent={renderTrackSeparatorItem}
          />
        ) : (
          <Text style={[styles.searchPageText, { color: theme.color }]}>
            Couldn't Find Any Track
          </Text>
        )
      ) : isSearched ? (
        <Text style={[styles.searchPageText, { color: theme.color }]}>
          Press enter for search...
        </Text>
      ) : (
        <FlatList
          data={genres.slice(0, 8)}
          numColumns={2}
          renderItem={renderGenreItem}
          keyExtractor={(item, index) => `genre-${item.id}`}
          key={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  bottomArea: {
    height: 80,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    margin: 15,
    marginLeft: 0,
    height: 30,
    width: "80%",
    borderColor: "#c4c4c4",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  bottomAreaIcon: {
    marginTop: 15,
    marginLeft: 8,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
  searchPageText: {
    display: "flex",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "50%",
  },
  searchFlatList: {
    paddingHorizontal: 20,
  },
});

export default Search;
