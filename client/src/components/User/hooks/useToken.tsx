import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem('token') as string);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Record<string, unknown>) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    getToken,
    removeToken
  }
}