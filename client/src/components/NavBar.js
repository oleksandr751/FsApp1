import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const handleSignOut = (event) => {
  event.preventDefault();
  auth.logout();
  history.push('/');
 };
 return (
  <nav>
   <div className='nav-wrapper blue darken-1'>
    <span href='/' className='brand-logo'>
     Post creation
    </span>
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
     <li>
      <NavLink to='/mpage'>Main Page</NavLink>
     </li>
     <li>
      <NavLink to='/create'>Create Post</NavLink>
     </li>
     <li>
      <a href='/' onClick={handleSignOut}>
       Log out
      </a>
     </li>
    </ul>
   </div>
  </nav>
 );
};
