/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { IArtist, IOneArtist } from '@types';

import { getArtists, getArtist } from '@/api/artist/index';
import { getAuthArtists, getAuthArtist } from '@/api/auth';

export type ArtistsState = {
  artists: IArtist[];
  artist: IOneArtist;
  isLoading: boolean;
  isError: boolean;
  isUser: boolean;
};

export type OneArtist = {
  id: string;
  isAuth: boolean;
};

export const getAllArtists = createAsyncThunk(
  'artists/getArtists',
  async (isAuth: boolean) => {
    if (isAuth) {
      return getAuthArtists();
    }
    return getArtists();
  }
);

export const getOneArtist = createAsyncThunk(
  'artists/getArtist',
  async ({ id, isAuth }: OneArtist) => {
    if (isAuth) {
      return getAuthArtist(id);
    }
    return getArtist(id);
  }
);

const initialState: ArtistsState = {
  artists: [],
  artist: {} as IOneArtist,
  isLoading: false,
  isError: false,
  isUser: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllArtists.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(getAllArtists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = action.payload;
      })

      .addCase(getAllArtists.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getOneArtist.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getOneArtist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artist = action.payload;
      })

      .addCase(getOneArtist.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addDefaultCase(() => {});
  },
});

const { reducer } = artistsSlice;

export default reducer;
