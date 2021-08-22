import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RandomUserReviewedGames = () => {
 const auth = useContext(AuthContext);

 console.log(auth.selectedUser);
 return (
  <div>
   <h1>All games reviewed by {auth.selectedUser.username}</h1>
   {auth.selectedUser.games[0] ? (
    auth.selectedUser.games.map((game, idx) => (
     <div key={idx}>
      <div>
       <img src={game.poster} width={200} height={200}></img>
      </div>
      <h3>{game.title}</h3>
      <h3>{`${game.mark}/10`}</h3>
      <legend>{game.review}</legend>
     </div>
    ))
   ) : (
    <div>This user is yet to review any game</div>
   )}
  </div>
 );
};

export default RandomUserReviewedGames;
