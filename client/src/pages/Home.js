import React, { useContext } from 'react';
import Posts from '../components/Posts';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

function Home() {
 const auth = useContext(AuthContext);
 console.log(auth.mainUserData);
 return (
  <div className='homePage'>
   <div className='context'>
    <h1>Home page</h1>
    <h1>{auth.mainUserData.username}</h1>
   </div>
   <div className='area'></div>
   <ul className='circles'>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
   </ul>
  </div>
 );
}

export default Home;
