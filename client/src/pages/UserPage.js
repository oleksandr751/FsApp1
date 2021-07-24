import React, { useEffect, useState } from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useLocation,
 useHistory,
} from 'react-router-dom';
import Profile from '../components/Profile';
import { Link } from 'react-router-dom';

export const UserPage = () => {
 const history = useHistory();
 const location = useLocation();
 const locationData = location.state;
 const [userData, setUserData] = useState([]);
 useEffect(() => {
  const fetchData = async () => {
   // You can await here
   await fetch('/api/auth/getUsers')
    .then((response) => response.json())
    .then((data) =>
     setUserData(data.map((game) => ({ ...game, id: game.id })))
    );

   // ...
  };

  fetchData();
 }, []);

 console.log(userData);
 return (
  <div>
   <h1>Users Page</h1>

   <nav>
    <ul>
     {userData.map((user) => {
      return (
       <li key={user.id}>
        {/* <Link to='/user' state={user.username}>
         {user.username}
        </Link> */}
        <button
         onClick={() => {
          history.push({ pathname: 'user', state: { user } });
         }}
        >
         {user.username}
        </button>
       </li>
      );
     })}
    </ul>
   </nav>
  </div>
 );
};

export default UserPage;
