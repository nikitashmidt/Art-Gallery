export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken') as string;
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  return refreshToken;
};

export const addTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);
};

export const removeTokens = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
};
