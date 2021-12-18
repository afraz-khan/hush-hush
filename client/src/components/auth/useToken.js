import { useState } from 'react';

const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
};

export default function useToken() {
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    sessionStorage.clear();
    setToken(null);
  };

  return {
    setToken: saveToken,
    unsetToken: removeToken,
    token,
  };
}
