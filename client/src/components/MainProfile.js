import { TextField, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

const MainProfile = (props) => {
 const location = useLocation();
 const locationData = location.state;
 const [userData, setUserData] = useState(locationData);
 const [showGameReviewForm, setShowGameReviewForm] = useState(false);
 const initialState = {
  mark: 0,
  review: '',
 };
 const [file, setFile] = useState([]);
 const [rateGameInputs, setRateGameInputs] = useState(initialState);
 const tootlips = {
  mark: 'Rate the game from 1 to 10',
  review: 'Right about your experience with the game',
 };
 const handleChange = (e) => {
  setRateGameInputs({ ...rateGameInputs, [e.target.name]: e.target.value });
  if (rateGameInputs.mark > 10) {
   setRateGameInputs({ ...rateGameInputs, mark: 10 });
  }
 };
 const handleFiles = (e) => {
  setFile(e.target.files);
  console.log(file);
 };
 return (
  <div>
   <button
    onClick={() => {
     console.log(userData);
    }}
   >
    Button
   </button>
   <h1>{userData.username}</h1>
   <img alt='Avatar' src={userData.avatar}></img>
   <div>
    {userData.friends.map((friend) => {
     <a>{friend}</a>;
    })}
   </div>
   <input type='file' onChange={handleFiles}></input>
   <button
    onClick={() => {
     setShowGameReviewForm(!showGameReviewForm);
    }}
   >
    Write Game Review
   </button>

   {showGameReviewForm ? (
    <form>
     <div>
      <TextField
       id='outlined-basic'
       type='number'
       label='Game Mark'
       variant='outlined'
       name='title'
       value={rateGameInputs.mark}
       onChange={handleChange}
      ></TextField>
      <Tooltip title={tootlips.mark} placement='right'>
       <a>
        <AiOutlineInfoCircle />
       </a>
      </Tooltip>
     </div>
     <div>
      {' '}
      <TextField
       id='outlined-basic'
       label='Game Review'
       variant='outlined'
       name='review'
       multiline
       value={rateGameInputs.review}
       onChange={handleChange}
      ></TextField>
      <Tooltip title={tootlips.review} placement='right'>
       <a>
        <AiOutlineInfoCircle />
       </a>
      </Tooltip>
     </div>
    </form>
   ) : null}
  </div>
 );
};

export default MainProfile;
