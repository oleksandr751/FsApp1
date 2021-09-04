import { Button, Checkbox, Fade, TextField, Tooltip } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useLocation,
 useHistory,
} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
import Rating from '@material-ui/lab/Rating';
import { useAlert } from 'react-alert';
import { useHttp } from '../hooks/http.hook';

const Profile = (props) => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const location = useLocation();
 const locationData = location.state;
 const alert = useAlert();
 const { request } = useHttp();
 console.log(auth.selectedUser);
 console.log(auth.selectedUser);
 const [comment, setComment] = useState({ username: '', text: '', avatar: '' });
 const [userAvarageMark, setUserAvarageMark] = useState(0);
 const [minMark, setMinMark] = useState(0);
 const [maxMark, setMaxMark] = useState(0);
 const [email, setEmail] = useState(auth.selectedUser.email);
 const calculateAvarageMarkUser = () => {
  let sum = 0;
  auth.selectedUser.games.map((game, idx) => {
   sum += game.mark;
  });
  sum = sum / auth.selectedUser.games.length;
  sum = Math.round(sum * 10) / 10;
  setUserAvarageMark(sum);
  console.log(sum);
 };
 const calculateMinMark = () => {
  let min = 10;
  auth.selectedUser.games.map((game, idx) => {
   game.mark < min ? (min = game.mark) : console.log('nope');
  });
  setMinMark(min);
 };
 const calculateMaxMark = () => {
  let max = 0;
  auth.selectedUser.games.map((game, idx) => {
   game.mark > max ? (max = game.mark) : console.log('nope');
  });
  setMaxMark(max);
 };
 const handleCommentChange = (e) => {
  setComment({
   ...comment,
   [e.target.name]: e.target.value,
  });
 };

 useEffect(() => {
  calculateAvarageMarkUser();
  calculateMinMark();
  calculateMaxMark();
 }, [auth.selectedUser]);
 //  setUserData(
 //   Array.from(locationData).map((user) => ({ ...user, id: user.id }))
 //  );
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
   <div className='mainProfileBackground'>
    {' '}
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
           !auth.selectedUser.avatar
            ? 'https://asaqifab.com/images/noimage.jpg'
            : auth.selectedUser.avatar
          }
         ></img>
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
         <div>
          {' '}
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
        </div>
       </div>
      </div>
      <div className='favouriteGameTop1'>
       <h3>{`${auth.selectedUser.username}'s favourite game`}</h3>
       <div className='favouriteGameTop1Info'>
        {auth.selectedUser.favouriteGame ? (
         <div className='eachGame'>
          <div className='eachGameImage'>
           <a className='photo'>
            <img
             alt={auth.selectedUser.favouriteGame.title}
             src={auth.selectedUser.favouriteGame.poster}
             width='350'
             height='400'
            ></img>
            <div className='glow-wrap'>
             <i className='glow'></i>
            </div>
           </a>
          </div>
          <div className='eachGameDescription'>
           <h1>{auth.selectedUser.favouriteGame.title}</h1>
           <h1>{`${auth.selectedUser.favouriteGame.mark}/10`}</h1>
           <legend>{auth.selectedUser.favouriteGame.review}</legend>
           <Rating
            className='starRate'
            value={auth.selectedUser.favouriteGame.mark}
            precision={0.1}
            max={10}
            readOnly
           ></Rating>
          </div>
         </div>
        ) : (
         <h1>Favourite Game here....</h1>
        )}{' '}
       </div>
      </div>
      <div className='addGameReview'>
       <h1>{`${auth.selectedUser.username}'s reviewed games info`}</h1>
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
           <div className='favouriteGame' key={idx}>
            {' '}
            <Tooltip
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
           </div>
          ) : null
         )}
       </div>
      </div>
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
         });
        }}
        inputProps={{ maxLength: 400 }}
       ></TextField>
       <Button
        variant='contained'
        color='primary'
        onClick={async () => {
         console.log(comment);
         try {
          const response = await request('/api/users/updateComments', 'POST', {
           comment,
           email,
          });
          alert.show(response.message, { type: 'success' });
          window.location.reload();
          console.log(response);
         } catch (error) {
          alert.show(error.message, { type: 'error' });
         }
        }}
       >
        Save
       </Button>
       {auth.selectedUser.comments[0] ? (
        <div className='commentsParent'>
         {auth.selectedUser.comments.map((comment, idx) => (
          <div className='commentsMainProfile' key={idx}>
           <img src={comment.avatar} width={50} height={50}></img>
           <div className='commentsMainProfileText'>
            <h3>{comment.username}</h3>
            <legend>{comment.text}</legend>
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
   </div>
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
    {auth.selectedUser.games.map((game, idx) => (
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
 );
};

export default Profile;
