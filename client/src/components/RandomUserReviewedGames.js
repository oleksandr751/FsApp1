import Rating from '@material-ui/lab/Rating';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RandomUserReviewedGames = () => {
 const auth = useContext(AuthContext);

 console.log(auth.selectedUser);
 return (
  <div className='gamesPage'>
   <h1 id='mainHeader'>All games reviewed by {auth.selectedUser.username}</h1>
   {auth.selectedUser.games[0] ? (
    auth.selectedUser.games.map((game, idx) => (
     <div key={idx} className='eachGame'>
      <div className='eachGameImage'>
       <a className='photo'>
        {' '}
        <img
         alt={game.title}
         className='images'
         src={game.poster}
         width='350'
         height='400'
        ></img>
        <div className='glow-wrap'>
         <i className='glow'></i>
        </div>
       </a>
      </div>
      <div className='eachGameDescription'>
       <h1>{game.title}</h1>
       <h1>{`${game.mark}/10`}</h1>
       <legend>{game.review}</legend>
       <Rating
        className='starRate'
        value={game.mark}
        precision={0.1}
        max={10}
        readOnly
       ></Rating>
      </div>
     </div>
    ))
   ) : (
    <div>This user is yet to review any game</div>
   )}
  </div>
 );
};

export default RandomUserReviewedGames;
