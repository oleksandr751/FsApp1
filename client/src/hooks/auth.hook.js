import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
 const [token, setToken] = useState(null);
 const [userId, setUserId] = useState(null);
 const [userName, setUsername] = useState('');
 const [eMail, setEMail] = useState('');

 const login = useCallback((jwtToken, id, username, email) => {
  setToken(jwtToken);
  setUserId(id);
  setUsername(username);
  setEMail(email);
  localStorage.setItem(
   storageName,
   JSON.stringify({
    userId: id,
    token: jwtToken,
    userName: username,
    eMail: email,
   })
  );
 }, []);

 const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  setUsername('');
  setEMail('');
  localStorage.removeItem(storageName);
 }, []);

 useEffect(() => {
  const data = JSON.parse(localStorage.getItem(storageName));
  if (data && data.token) {
   login(data.token, data.userId, data.userName, data.eMail);
  }
 }, [login]);

 return { login, logout, userName, token, userId, eMail };
};
