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

const searchSlice = createSlice({
    name: 'search',
    initialState: {
      searchTracks: [],
    },
    reducers: {
        setSearchTracks: (state, action) => {
        const {search} = action.payload;
        return {
            searchTracks: search,
        };
      },
    },
  });

export const { toggleTheme } = themeSlice.actions;
export const { setPlaylists } = playlistSlice.actions;
export const {setSearchTracks} = searchSlice.actions;

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice.reducer,
    playlists: playlistSlice.reducer,
    search: searchSlice.reducer,
  }),
});
