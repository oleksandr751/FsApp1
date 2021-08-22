import { Fade, Tooltip } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useLocation,
 useHistory,
} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Profile = (props) => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const location = useLocation();
 const locationData = location.state;
 console.log(auth.selectedUser);
 console.log(auth.selectedUser);

 //  setUserData(
 //   Array.from(locationData).map((user) => ({ ...user, id: user.id }))
 //  );
 return (
  <div>
   <div className='userInfo'>
    <div className='profileImage'>
     {' '}
     <img
      alt='Avatar'
      width='300px'
      height='300px'
      src={
       !auth.selectedUser.avatar
        ? 'https://asaqifab.com/images/noimage.jpg'
        : auth.selectedUser.avatar
      }
     ></img>
     <a
      className='redirectToReviewedGames'
      onClick={() => {
       history.push('/randomUserReviewedGames');
      }}
     >
      {' '}
      <p>Reviewed Games {auth.selectedUser.games.length}</p>
     </a>
     <p>Friends {auth.selectedUser.friends.length}</p>
     <p>Posts {auth.selectedUser.comments.length}</p>
    </div>
    <div className='profileInfo'>
     {' '}
     <h1>
      {auth.selectedUser.username
       ? auth.selectedUser.username
       : 'Username.......'}
     </h1>
     <legend>
      {auth.selectedUser.description
       ? auth.selectedUser.description
       : 'Profile Description here.......'}
     </legend>
     <h3>3 top ranked games by {auth.selectedUser.username}</h3>
     <div className='favouriteGames'>
      {auth.selectedUser.games
       .sort((a, b) => {
        if (b.mark < a.mark) {
         return -1;
        }
        if (b.mark > a.mark) {
         return 1;
        }
        return 0;
       })
       .slice(0, 3)
       .map((game, idx) =>
        game.favourites ? (
         <Tooltip
          key={idx}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={`${game.title} ${game.mark}/10`}
          placement='top'
         >
          <img
           src={game.poster}
           alt={game.title}
           width='250px'
           height='250px'
          ></img>
         </Tooltip>
        ) : null
       )}
     </div>
    </div>
   </div>
   <p></p>
  </div>
 );
};

export default Profile;
