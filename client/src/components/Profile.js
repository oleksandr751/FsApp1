import React, { useState } from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useLocation,
} from 'react-router-dom';
const Profile = (props) => {
 const location = useLocation();
 const locationData = location.state;
 const [userData, setUserData] = useState(locationData);
 console.log(userData);
 //  setUserData(
 //   Array.from(locationData).map((user) => ({ ...user, id: user.id }))
 //  );
 return (
  <div>
   <h1>{userData.user.username}</h1>
  </div>
 );
};

export default Profile;
