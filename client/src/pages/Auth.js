import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar11';
import Posts from '../components/Posts';
import Profile from '../components/Profile';
import { UsersData } from '../components/UsersData';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';
import { useRoutes } from '../routes';
import Games from './Games';
import Home from './Home';
import Products from './Products';
import Reports from './Reports';
import UserPage from './UserPage';
import Users from './Users';

const Auth = () => {
 const { token, userId, login, logout } = useAuth();
 const isAuthenticated = !!token;
 const routes = useRoutes(isAuthenticated);
 const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: 200,
   },
  },
 }));
 const classes = useStyles();
 const [userData, setUserData] = useState(
  UsersData.map((user) => ({ ...user, id: user.id }))
 );
 const [isAuth, setIsAuth] = useState(false);
 const initialState = {
  email: '',
  password: '',
 };
 const [form, setForm] = useState(initialState);
 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value,
  });
 };
 //   const [isAuthenticated, setIsAuthenticated] = useState(false);
 //   console.log(isAuthenticated);
 return (
  <>
   <AuthContext.Provider
    value={{
     token,
     login,
     logout,
     isAuthenticated,
     userId,
    }}
   >
    <div>
     {isAuthenticated ? (
      <div>
       <Router>
        <Navbar />
        <Switch>
         <Route path='/' exact component={Home} />
         <Route path='/reports' component={Reports} />
         <Route path='/products' component={Products} />
         <Route path='/games' component={Games} />
         <Route path='/users' component={UserPage} />
         <Route path='/posts' component={Posts} />
         <Route path='/user' component={Profile}></Route>
        </Switch>
       </Router>
      </div>
     ) : (
      <div className='container'>{routes}</div>
     )}
    </div>
   </AuthContext.Provider>
  </>
 );
};

export default Auth;
