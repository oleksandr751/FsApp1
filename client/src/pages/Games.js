import React, { useContext, useEffect, useState } from 'react';
import { GamesData } from '../components/GamesData';
import StarRatingComponent from 'react-star-rating-component';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {
 AiOutlineComment,
 AiOutlineArrowDown,
 AiOutlineArrowUp,
 AiOutlineInfoCircle,
 AiOutlinePlusCircle,
} from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';
import { Button, TextField } from '@material-ui/core';
// import JSONBullshit from '../data.json';
// import { element } from 'prop-types';
import './Game.css';
import SearchBar from 'material-ui-search-bar';
import { useHttp } from '../hooks/http.hook';
import Tooltip from '@material-ui/core/Tooltip';
import { useAlert } from 'react-alert';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import Axios from 'axios';

const Games = () => {
 const auth = useContext(AuthContext);
 const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: 300,
   },
  },
  input: {
   display: 'none',
  },
 }));
 const classes = useStyles();
 const alert = useAlert();
 const { request } = useHttp();
 const tootlips = {
  title: 'e.g. The Witcher 3 Wild Hunt',
  description:
   'e.g. Become Ruler of the World by establishing and leading a civilization from the Stone Age to the Information Age.',
  poster:
   'Image adress e.g. https://s1.gaming-cdn.com/images/products/1437/orig/civilization-vi-cover.jpg ',
  trailer:
   'Embed URL e.g. https://www.youtube.com/embed/5KdE0p2joJw?autoplay=1&loop=1',
 };
 const initialState = {
  id: Math.floor(Math.random() * 10000),
  title: '',
  description: '',
  poster: '',
  rating: 8,
  score: 90,
  awards: '',
  categories: ['Action', 'Full Controller Support', 'Singleplayer'],
  trailer: '',
  comments: [
   {
    id: 1,
    text: 'Hereby I want to warmely greet our newcomers to this website',
    user: 'admin',
   },
   {
    id: 2,
    text: 'Hereby I want to warmely greet our newcomers to this website',
    user: 'admin',
   },
  ],
  showComments: false,
  showVideo: false,
  arrowDown: true,
 };
 const [addGameInputs, setAddGameInputs] = useState(initialState);
 const [toggleAddGame, setToggleAddGame] = useState(false);
 const [avarageMark, setAvarageMark] = useState([]);
 const [userData, setUserData] = useState([]);
 const [valueInput, setValueInput] = useState('');

 const [values, setValues] = useState({
  searchBar: '',
 });
 const [starValue, setStarValue] = useState({
  rating: 10,
 });
 // const [data, setData] = useState(
 //   JSONBullshit.map(element => ({
 //     ...element,
 //     id: element.id,
 //   })),
 // );
 const [gameData1, setgameData1] = useState([]);
 const [some, setSome] = useState({
  id: 1,
  id2: 2,
 });
 const arrayOfMarks = [];

 const calculateAvarageMark = () => {
  gameData1.map((game, idx) => {
   let marks = [];
   userData.map((user, index) => {
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
  });
  setAvarageMark(arrayOfMarks.map((game) => ({ ...game, title: game.title })));
  console.log(arrayOfMarks);
 };
 const addGameRequest = async () => {
  try {
   const response = await request('/api/games/add', 'POST', { addGameInputs });

   console.log(response);
   setAddGameInputs(initialState);
  } catch (e) {
   alert.show(e.message);
  }
 };

 const addCommentRequest = async (game) => {
  try {
   console.log(game);
   const response = await request('/api/games/addComments', 'POST', { game });
   console.log(response);
   console.log(newComments);
  } catch (e) {
   console.log(e.message);
  }
 };

 // Axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(
 //   response => {
 //     //  console.log(response);
 //   },
 // );
 const onStarClick = (nextValue) => {
  setStarValue(
   gameData1.map((game1) =>
    gameData1.id === game1.id
     ? {
        ...game1,
        rating: nextValue,
       }
     : game1
   )
  );
  //   setStarValue({ rating: nextValue });
 };

 const [newComments, setNewComments] = useState({ 1: '', 2: '' });

 const handleChangeComments = (e, id) => {
  setNewComments({ ...newComments, [id]: e.target.value });
  // setNewComments(
  //   newComments.map((el) =>
  //     el.id === id ? { ...el, text: e.target.value } : el
  //   )
  // );
 };
 const handleChangeAddGameInputs = (e) => {
  setAddGameInputs({ ...addGameInputs, [e.target.name]: e.target.value });
 };

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
  const fetchData = async () => {
   // You can await here
   try {
    await fetch('/api/games/getGames')
     .then((response) => response.json())
     .then((data) =>
      setgameData1(data.map((game) => ({ ...game, id: game.id })))
     );
    await fetch('/api/auth/getUsers')
     .then((response) => response.json())
     .then((data) =>
      setUserData(data.map((game) => ({ ...game, id: game.id })))
     );
   } catch (e) {
    console.log(e.message);
   }

   // ...
  };
  fetchData();
 }, []);
 useEffect(() => {
  console.log(gameData1);
 }, [gameData1]);
 //  console.log(gamed.comments.length);
 return (
  <div className='gamesPage'>
   <h1 id='mainHeader'>Games</h1>
   <Tooltip title='Add new Game' placement='right'>
    <IconButton
     aria-label='delete'
     className={classes.margin}
     onClick={() => {
      setToggleAddGame(!toggleAddGame);
      calculateAvarageMark();
     }}
    >
     <AiOutlinePlusCircle></AiOutlinePlusCircle>
    </IconButton>
   </Tooltip>
   {toggleAddGame ? (
    <div>
     <form id='addGameForm' className={classes.root}>
      <div>
       <TextField
        id='outlined-basic'
        label='Game Title'
        variant='outlined'
        name='title'
        value={addGameInputs.title}
        onChange={handleChangeAddGameInputs}
       ></TextField>
       <Tooltip title={tootlips.title} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>
      <div>
       {' '}
       <TextField
        id='outlined-basic'
        label='Game Description'
        variant='outlined'
        name='description'
        multiline
        value={addGameInputs.description}
        onChange={handleChangeAddGameInputs}
       ></TextField>
       <Tooltip title={tootlips.description} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>
      <div>
       <TextField
        id='outlined-basic'
        label='Game Poster'
        variant='outlined'
        name='poster'
        multiline
        value={addGameInputs.poster}
        onChange={handleChangeAddGameInputs}
       ></TextField>
       <Tooltip title={tootlips.poster} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>
      <div>
       <TextField
        id='outlined-basic'
        label='Game Trailer'
        variant='outlined'
        name='trailer'
        multiline
        value={addGameInputs.trailer}
        onChange={handleChangeAddGameInputs}
       ></TextField>
       <Tooltip title={tootlips.trailer} placement='right'>
        <a>
         <AiOutlineInfoCircle />
        </a>
       </Tooltip>
      </div>

      <Button
       id='createPostButton'
       variant='contained'
       color='primary'
       onClick={addGameRequest}
      >
       Add Game
      </Button>
      <Button
       id='createPostButton'
       variant='contained'
       color='primary'
       onClick={postAvarageMark}
      >
       Update Games
      </Button>
     </form>
    </div>
   ) : null}
   <SearchBar
    className='searchBar'
    name='searchBar'
    autoComplete='off'
    value={values.searchBar}
    onChange={(newValue) => {
     setValues({ ...values, searchBar: newValue });
    }}
   ></SearchBar>
   {/* {data.map((el) => {
    return <h1>{el.title}</h1>;
   })} */}
   {gameData1
    .filter((value) => {
     if (value.title) {
      if (values.searchBar === '') {
       return value;
      } else if (
       value.title.toLowerCase().includes(values.searchBar.toLowerCase())
      )
       return value;
     }
    })
    .sort((a, b) => {
     if (a.title < b.title) {
      return -1;
     }
     if (a.title > b.title) {
      return 1;
     }
     return 0;
    })
    .map((game, index) =>
     game.title ? (
      <div key={game.id} className='eachGame'>
       <div className='eachGameImage'>
        <a className='photo'>
         <img
          className='images'
          alt={game.title}
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
        <legend>{game.description}</legend>
        {game.showVideo ? (
         <div className='additionalInfo'>
          <iframe
           className='trailers'
           width='560'
           height='315'
           src={game.trailer}
           title='YouTube video player'
           frameBorder='0'
           allow='accelerometer; autoplay ; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
           allowFullScreen={false}
          ></iframe>
          <div
           className='gameScore'
           style={{
            backgroundColor: game.score > 80 ? 'green' : 'red',
            width: '80px',
            height: '70px',
            fontSize: '50px',
            textAlign: 'center',
            justifyContent: 'center',
           }}
          >
           <p>{game.score}</p>
          </div>
          {/* <img className="awards" alt="awards" src={game.awards} /> */}
         </div>
        ) : null}
        <h2 className='averageMark'>{`Average mark: ${game.rating}/10`}</h2>
        <Rating
         className='starRate'
         value={game.rating}
         precision={0.1}
         max={10}
         readOnly
        ></Rating>
        <Tooltip title='Comments' placement='right'>
         <IconButton
          aria-label='delete'
          className={classes.margin}
          onClick={() => {
           setgameData1([
            ...gameData1,
            (game.showComments = !game.showComments),
           ]);
          }}
         >
          <AiOutlineComment></AiOutlineComment>
          <p>{game?.comments?.length}</p>
         </IconButton>
        </Tooltip>

        {game.showComments ? (
         <div>
          {game.comments.map((comment, index) => (
           <div key={index} className='comments'>
            <p>{comment.user}:</p>
            <p>{comment.text}</p>
           </div>
          ))}
          <TextField
           name='comments'
           onChange={(e) => handleChangeComments(e, game.id)}
           value={newComments[game.id]}
           // value={
           //   newComments.find((comm) => comm.id === element.id).text
           // }
          ></TextField>

          <Button
           onClick={() => {
            setgameData1(
             gameData1.map((item) =>
              item.id === game.id && newComments[game.id]
               ? {
                  ...item,
                  comments: [
                   ...item.comments,
                   {
                    id: game.id,
                    text: newComments[game.id],
                    user: auth.userName,
                   },
                  ],
                 }
               : item
             )
            );
            console.log(game);
            // setMovies(prevMovies => ([...prevMovies, ...result]));

            setNewComments({ ...newComments, [game.id]: '' });
           }}
          >
           Add Comment
          </Button>
          <button
           onClick={() => {
            try {
             addCommentRequest(game);
            } catch (error) {
             console.lot(error.message);
            }
            console.log(game);
           }}
          >
           Update
          </button>
         </div>
        ) : null}
        <Tooltip title='More info' placement='right'>
         <IconButton
          aria-label='delete'
          className={classes.margin}
          onClick={() => {
           setgameData1([
            ...gameData1,
            (game.showVideo = !game.showVideo),
            (game.arrowDown = !game.arrowDown),
           ]);
          }}
         >
          {game.arrowDown ? (
           <AiOutlineArrowDown></AiOutlineArrowDown>
          ) : (
           <AiOutlineArrowUp></AiOutlineArrowUp>
          )}
         </IconButton>
        </Tooltip>
       </div>
      </div>
     ) : null
    )}
  </div>
 );
};

export default Games;
