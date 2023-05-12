/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

import store from '@store/.';
import { logOutUser, postRefreshToken } from '@store/slices/authSlice';
import isTokenExpired from './auth/isTokenExpired';
import { getAccessToken, getRefreshToken } from '@/services';

export const baseURL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  withCredentials: true,
  baseURL,
});

const routesWithoutToken = ['auth/login', 'auth/refresh', 'auth/register'];

// запрос
instance.interceptors.request.use((config) => {
  if (
    config.url &&
    !routesWithoutToken.includes(config.url) &&
    getAccessToken()
  ) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  return config;
});

// ответ
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status !== 401) return error;

    store.dispatch(logOutUser());

    if (isTokenExpired(getAccessToken())) {
      const { data } = useVisitorData();

      if (getRefreshToken() && data?.visitorId) {
        const dataToken = {
          fingerprint: data?.visitorId,
          refreshToken: getRefreshToken(),
        };

        store.dispatch(postRefreshToken(dataToken));
      }
    }

    return store.dispatch(logOutUser());
  }
);

export default instance;
