import type { IUserRequest, IUserResponse, IRefreshRequest } from '@types';
import instance from '..';

export const authRegister = async (data: IUserRequest) => {
  const response = await instance.post<IUserResponse>(`auth/register`, data);
  return response.data;
};

export const authLogin = async (data: IUserRequest) => {
  const response = await instance.post<IUserResponse>(`auth/login`, data);
  return response.data;
};

export const authRefresh = async (data: IRefreshRequest) => {
  const response = await instance.post<IUserResponse>('auth/refresh', data);
  return response.data;
};
