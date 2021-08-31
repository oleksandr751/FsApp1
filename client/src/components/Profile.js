import { Checkbox, Fade, Tooltip } from '@material-ui/core';
import React, { useContext, useState } from 'react';
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

const Profile = (props) => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const location = useLocation();
 const locationData = location.state;
 console.log(auth.selectedUser);
 console.log(auth.selectedUser);

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
  <div className='mainProfile'>
   <div className='mainProfile1'>
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
         <div className='favouriteGame'>
          {' '}
          <Tooltip
           key={idx}
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
   </div>
   <p></p>
   <Swiper
    height={500}
    className='swiper1'
    autoplay={{ delay: 10000, disableOnInteraction: false }}
    speed={2000}
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
