import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Redirect,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import InfoPage from './pages/InfoPage';
import UserPage from './pages/UserPage';

export const useRoutes = (isAuthenticated) => {
 if (isAuthenticated) {
  return (
   <Router>
    <Switch>
     <Route path='/links'>
      <UserPage />
     </Route>
     <Route path='/create'>
      <CreatePage />
     </Route>
     <Route path='/detail/:id'>
      <InfoPage />
     </Route>
     <Redirect to='/create' />
    </Switch>
   </Router>
  );
 }

 return (
  <Router>
   <Switch>
    <Route path='/' exact>
     <AuthPage />
    </Route>
    <Redirect to='/' />
   </Switch>
  </Router>
 );
};
