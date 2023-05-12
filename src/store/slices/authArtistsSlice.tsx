/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import type { IRequestMainPainting } from '@types';

import { pathChoiceMainPainting } from '@/api/auth';

export type AuthArtist = {
  isLoading: boolean;
  isError: boolean;
  currentPainting: string;
};

export const choiceMainPainting = createAsyncThunk(
  'artists/main-painting',
  async ({ id, artistId }: IRequestMainPainting) =>
    pathChoiceMainPainting({ id, artistId })
);

const initialState: AuthArtist = {
  isLoading: false,
  isError: false,
  currentPainting: '',
};

const authArtistsSlice = createSlice({
  name: 'auth/artists',
  initialState,
  reducers: {
    addCurrentPainting(state, action: PayloadAction<string>) {
      state.currentPainting = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(choiceMainPainting.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(choiceMainPainting.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(choiceMainPainting.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = authArtistsSlice;

export const { addCurrentPainting } = actions;

export default reducer;
