import React, { useContext, useEffect, useState } from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useLocation,
 useHistory,
} from 'react-router-dom';
import Profile from '../components/Profile';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const UserPage = () => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const location = useLocation();
 const locationData = location.state;

 console.log(auth.usersData);
 return (
  <div>
   <h1>Registered Users: {auth.usersData.length}</h1>
   <nav>
    <ul>
     {auth.usersData.map((user, idx) => {
      return (
       <div key={idx} className='eachUser'>
        <a
         className='eachUserLink'
         onClick={() => {
          auth.selectedUser = user;
          history.push({ pathname: 'user', state: { user } });
         }}
        >
         <img
          width={50}
          height={50}
          src={
           user.avatar ? user.avatar : 'https://asaqifab.com/images/noimage.jpg'
          }
         ></img>
         <p>{user.username}</p>
        </a>
       </div>
      );
     })}
    </ul>
   </nav>
  </div>
 );
};

export default UserPage;
