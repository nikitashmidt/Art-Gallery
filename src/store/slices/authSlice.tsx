/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { IUserRequest, IRefreshRequest } from '@types';

import { authRegister, authLogin, authRefresh } from '@/api/auth/authPost';
import { removeTokens, addTokens } from '@/services';

export type AuthState = {
  isLoading: boolean;
  isUser: boolean;
  error: string;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: IUserRequest) => authRegister(data)
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: IUserRequest) => authLogin(data)
);

export const postRefreshToken = createAsyncThunk(
  'auth/refresh',
  async (data: IRefreshRequest) => authRefresh(data)
);

const initialState: AuthState = {
  isLoading: false,
  isUser: false,
  error: '',
};

const authSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    logOutUser(state) {
      removeTokens();
      state.isUser = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.isUser = true;
        addTokens(action.payload.refreshToken, action.payload.accessToken);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isUser = false;
        state.isLoading = false;
        state.error = action.error.message || '';
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.isUser = true;
        addTokens(action.payload.refreshToken, action.payload.accessToken);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isUser = false;
        state.isLoading = false;
        state.error = action.error.message || '';
      })

      .addCase(postRefreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })

      .addCase(postRefreshToken.fulfilled, (state, action) => {
        state.isUser = true;
        state.isLoading = false;
        state.error = '';
        addTokens(action.payload.refreshToken, action.payload.accessToken);
      })

      .addCase(postRefreshToken.rejected, (state, action) => {
        state.isUser = false;
        state.isLoading = false;
        state.error = action.error.message || '';
      })

      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = authSlice;

export const { logOutUser } = actions;

export default reducer;
