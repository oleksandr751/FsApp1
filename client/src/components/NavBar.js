import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const handleSignOut = (event) => {
  event.preventDefault();
  auth.logout();
  history.push('/');
 };
 return (
  <nav>
   <div className='nav-wrapper'>
    <span href='/' className='brand'>
     <h1>Navigation Bar</h1>
    </span>
    <div className='navLinks'>
     <NavLink to='/mpage'>Main Page</NavLink>
     <NavLink to='/create'>Create Post</NavLink>
     <a href='/' onClick={handleSignOut}>
      Log out
     </a>
    </div>
   </div>
  </nav>
 );
};
