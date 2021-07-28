import React from 'react';
import './App.css';
import 'materialize-css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';

import Auth from './pages/Auth';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
function App() {
 const { token, userId, login, logout } = useAuth();
 const isAuthenticated = !!token;
 const routes = useRoutes(isAuthenticated);
 const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
 };
 return (
  <div>
   <AlertProvider template={AlertTemplate} {...options}>
    <Auth />
   </AlertProvider>
  </div>
 );
}

export default App;
