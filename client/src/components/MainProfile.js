import { Button, IconButton, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AiFillEdit } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';
import { GamesData } from '../components/GamesData';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './MainProfile.css';
import SearchBar from 'material-ui-search-bar';
import Checkbox from '@material-ui/core/Checkbox';

const MainProfile = (props) => {
 const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiTextField-root': {
    margin: theme.spacing(2),
    width: 200,
   },
  },
  input: {
   display: 'none',
  },
 }));
 const classes = useStyles();
 //********************************************************************* */
 const { request } = useHttp();
 const location = useLocation();
 const locationData = location.state;
 const [userData, setUserData] = useState(locationData);
 const [showGameReviewForm, setShowGameReviewForm] = useState(false);
 const [url, setUrl] = useState('');
 const [file, setFile] = useState([]);
 const initialState = {
  mark: 0,
  review: '',
  imageURL: '',
  changeNickname: '',
  changeDescription: '',
  searchBar: '',
 };
 const [rateGameInputs, setRateGameInputs] = useState(initialState);
 const [toggleEditProfile, settoggleEditProfile] = useState(false);
 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState('');
 const [gameData, setGameData] = useState([]);
 const [game, setGame] = useState({});
 const [showGame, setShowGame] = useState(false);
 const [checkFavourite, setCheckFavourite] = useState(false);

 //************************************************************************** */
 const handleFilter = (newValue) => {
  const searchWord = newValue;
  setWordEntered(searchWord);
  const newFilter = gameData.filter((value) => {
   return value.title.toLowerCase().includes(searchWord.toLowerCase());
  });

  if (searchWord === '') {
   setFilteredData([]);
  } else {
   setFilteredData(newFilter);
  }
 };

 const clearInput = () => {
  setFilteredData([]);
  setWordEntered('');
 };

 const tooltips = {
  mark: 'Rate the game from 1 to 10',
  review: 'Right about your experience with the game',
  editProfile: ' Edit your Profile',
 };

 let fileArr = [];
 const handleChange = (e) => {
  setRateGameInputs({ ...rateGameInputs, [e.target.name]: e.target.value });
  if (rateGameInputs.mark > 10) {
   setRateGameInputs({ ...rateGameInputs, mark: 10 });
  }
 };
 const handleFiles = (e) => {
  setFile(Array.from(e.target.files));
 };
 const showFile = () => {
  setUrl(URL.createObjectURL(file[0]));
  console.log(file);

  setUserData({ ...userData, avatar: URL.createObjectURL(file[0]) });
 };
 const onRadioChange = (e) => {
  console.log(e.target.value);
 };

 useEffect(() => {
  const fetchData = async () => {
   await fetch('/api/games/getGames')
    .then((response) => response.json())
    .then((data) =>
     setGameData(data.map((game) => ({ ...game, id: game.id })))
    );
  };
  fetchData();
  console.log(gameData);
 }, []);

 //********************************************************************************************** */

 return (
  <div className='mainProfile'>
   <div className='search'>
    <div className='searchInputs'>
     <SearchBar
      className='searchBar'
      name='searchBar'
      autoComplete='off'
      value={wordEntered}
      onChange={(newValue) => {
       handleFilter(newValue);
      }}
     />
    </div>
    {filteredData.length !== 0 && (
     <div className='dataResult'>
      {filteredData.slice(0, 15).map((value, key) => {
       return (
        <a
         className='dataItem'
         href={value.link}
         target='_blank'
         onClick={() => {
          setGame(value);
          setShowGame(true);
          clearInput();
         }}
        >
         <span className='gameSearchItem'>
          <p className='gameSearchName'>{value.title} </p>
          <p className='gameSearchMark'>{value.rating}</p>
         </span>
        </a>
       );
      })}
     </div>
    )}
    <div className='gameForm'></div>
    {showGame ? (
     <div className='showGame'>
      <img src={game.poster} alt='game poster' width='200px' height='200px' />
      <div className={classes.root}>
       <TextField
        id='outlined-basic'
        type='number'
        label='Game Mark'
        variant='outlined'
        name='mark'
        value={rateGameInputs.mark}
        onChange={handleChange}
       ></TextField>
       <Tooltip title={tooltips.mark} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>
      <div className={classes.root}>
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
       <Tooltip title={tooltips.review} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>
      <div>
       <Checkbox
        onClick={() => {
         setCheckFavourite(!checkFavourite);
        }}
       />
       <span>Add to Favourite</span>
      </div>

      <Button
       variant='contained'
       color='primary'
       onClick={() => {
        setUserData({
         ...userData,
         games: [
          ...userData.games,
          {
           title: game.title,
           mark: parseInt(rateGameInputs.mark),
           review: rateGameInputs.review,
           favourites: checkFavourite,
          },
         ],
        });
        console.log(userData);
        console.log(game.title);
       }}
      >
       Save
      </Button>
      <Button
       onClick={async () => {
        console.log(userData);
        const response = await request('/api/users/updateGames', 'POST', {
         userData,
        });

        console.log(response);
       }}
      >
       {' '}
       Upload
      </Button>
     </div>
    ) : null}
   </div>
   <div className='userInfo'>
    <div className='profileImage'>
     {' '}
     <img
      alt='Avatar'
      width='300px'
      height='300px'
      src={
       !userData.avatar
        ? 'https://asaqifab.com/images/noimage.jpg'
        : userData.avatar
      }
     ></img>
    </div>
    <div className='profileInfo'>
     {' '}
     <h1>{userData.username ? userData.username : 'Username.......'}</h1>
     <legend>
      {userData.description
       ? userData.description
       : 'Profile Description here.......'}
     </legend>
     <Button
      variant='contained'
      color='primary'
      onClick={() => {
       setShowGameReviewForm(!showGameReviewForm);
      }}
     >
      Write Game Review
     </Button>
     {showGameReviewForm ? (
      <form>
       <div className={classes.root}>
        <TextField
         id='outlined-basic'
         type='number'
         label='Game Mark'
         variant='outlined'
         name='mark'
         value={rateGameInputs.mark}
         onChange={handleChange}
        ></TextField>
        <Tooltip title={tooltips.mark} placement='right'>
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
        <Tooltip title={tooltips.review} placement='right'>
         <a>
          <AiOutlineInfoCircle />
         </a>
        </Tooltip>
       </div>
      </form>
     ) : null}
    </div>
   </div>
   <div className='editProfile'>
    <Tooltip title={tooltips.editProfile}>
     <IconButton
      aria-label='delete'
      className={classes.margin}
      onClick={() => {
       settoggleEditProfile(!toggleEditProfile);
      }}
     >
      <AiFillEdit></AiFillEdit>
     </IconButton>
    </Tooltip>
    {toggleEditProfile ? (
     <div className='editProfile'>
      <div className='editProfileFields'>
       {' '}
       <TextField
        id='outlined-basic'
        label='Change Nickname'
        variant='outlined'
        name='changeNickname'
        value={rateGameInputs.changeNickname}
        onChange={handleChange}
       ></TextField>
       <Button
        className='descriptionButton'
        variant='contained'
        color='primary'
        onClick={() => {
         if (rateGameInputs.changeNickname) {
          setUserData({ ...userData, username: rateGameInputs.changeNickname });
         }

         // eslint-disable-next-line default-case
        }}
       >
        Confirm
       </Button>
      </div>
      <div className='editProfileFields'>
       <TextField
        id='outlined-basic'
        label='Image URL'
        variant='outlined'
        name='imageURL'
        value={rateGameInputs.imageURL}
        onChange={handleChange}
       ></TextField>
       <Button
        className='descriptionButton'
        variant='contained'
        color='primary'
        onClick={() => {
         if (rateGameInputs.imageURL) {
          setUserData({ ...userData, avatar: rateGameInputs.imageURL });
         }

         // eslint-disable-next-line default-case
        }}
       >
        Confirm
       </Button>
      </div>
      <div className='editProfileFields'>
       <TextField
        id='outlined-basic'
        label='Change Description'
        variant='outlined'
        name='changeDescription'
        value={rateGameInputs.changeDescription}
        multiline
        onChange={handleChange}
       ></TextField>

       <Button
        className='descriptionButton'
        variant='contained'
        color='primary'
        onClick={() => {
         if (rateGameInputs.changeDescription) {
          setUserData({
           ...userData,
           description: rateGameInputs.changeDescription,
          });
         }

         // eslint-disable-next-line default-case
        }}
       >
        Confirm
       </Button>
      </div>

      <Button
       id='UploadButton'
       variant='contained'
       color='primary'
       onClick={async () => {
        console.log(userData);
        const response = await request('/api/users/updateAvatar', 'POST', {
         userData,
        });

        console.log(response);
       }}
      >
       Upload
      </Button>
     </div>
    ) : null}
   </div>
   `
   {/* <div>
    {userData.friends.map((friend) => {
     <a>{friend}</a>;
    })}
   </div> */}
   {/* <input type='file' onChange={handleFiles}></input>
   <button onClick={showFile}>Save Avatar</button> */}
  </div>
 );
};

export default MainProfile;
