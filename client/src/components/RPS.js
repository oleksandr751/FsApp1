import React, { useState, useEffect, createRef } from 'react';

const RPS = () => {
 const arr = ['scissors', 'rock', 'paper'];
 let random = Math.floor(Math.random() * arr.length);
 const [user, setUser] = useState({
  choise: '',
  draw: null,
  win: null,
  score: 0,
 });
 const [ai, setAi] = useState({
  choise: Math.floor(Math.random() * arr.length),
  score: 0,
 });
 const [finalRand, setFinalRand] = useState({
  final: '',
 });
 const [clicked, setClicked] = useState({
  value: false,
 });

 let j = 0;
 let i = 0;
 //  setAi({
 //   choise: arr[Math.floor(Math.random) * arr.length],
 //  });
 const handleClick = () => {
  setUser({
   ...user,
   choise: '',
  });
  setFinalRand({
   final: '',
  });
 };

 const checkWinner = (e) => {
  setAi({
   ...ai,
   choise: arr[random],
  });
  setUser({
   ...user,
   choise: e.target.name,
  });
 };

 const checkWinner1 = () => {
  console.log('Your choise: ' + user.choise);
  console.log('Ai choise: ' + ai.choise);
  console.log('Draw: ' + user.draw);
  console.log('Win: ' + user.win);
  if (user.win) {
   setUser({
    ...user,
    score: user.score + 1,
   });
  }
  if (!user.win && !user.draw) {
   setAi({
    ...ai,
    score: ai.score + 1,
   });
  }

  setFinalRand({
   final: ai.choise,
  });
 };

 useEffect(() => {
  let i = 0;
  let j = 0;
  if (user.choise === ai.choise) {
   setUser({
    ...user,
    draw: true,
    win: false,
   });
  } else {
   if (user.choise === 'scissors' && ai.choise === 'rock') {
    setUser({
     ...user,
     draw: false,
     win: false,
    });
   }
   if (user.choise === 'rock' && ai.choise === 'paper') {
    setUser({
     ...user,
     draw: false,
     win: false,
    });
   }
   if (user.choise === 'paper' && ai.choise === 'scissors') {
    setUser({
     ...user,
     draw: false,
     win: false,
    });
   }
   if (user.choise === 'scissors' && ai.choise === 'paper') {
    setUser({
     ...user,
     draw: false,
     win: true,
    });
   }
   if (user.choise === 'rock' && ai.choise === 'scissors') {
    setUser({
     ...user,
     draw: false,
     win: true,
    });
   }
   if (user.choise === 'paper' && ai.choise === 'rock') {
    setUser({
     ...user,
     draw: false,
     win: true,
    });
   }
  }
 }, [user.choise, user.win, user.draw]);

 const callBack = () => {};

 return (
  <div className='RPC'>
   <div>
    <div>
     <h1>Choose one</h1>
     {user.choise === 'scissors' || user.choise === '' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='scissors'
       src='https://static.thenounproject.com/png/35798-200.png'
      ></img>
     ) : (
      console.log('done')
     )}
    </div>
    <div>
     {user.choise === 'rock' || user.choise === '' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='rock'
       src='https://static.thenounproject.com/png/1925927-200.png'
      ></img>
     ) : (
      console.log('done1')
     )}
    </div>
    <div>
     {user.choise === 'paper' || user.choise === '' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='paper'
       src='https://static.thenounproject.com/png/3887529-200.png'
      ></img>
     ) : (
      console.log('done3')
     )}
    </div>
   </div>
   <div className='confirmChoise'>
    <h1>
     Score:{user.score}:{ai.score}
    </h1>
    <button onClick={checkWinner1} type='button'>
     Confirm
    </button>
    <button onClick={handleClick} type='button'>
     Reset
    </button>
   </div>
   <div>
    {/* AIChoISE */}
    <div>
     <h1>AI choise</h1>
     {finalRand.final === '' || finalRand.final === 'scissors' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='scissors'
       src='https://static.thenounproject.com/png/35798-200.png'
      ></img>
     ) : (
      console.log()
     )}
    </div>
    <div>
     {finalRand.final === '' || finalRand.final === 'rock' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='rock'
       src='https://static.thenounproject.com/png/1925927-200.png'
      ></img>
     ) : (
      console.log()
     )}
    </div>
    <div>
     {finalRand.final === '' || finalRand.final === 'paper' ? (
      <img
       className='RPSImage'
       onClick={checkWinner}
       name='paper'
       src='https://static.thenounproject.com/png/3887529-200.png'
      ></img>
     ) : (
      console.log()
     )}
    </div>
    <div className='confirmChoise'></div>
   </div>
  </div>
 );
};

export default RPS;
