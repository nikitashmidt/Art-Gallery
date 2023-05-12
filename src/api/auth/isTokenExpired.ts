interface IAuthTokenInfo {
  username: string;
  iat: number;
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const tokenInfo = token.split('.')[1];

    const tokenInfoDecoded = window.atob(tokenInfo);

    const { iat, exp } = JSON.parse(tokenInfoDecoded) as IAuthTokenInfo;

    const tokenLeftTime = exp - Math.round(+new Date() / 1000);

    const minLifeTimeForUpdate = exp - iat;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    return true;
  }
};

export default isTokenExpired;
