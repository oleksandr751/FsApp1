import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import { AuthContext } from '../context/AuthContext';
import './ReviewedGames.css';

const ReviewedGames = () => {
 const auth = useContext(AuthContext);

 console.log(auth.mainUserData);
 return (
  <div className='reviewedGamesPage'>
   <div className='reviewedGamesBackground'>
    <h1>All games reviewed by {auth.mainUserData.username}</h1>
    {auth.mainUserData.games[0] ? (
     auth.mainUserData.games.map((game, idx) => (
      <div className='eachGame'>
       <div className='eachGameImage'>
        <a className='photo'>
         <img alt={game.title} src={game.poster} width='350' height='400'></img>
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
  </div>
 );
};

export default ReviewedGames;
