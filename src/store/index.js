import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

import darkTheme from "../constants/theme/dark";
import lightTheme from "../constants/theme/light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    activeTheme: lightTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      return {
        activeTheme:
          state.activeTheme.type === "light" ? darkTheme : lightTheme,
      };
    },
  },
});

const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    playlistItems: [],
  },
  reducers: {
    setPlaylists: (state, action) => {
      const { playlists } = action.payload;
      return {
        playlistItems: playlists,
      };
    },
  },
});

// Used on home screen for song list
const trendingPlaylistSlice = createSlice({
  name: "trendingPlaylist",
  initialState: {
    trendingItems: [],
  },
  reducers: {
    setTrendingPlaylist: (state, action) => {
      const { trendingPlaylist } = action.payload;
      return {
        trendingItems: trendingPlaylist,
      };
    },
  },
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTracks: [],
  },
  reducers: {
    setSearchTracks: (state, action) => {
      const { search } = action.payload;
      return {
        searchTracks: search,
      };
    },
  },
});

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    likeItems: [],
  },
  reducers: {
    addLike: (state, action) => {
      const newLikes = [...state.likeItems];
      newLikes.push(action.payload);

      return {
        likeItems: newLikes,
      };
    },
    deleteLike: (state, action) => {
      const newLikes = [...state.likeItems];
      newLikes.splice(action.payload, 1);

      return {
        likeItems: newLikes,
      };
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      //asyncstorage sil
      state.user = null;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { setPlaylists } = playlistSlice.actions;
export const { setTrendingPlaylist } = trendingPlaylistSlice.actions;
export const { setSearchTracks } = searchSlice.actions;
export const { deleteLike, addLike } = likeSlice.actions;
export const { signIn, logOut } = authSlice.actions;

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice.reducer,
    playlists: playlistSlice.reducer,
    trendingPlaylist: trendingPlaylistSlice.reducer,
    search: searchSlice.reducer,
    likes: likeSlice.reducer,
    auth: authSlice.reducer,
  }),
});
