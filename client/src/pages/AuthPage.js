import React, { useState, useEffect, useContext } from 'react';
import {
 Button,
 IconButton,
 makeStyles,
 TextField,
 Tooltip,
} from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {
 AiFillFacebook,
 AiFillLock,
 AiFillTwitterCircle,
 AiOutlineFacebook,
 AiOutlineMail,
 AiOutlinePlusCircle,
} from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { useAlert } from 'react-alert';
import './AuthPage.css';
import { FaTelegram } from 'react-icons/fa';

export const AuthPage = () => {
 const alert = useAlert();
 const auth = useContext(AuthContext);
 const { loading, error, request, clearErrors } = useHttp();
 const message = useMessage();
 const [form, setForm] = useState({
  email1: '',
  password1: '',
 });
 const [signUpForm, setSignUpForm] = useState({
  id: Math.floor(Math.random() * 10000),
  email: '',
  password: '',
  username: '',
  avatar: '',
  friends: [],
  games: [],
  comments: [],
 });
 const [toggleSignUp, setToggleSignUp] = useState(false);
 const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '250px',
   },
  },
 }));
 const classes = useStyles();

 useEffect(() => {
  message(error);
  clearErrors();
 }, [error, message, clearErrors]);

 useEffect(() => {
  window.M.updateTextFields();
 }, []);

 const handleSignUp = async () => {
  try {
   const data = await request('/api/auth/register', 'POST', { signUpForm });
   alert.show(data.message);
  } catch (e) {
   alert.show(e.message);
  }
 };

 const handleSignIn = async () => {
  try {
   const data = await request('/api/auth/login', 'POST', { ...form });
   auth.login(data.token, data.userId, data.username, data.email);
   alert.show(data.message);
  } catch (e) {
   alert.show(e.message);
  }
 };

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value,
  });
 };
 const handleSignUpChange = (e) => {
  setSignUpForm({
   ...signUpForm,
   [e.target.name]: e.target.value,
  });
 };

 return (
  <div className='authForm1' id='authForm1'>
   <div className='backgroundDiv'>
    <div className='webDescription'>
     <div className='devInfo1'>
      {' '}
      <h1>GameRate app</h1>
      <legend>Developed by Oleksandr Pecheniuk</legend>
     </div>
     <div className='devInfo2'>
      {' '}
      <h3>Here you can:</h3>
      <ul>
       <li>Create your own account</li>
       <li>Style your profile</li>
       <li>Review Games</li>
       <li>Comment other people reviews</li>
       <li>Add friends</li>
       <li>Communicate with others</li>
       <li>Create posts</li>
      </ul>
     </div>

     <div className='devInfo'>
      {' '}
      <legend>Contact information:</legend>
      <a className='socIcons'>
       <AiFillFacebook></AiFillFacebook>
      </a>
      <a className='socIcons'>
       {' '}
       <AiFillTwitterCircle></AiFillTwitterCircle>
      </a>
      <a className='socIcons'>
       {' '}
       <FaTelegram></FaTelegram>
      </a>
     </div>
    </div>
    <div id='authLayout'>
     {/* <h1>Auth page</h1> */}
     {/* <Tooltip title='Add new Game' placement='right'>
     <IconButton
      aria-label='delete'
      className={classes.margin}
      onClick={() => {
       setToggleSignUp(!toggleSignUp);
      }}
     >
      <AiOutlinePlusCircle></AiOutlinePlusCircle>
     </IconButton>
    </Tooltip>
    {toggleSignUp ? (
     <div>
      <form>
       <TextField
        className='inputs'
        id='outlined-basic'
        label='Username'
        variant='outlined'
        name='username'
        inputProps={{ autoComplete: 'off' }}
        onChange={handleSignUpChange}
        value={signUpForm.username}
       ></TextField>
       <TextField
        className='inputs'
        id='outlined-basic'
        label='Email'
        variant='outlined'
        name='email'
        inputProps={{ autoComplete: 'off' }}
        onChange={handleSignUpChange}
        value={signUpForm.email}
       ></TextField>
       <TextField
        type='password'
        className='inputs123'
        id='outlined-basic1'
        name='password'
        label='Password'
        variant='outlined'
        inputProps={{
         autocomplete: 'new',
         form: { autoComplete: 'off' },
        }}
        onChange={handleSignUpChange}
        value={signUpForm.password}
       ></TextField>
       <Button
        id='button12'
        variant='contained'
        color='primary'
        onClick={handleSignUp}
       >
        Sign up
       </Button>
      </form>
     </div>
    ) : null} */}
     <div className='signInForm'>
      <h3>Sign in to your account</h3>
      <form id='authForm' className={classes.root}>
       <div className='signInInput'>
        <AiOutlineMail />
        <TextField
         className='inputs'
         id='outlined-basic'
         label='Email'
         variant='outlined'
         name='email1'
         inputProps={{ autoComplete: 'off' }}
         onChange={handleChange}
         value={form.email1}
        ></TextField>
       </div>
       <div>
        <a>Forgot password?</a>
       </div>
       <div className='signInInput'>
        {' '}
        <AiFillLock />
        <TextField
         type='password'
         className='inputs123'
         id='outlined-basic1'
         name='password1'
         label='Password'
         variant='outlined'
         onChange={handleChange}
         value={form.password1}
        ></TextField>
       </div>
       <div>
        <a>Create account</a>
       </div>
       <Button
        id='button1'
        variant='contained'
        color='primary'
        onClick={handleSignIn}
       >
        Sign in
       </Button>
      </form>
     </div>
    </div>
   </div>
  </div>
 );
};

export default AuthPage;
