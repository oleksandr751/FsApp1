import Rating from '@material-ui/lab/Rating';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './SelectedGame.css';

const SelectedGame = () => {
 const auth = useContext(AuthContext);
 console.log(auth.selectedGame);
 const [score, setScore] = useState(null);
 useEffect(() => {
  auth.mainUserData.games.map((game, idx) => {
   game.title === auth.selectedGame.title
    ? setScore(game.mark)
    : console.log('nope');
  });
  return () => {
   setScore(null);
  };
 }, []);

 return (
  <div className='selectedGame'>
   <h1 id='selectedGameHeader'>{auth.selectedGame.title}</h1>
   <div className='selectedGame1'>
    <div className='eachGameImage'>
     <a className='photo'>
      <img
       className='images'
       alt={auth.selectedGame.title}
       src={auth.selectedGame.poster}
       width='500'
       height='600'
      ></img>
      <div className='glow-wrap'>
       <i className='glow'></i>
      </div>
     </a>
    </div>
    <div className='eachGameDescription'>
     <h1>{`Overall score: ${auth.selectedGame.rating}/10`}</h1>
     <h1>
      {score ? `Your mark: ${score}` : 'You didn`t review this game yet'}
     </h1>

     <div className='additionalInfo'>
      <iframe
       className='trailers'
       width='560'
       height='315'
       src={auth.selectedGame.trailer}
       title='YouTube video player'
       frameBorder='0'
       allow='accelerometer; autoplay ; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
       allowFullScreen={false}
      ></iframe>
      <legend>{auth.selectedGame.description}</legend>
      <Rating
       className='starRate'
       value={auth.selectedGame.rating}
       precision={0.1}
       max={10}
       size='large'
       readOnly
      ></Rating>
      {/* <div
       className='gameScore'
       style={{
        backgroundColor: auth.selectedGame.rating * 10 >= 60 ? 'green' : 'red',
        width: '100px',
        height: '70px',
        fontSize: '50px',
        textAlign: 'center',
        justifyContent: 'center',
       }}
      >
       {Math.round(auth.selectedGame.rating * 1000) / 100}
      </div> */}
      {/* <img className="awards" alt="awards" src={game.awards} /> */}
     </div>
    </div>
   </div>
  </div>
 );
};

export default SelectedGame;
