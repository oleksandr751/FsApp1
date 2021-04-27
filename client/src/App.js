import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/NavBar';
import Activities from './components/Activities';
import TodoList1 from './components/TodoList1';
import RPS from './components/RPS';

function App() {
 const { token, userId, login, logout } = useAuth();
 const isAuthenticated = !!token;
 const routes = useRoutes(isAuthenticated);

 return (
  <AuthContext.Provider
   value={{
    token,
    login,
    logout,
    isAuthenticated,
    userId,
   }}
  >
   <BrowserRouter>
    {isAuthenticated && (
     <div>
      <Navbar />
      <TodoList1 />
      <Activities />
      <RPS />
     </div>
    )}
    <div className='container'>{routes}</div>
   </BrowserRouter>
  </AuthContext.Provider>
 );
}

export default App;
