import { Button, IconButton, TextField, Tooltip } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { AiOutlineInfoCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AiFillEdit } from 'react-icons/ai';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { GamesData } from '../components/GamesData';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './MainProfile.css';
import SearchBar from 'material-ui-search-bar';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthContext } from '../context/AuthContext';
import { useAlert } from 'react-alert';
import SwiperCore, {
 Mousewheel,
 Navigation,
 Pagination,
 Scrollbar,
 A11y,
 Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

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
 const auth = useContext(AuthContext);
 const history = useHistory();
 const [userData, setUserData] = useState(auth.mainUserData);
 const [game, setGame] = useState({});
 const initialState = {
  mark: 0,
  review: '',
  imageURL: '',
  changeNickname: '',
  changeDescription: '',
  searchBar: '',
 };
 const alert = useAlert();
 const gameReviewInitialState = {
  email: auth.mainUserData.email,
  title: '',
  mark: 0,
  review: '',
  favourites: false,
  poster: '',
 };
 const { request } = useHttp();
 const location = useLocation();
 const locationData = location.state;
 const [showGameReviewForm, setShowGameReviewForm] = useState(false);
 const [url, setUrl] = useState('');
 const [file, setFile] = useState([]);
 const [rateGameInputs, setRateGameInputs] = useState(initialState);
 const [toggleEditProfile, settoggleEditProfile] = useState(false);
 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState('');
 const [gameData, setGameData] = useState([]);
 const [showSearch, setShowSearch] = useState(false);
 const [showGame, setShowGame] = useState(false);
 const [checkFavourite, setCheckFavourite] = useState(false);
 const [avarageMark, setAvarageMark] = useState([]);
 const arrayOfMarks = [];
 const [gameReview, setGameReview] = useState(gameReviewInitialState);

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

 const calculateAvarageMark = () => {
  auth.gamesData.map((game, idx) => {
   let marks = [];
   auth.usersData.map((user, index) => {
    user.games.map((game1, idx1) => {
     if (game1.title === game.title && game1) {
      marks.push(game1.mark);
      arrayOfMarks.push({ title: game.title, marks: marks, sum: 0 });
     } else return;
    });
   });
  });
  arrayOfMarks.map((game3, idx3) => {
   let sum = 0;
   for (let i = 0; i < game3.marks.length; i++) {
    sum = sum + game3.marks[i];
   }
   game3.sum = sum / game3.marks.length;
   game3.sum = Math.round(game3.sum * 100) / 100;
  });
  setAvarageMark(arrayOfMarks.map((game) => ({ ...game, title: game.title })));
  console.log(arrayOfMarks);
 };
 const handleChange = (e) => {
  setRateGameInputs({ ...rateGameInputs, [e.target.name]: e.target.value });
 };
 const handleGameReview = (e) => {
  setGameReview({
   ...gameReview,
   [e.target.name]: e.target.value,
   title: game.title,
   poster: game.poster,
  });

  console.log(gameReview);
 };
 const handleEditUserData = (e) => {
  setUserData({ ...userData, [e.target.name]: e.target.value });
 };
 const handleGameMark = (e) => {
  setGameReview({ ...gameReview, [e.target.name]: parseFloat(e.target.value) });
  // setRateGameInputs({
  //  ...rateGameInputs,
  //  [e.target.name]: parseInt(e.target.value),
  // });
  calculateAvarageMark();
 };
 const handleFiles = (e) => {
  setFile(Array.from(e.target.files));
 };
 //  const showFile = () => {
 //   setUrl(URL.createObjectURL(file[0]));
 //   console.log(file);

 //   setUserData({ ...auth.mainUserData, avatar: URL.createObjectURL(file[0]) });
 //  };
 const postAvarageMark = async () => {
  try {
   const response1 = await request('/api/games/postAvarageMark', 'POST', {
    avarageMark,
   });
   console.log(response1);
   console.log(avarageMark);
  } catch (error) {
   console.log(avarageMark);
   console.log(error.message);
  }
 };
 useEffect(() => {
  console.log(auth.gamesData);

  const fetchData = async () => {
   await fetch('/api/games/getGames')
    .then((response) => response.json())
    .then((data) =>
     setGameData(data.map((game) => ({ ...game, id: game.id })))
    );
  };
  fetchData();
  // console.log(gameData);
 }, [auth.mainUserData, auth.mainUserData, auth.gamesData]);
 console.log(auth.mainUserData);

 //********************************************************************************************** */
 SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Autoplay,
 ]);
 return (
  <div className='mainProfile'>
   <div className='mainProfile1'>
    <div className='userInfo'>
     <div className='profileImage'>
      {' '}
      <img
       alt='Avatar'
       width='300px'
       height='300px'
       src={
        !auth.mainUserData.avatar
         ? 'https://asaqifab.com/images/noimage.jpg'
         : auth.mainUserData.avatar
       }
      ></img>
      <a
       className='redirectToReviewedGames'
       onClick={() => {
        history.push('/reviewedGames');
       }}
      >
       {' '}
       <p>Reviewed Games {auth.mainUserData.games.length}</p>
      </a>
      <p>Friends {auth.mainUserData.friends.length}</p>
      <p>Posts {auth.mainUserData.comments.length}</p>
     </div>
     <div className='profileInfo'>
      {' '}
      <h1>
       {auth.mainUserData.username
        ? auth.mainUserData.username
        : 'Username.......'}
      </h1>
      <legend>
       {auth.mainUserData.description
        ? auth.mainUserData.description
        : 'Profile Description here.......'}
      </legend>
      <h3>3 top ranked games by {auth.mainUserData.username}</h3>
      <div className='favouriteGames'>
       {auth.mainUserData.games
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
          <div className='favouriteGame' key={idx}>
           {' '}
           <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={`${game.title} ${game.mark}/10`}
            placement='bottom'
           >
            <img
             src={game.poster}
             alt={game.title}
             width='250px'
             height='250px'
            ></img>
           </Tooltip>
          </div>
         ) : null
        )}
      </div>
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
         name='username'
         value={userData.username}
         onChange={handleEditUserData}
        ></TextField>
       </div>
       <div className='editProfileFields'>
        <TextField
         id='outlined-basic'
         label='Image URL'
         variant='outlined'
         name='avatar'
         value={userData.avatar}
         onChange={handleEditUserData}
        ></TextField>
       </div>
       <div className='editProfileFields'>
        <TextField
         id='outlined-basic'
         label='Change Description'
         variant='outlined'
         name='description'
         value={userData.description}
         multiline
         onChange={handleEditUserData}
        ></TextField>
       </div>

       <Button
        id='UploadButton'
        variant='contained'
        color='primary'
        onClick={async () => {
         try {
          console.log(userData);
          const response = await request('/api/users/updateAvatar', 'POST', {
           userData,
          });
          alert.show(response.message, { type: 'success' });
          window.location.reload();
         } catch (error) {
          alert.show(error.message, { type: 'error' });
         }
        }}
       >
        Upload
       </Button>
      </div>
     ) : null}
    </div>
   </div>
   <div className='addGameReview'>
    <div>
     {' '}
     <Tooltip title='Add new Game' placement='right'>
      <IconButton
       aria-label='delete'
       className={classes.margin}
       onClick={() => {
        setShowSearch(!showSearch);
       }}
      >
       <AiOutlinePlusCircle></AiOutlinePlusCircle>
      </IconButton>
     </Tooltip>
    </div>

    {showSearch ? (
     <div className='search'>
      <div className='searchInputs'>
       <h3>Search for games</h3>
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
           key={key}
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
          value={gameReview.mark}
          onChange={handleGameMark}
          inputProps={{ max: 10, min: 0, step: '0.1' }}
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
          value={gameReview.review}
          onChange={handleGameReview}
          inputProps={{ maxLength: 400 }}
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
           setGameReview({ ...gameReview, favourites: !gameReview.favourites });
           // setCheckFavourite(!checkFavourite);
          }}
         />
         <span>Add to Favourite</span>
        </div>
        <Button
         variant='contained'
         color='primary'
         onClick={async () => {
          console.log(gameReview);
          try {
           const response1 = await request(
            '/api/games/postAvarageMark',
            'POST',
            {
             avarageMark,
            }
           );
           // console.log(response1);
           // console.log(avarageMark);

           const response = await request('/api/users/updateGames', 'POST', {
            gameReview,
           });
           alert.show(response, { type: 'success' });
           console.log(response);
          } catch (error) {
           alert.show(error.message, { type: 'error' });
          }
         }}
        >
         Save
        </Button>
       </div>
      ) : null}
     </div>
    ) : null}
   </div>
   <div className='swiper-container'>
    <Swiper
     height={500}
     className='swiper1'
     autoplay={{ delay: 10000, disableOnInteraction: false }}
     speed={1500}
     direction={'horizontal'}
     spaceBetween={50}
     slidesPerView={1}
     pagination={{ clickable: true, el: '.swiper-pagination' }}
     navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
     }}
    >
     {auth.mainUserData.games.map((game, idx) => (
      <SwiperSlide key={idx} className='swiperSlide'>
       <img
        className='SwiperImage'
        src={game.poster}
        alt={game.title}
        width='300'
        height='300'
       />
       <div className='slideInfo'>
        <h1>{game.title}</h1>
        <legend>{game.review}</legend>
        <h1>{`${game.mark}/10`}</h1>
        {game.favourites ? (
         <span>
          <Checkbox checked disabled></Checkbox>
          <span>Favourite</span>
         </span>
        ) : null}
        <Rating precision={0.1} max={10} value={game.mark} readOnly></Rating>
       </div>
      </SwiperSlide>
     ))}
     <div className='swiper-button-next'></div>
     <div className='swiper-button-prev'></div>
     <div className='swiper-pagination'></div>
    </Swiper>
   </div>
  </div>
 );
};

export default MainProfile;
