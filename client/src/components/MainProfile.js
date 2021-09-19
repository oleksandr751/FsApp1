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
import { GiCancel } from 'react-icons/gi';

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
 const [rateGameInputs, setRateGameInputs] = useState(initialState);
 const [toggleEditProfile, settoggleEditProfile] = useState(false);
 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState('');
 const [gameData, setGameData] = useState([]);
 const [showSearch, setShowSearch] = useState(false);
 const [showGame, setShowGame] = useState(false);
 const [avarageMark, setAvarageMark] = useState([]);
 const arrayOfMarks = [];
 const [gameReview, setGameReview] = useState(gameReviewInitialState);
 const [toggleEditFavouriteGame, setToggleEditFavouriteGame] = useState(false);
 const [game, setGame] = useState({});
 const [game1, setGame1] = useState({});
 const [showGame1, setShowGame1] = useState(false);
 const [wordEntered1, setWordEntered1] = useState('');
 const [filteredData1, setFilteredData1] = useState([]);
 const [email, setEmail] = useState(auth.eMail);
 const [comment, setComment] = useState({
  username: '',
  text: '',
  avatar: '',
  email: auth.mainUserData.email,
  id: Math.floor(Math.random() * 10000),
 });
 const [userAvarageMark, setUserAvarageMark] = useState(0);
 const [minMark, setMinMark] = useState(0);
 const [maxMark, setMaxMark] = useState(0);

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
 const handleFilter1 = (newValue) => {
  const searchWord = newValue;
  setWordEntered1(searchWord);
  const newFilter = auth.mainUserData.games.filter((value) => {
   return value.title.toLowerCase().includes(searchWord.toLowerCase());
  });

  if (searchWord === '') {
   setFilteredData1([]);
  } else {
   setFilteredData1(newFilter);
  }
 };

 const clearInput = () => {
  setFilteredData([]);
  setWordEntered('');
 };

 const clearInput1 = () => {
  setFilteredData1([]);
  setWordEntered1('');
 };
 const handleCommentChange = (e) => {
  setComment({
   ...comment,
   [e.target.name]: e.target.value,
   username: auth.mainUserData.username,
   avatar: auth.mainUserData.avatar,
   day: new Date().getUTCDate(),
   month: new Date().getUTCMonth() + 1,
   year: new Date().getUTCFullYear(),
   hours: new Date().getHours(),
   minutes: new Date().getMinutes(),
  });
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
 };
 const handleGameReview = (e) => {
  setGameReview({
   ...gameReview,
   [e.target.name]: e.target.value,
   title: game.title,
   poster: game.poster,
  });
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
 const calculateAvarageMarkUser = () => {
  let sum = 0;
  auth.mainUserData.games.map((game, idx) => {
   sum += game.mark;
  });
  sum = sum / auth.mainUserData.games.length;
  setUserAvarageMark(sum);
 };
 const calculateMinMark = () => {
  let min = 10;
  auth.mainUserData.games.map((game, idx) => {
   game.mark < min ? (min = game.mark) : console.log('nope');
  });
  setMinMark(min);
 };
 const calculateMaxMark = () => {
  let max = 0;
  auth.mainUserData.games.map((game, idx) => {
   game.mark > max ? (max = game.mark) : console.log('nope');
  });
  setMaxMark(max);
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
  calculateAvarageMarkUser();
  calculateMinMark();
  calculateMaxMark();
 }, [auth.mainUserData, auth.gamesData]);
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
  <div className='backgroundDiv123'>
   {' '}
   <div className='mainProfileBackground'>
    <div className='mainProfile'>
     <div className='mainProfileGradient'>
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
         <div>
          {' '}
          <a
           className='redirectToReviewedGames'
           onClick={() => {
            history.push('/reviewedGames');
           }}
          >
           {' '}
           <p>Reviewed Games {auth.mainUserData.games.length}</p>
          </a>
          <a
           className='redirectToReviewedGames'
           //  onClick={() => {
           //   history.push('/reviewedGames');
           //  }}
          >
           <p>Friends {auth.mainUserData.friends.length}</p>
          </a>
          <a
           className='redirectToReviewedGames'
           //  onClick={() => {
           //   history.push('/reviewedGames');
           //  }}
          >
           <p>Comments {auth.mainUserData.comments.length}</p>
          </a>
          <a
           className='redirectToReviewedGames'
           onClick={async () => {
            console.log(new Date().getHours(), new Date().getMinutes());
            // try {
            //  const response = await request(
            //   '/api/users/updateAllUserComments',
            //   'POST',
            //   {
            //    userData,
            //   }
            //  );
            //  alert.show(response.message, { type: 'success' });
            //  window.location.reload();
            // } catch (error) {
            //  alert.show(error.message, { type: 'error' });
            // }
           }}
          >
           <p>Posts {auth.mainUserData.posts?.length}</p>
          </a>
         </div>
        </div>
       </div>
       <div className='editProfile'>
        <div className='icons'>
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
        </div>

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
            inputProps={{ maxLength: 20 }}
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
            inputProps={{ maxLength: 400 }}
            onChange={handleEditUserData}
           ></TextField>
          </div>

          <Button
           id='UploadButton'
           variant='contained'
           color='primary'
           onClick={async () => {
            try {
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
      <div className='favouriteGameTop1'>
       <>
        <h3>{`${auth.mainUserData.username}'s favourite game`}</h3>
        <div className='favouriteGameTop1Info'>
         {auth.mainUserData.favouriteGame ? (
          <div className='eachGame'>
           <div className='eachGameImage'>
            <a className='photo'>
             <img
              alt={auth.mainUserData.favouriteGame.title}
              src={auth.mainUserData.favouriteGame.poster}
              width='350'
              height='400'
             ></img>
             <div className='glow-wrap'>
              <i className='glow'></i>
             </div>
            </a>
           </div>
           <div className='eachGameDescription'>
            <h1>{auth.mainUserData.favouriteGame.title}</h1>
            <h1>{`${auth.mainUserData.favouriteGame.mark}/10`}</h1>
            <legend>{auth.mainUserData.favouriteGame.review}</legend>
            <Rating
             className='starRate'
             value={auth.mainUserData.favouriteGame.mark}
             precision={0.1}
             max={10}
             readOnly
            ></Rating>
           </div>
          </div>
         ) : (
          <h1>Favourite Game here....</h1>
         )}
         {showGame1 ? (
          <div className='eachGame'>
           <div className='eachGameImage'>
            <a className='photo'>
             <img
              alt={game1.title}
              src={game1.poster}
              width='350'
              height='400'
             ></img>
             <div className='glow-wrap'>
              <i className='glow'></i>
             </div>
            </a>
           </div>
           <div className='eachGameDescription'>
            <h1>{game1.title}</h1>
            <h1>{`${game1.mark}/10`}</h1>
            <legend>{game1.review}</legend>
            <Rating
             className='starRate'
             value={game1.mark}
             precision={0.1}
             max={10}
             readOnly
            ></Rating>
            <Button
             variant='contained'
             color='primary'
             onClick={async () => {
              try {
               const response = await request(
                '/api/users/updateFavouriteGame',
                'POST',
                {
                 game1,
                 email,
                }
               );
               alert.show(response.message, { type: 'success' });
               window.location.reload();
              } catch (error) {
               alert.show(error.message, { type: 'error' });
              }
             }}
            >
             Save
            </Button>
            <Button
             variant='contained'
             color='primary'
             onClick={() => {
              setShowGame1(false);
             }}
            >
             Cancel
            </Button>
           </div>
          </div>
         ) : null}
         <div className='icons'>
          <Tooltip title={tooltips.editProfile}>
           <IconButton
            aria-label='delete'
            className={classes.margin}
            onClick={() => {
             setToggleEditFavouriteGame(!toggleEditFavouriteGame);
            }}
           >
            <AiFillEdit></AiFillEdit>
           </IconButton>
          </Tooltip>
         </div>

         {toggleEditFavouriteGame ? (
          <div className='search'>
           {' '}
           <div className='searchInputs'>
            <h3>Search for games</h3>
            <SearchBar
             className='searchBar'
             name='searchBar'
             autoComplete='off'
             value={wordEntered1}
             onChange={(newValue) => {
              handleFilter1(newValue);
             }}
            />
           </div>
           {filteredData1.length !== 0 && (
            <div className='dataResult'>
             {filteredData1.slice(0, 15).map((value, key) => {
              return (
               <a
                key={key}
                className='dataItem'
                href={value.link}
                target='_blank'
                onClick={() => {
                 setGame1(value);
                 setShowGame1(true);
                 clearInput1();
                }}
               >
                <span className='gameSearchItem'>
                 <p className='gameSearchName'>{value.title} </p>
                 <p className='gameSearchMark'>{value.mark}</p>
                </span>
               </a>
              );
             })}
            </div>
           )}
           {}
          </div>
         ) : null}
        </div>
       </>
      </div>
      <div className='addGameReview'>
       <h1>{`${auth.mainUserData.username}'s reviewed games info`}</h1>
       <div className='avarageMarks'>
        <div>
         <h1>{`Avarage mark: ${userAvarageMark}`}</h1>
        </div>
        <div className='avarageMarksDiv'>
         <h1>{`Highest mark: ${maxMark}`}</h1>
        </div>
        <div>
         <h1>{`Lowest mark: ${minMark}`}</h1>
        </div>
       </div>
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
              height='300px'
             ></img>
            </Tooltip>
           </div>
          ) : null
         )}
       </div>

       <div className='icons'>
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
           <img
            src={game.poster}
            alt='game poster'
            width='200px'
            height='200px'
           />
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
              setGameReview({
               ...gameReview,
               favourites: !gameReview.favourites,
              });
              // setCheckFavourite(!checkFavourite);
             }}
            />
            <span>Add to Favourite</span>
           </div>
           <Button
            variant='contained'
            color='primary'
            onClick={async () => {
             try {
              const response1 = await request(
               '/api/games/postAvarageMark',
               'POST',
               {
                avarageMark,
               }
              );
              const response = await request('/api/users/updateGames', 'POST', {
               gameReview,
              });
              alert.show(response, { type: 'success' });
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
      </div>{' '}
      <div className='mainProfileComments'>
       <h1> Comments</h1>
       <TextField
        id='outlined-basic'
        label='Comment'
        variant='outlined'
        name='text'
        multiline
        value={comment.text}
        onChange={handleCommentChange}
        onClick={() => {
         setComment({
          ...comment,
          username: auth.mainUserData.username,
          avatar: auth.mainUserData.avatar,
          day: new Date().getUTCDay(),
          month: new Date().getUTCMonth(),
          year: new Date().getUTCFullYear(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
         });
        }}
        inputProps={{ maxLength: 400 }}
       ></TextField>
       <Button
        variant='contained'
        color='primary'
        onClick={async () => {
         try {
          const response = await request('/api/users/updateComments', 'POST', {
           comment,
           email,
          });
          alert.show(response.message, { type: 'success' });
          window.location.reload();
         } catch (error) {
          alert.show(error.message, { type: 'error' });
         }
        }}
       >
        Save
       </Button>
       {auth.mainUserData.comments[0] ? (
        <div className='commentsParent'>
         {auth.mainUserData.comments.map((comment, idx) => (
          <div className='commentsMainProfile' key={idx}>
           <img
            alt={comment.username}
            src={comment.avatar}
            width={50}
            height={50}
           ></img>
           <div className='commentsMainProfileText'>
            <h3>{comment.username}</h3>
            <span>{`0${comment.day}.0${comment.month}.${comment.year}`}</span>
            <h4>{`${comment.hours}:${comment.minutes}`}</h4>
            <legend>{comment.text}</legend>
           </div>
           <div>
            <IconButton
             aria-label='delete'
             onClick={async () => {
              try {
               const response = await request(
                '/api/users/deleteComment',
                'POST',
                {
                 comment,
                 email,
                }
               );
               alert.show(response.message, { type: 'success' });
              } catch (error) {
               alert.show(error.message, { type: 'error' });
              }
             }}
            >
             <GiCancel></GiCancel>
            </IconButton>
           </div>
          </div>
         ))}
        </div>
       ) : (
        <div>
         <legend>User comments here.............</legend>
        </div>
       )}
      </div>
     </div>
    </div>
   </div>{' '}
   <div className='swiper-container'>
    <div>
     <h3>All game reviews by {auth.mainUserData.username}</h3>
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
  </div>
 );
};

export default MainProfile;
