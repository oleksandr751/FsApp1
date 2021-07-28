import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
 const [token, setToken] = useState(null);
 const [userId, setUserId] = useState(null);
 const [userName, setUsername] = useState('');

 const login = useCallback((jwtToken, id, username) => {
  setToken(jwtToken);
  setUserId(id);
  setUsername(username);
  localStorage.setItem(
   storageName,
   JSON.stringify({
    userId: id,
    token: jwtToken,
    userName: username,
   })
  );
 }, []);

 const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  localStorage.removeItem(storageName);
 }, []);

 useEffect(() => {
  const data = JSON.parse(localStorage.getItem(storageName));
  if (data && data.token) {
   login(data.token, data.userId, data.userName);
  }
 }, [login]);

 return { login, logout, userName, token, userId };
};
