import React, { useState, useEffect, useContext } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
 const auth = useContext(AuthContext);
 const { loading, error, request, clearErrors } = useHttp();
 const message = useMessage();
 const [form, setForm] = useState({
  email: '',
  password: '',
 });
 const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: 200,
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
   const data = await request('/api/auth/register', 'POST', { ...form });
   console.log('Data', data);
  } catch (e) {}
 };

 const handleSignIn = async () => {
  try {
   const data = await request('/api/auth/login', 'POST', { ...form });
   auth.login(data.token, data.userId);
  } catch (e) {}
 };

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value,
  });
 };

 return (
  <div className='authForm1' id='authForm1'>
   <div id='authLayout'>
    <div id='authLayout'>
     <h1>Auth page</h1>
     <div>
      <form id='authForm' className={classes.root}>
       <TextField
        className='inputs'
        id='outlined-basic'
        label='Login'
        variant='outlined'
        name='email'
        autoComplete='off'
        onChange={handleChange}
        value={form.email}
       ></TextField>
       <TextField
        type='password'
        className='inputs123'
        id='outlined-basic1'
        name='password'
        label='Password'
        variant='outlined'
        onChange={handleChange}
        value={form.password}
       ></TextField>
       <Button
        id='button1'
        variant='contained'
        color='primary'
        onClick={handleSignIn}
       >
        Sign in
       </Button>
       <Button
        id='button1'
        variant='contained'
        color='primary'
        onClick={handleSignUp}
       >
        Sign up
       </Button>
      </form>
     </div>
    </div>
    <h1>Auth page</h1>
   </div>
  </div>
 );
};

export default AuthPage;
