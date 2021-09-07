import { Games, Home } from '@material-ui/icons';
import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Redirect,
} from 'react-router-dom';
import MainProfile from './components/MainProfile';
import Posts from './components/Posts';
import Profile from './components/Profile';
import RandomUserReviewedGames from './components/RandomUserReviewedGames';
import ReviewedGames from './components/ReviewedGames';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import InfoPage from './pages/InfoPage';
import Products from './pages/Products';
import Reports from './pages/Reports';
import SelectedGame from './pages/SelectedGame';
import UserPage from './pages/UserPage';

export const useRoutes = (isAuthenticated) => {
 if (isAuthenticated) {
  return (
   <Router>
    <Switch>
     <Route path='/home' exact component={Home} />
     <Route path='/reports' exact component={Reports} />
     <Route path='/products' exact component={Products} />
     <Route path='/games' exact component={Games} />
     <Route path='/users' exact component={UserPage} />
     <Route path='/posts' exact component={Posts} />
     <Route path='/profile' exact component={Profile}></Route>
     <Route path='/reviewedGames' exact component={ReviewedGames}></Route>
     <Route path='/selectedGame' exact component={SelectedGame}></Route>
     <Route
      exact
      path='/randomUserReviewedGames'
      component={RandomUserReviewedGames}
     ></Route>
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
