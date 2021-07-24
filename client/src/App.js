import React from 'react';
import './App.css';
import 'materialize-css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';

import Auth from './pages/Auth';

function App() {
 const { token, userId, login, logout } = useAuth();
 const isAuthenticated = !!token;
 const routes = useRoutes(isAuthenticated);

 return (
  <div>
   <Auth />
  </div>
 );
}

export default App;
