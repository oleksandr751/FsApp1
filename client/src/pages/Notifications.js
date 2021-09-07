import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 IconButton,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { useHttp } from '../hooks/http.hook';
import { useAlert } from 'react-alert';
import { IoMdDoneAll } from 'react-icons/io';

const Notifications = () => {
 const auth = useContext(AuthContext);
 const alert = useAlert();
 const [email, setEmail] = useState(auth.mainUserData.email);
 const [open, setOpen] = useState(false);
 const { request } = useHttp();
 const handleClickOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };
 return (
  <div className='notifications'>
   <h1>Notifications</h1>
   <>
    {' '}
    {auth.mainUserData.notifications[0] ? (
     auth.mainUserData.notifications?.map((notification, idx) => (
      <div classname='notification'>
       {notification.type === 'friendRequest' ? (
        <div className='friendRequestDiv'>
         {' '}
         <img src={notification.user.avatar} width={50} height={50}></img>
         <h3>{`Friend request from ${notification.from}`}</h3>
         <IconButton onClick={handleClickOpen}>
          <GiConfirmed></GiConfirmed>
         </IconButton>
         <IconButton>
          <GiCancel></GiCancel>
         </IconButton>
         <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
         >
          <DialogTitle id='alert-dialog-title'>{'Add friend?'}</DialogTitle>
          <DialogContent>
           <DialogContentText id='alert-dialog-description'>
            Do you want to add this user as a friend?
           </DialogContentText>
          </DialogContent>
          <DialogActions>
           <Button
            onClick={async () => {
             let notification2 = {
              id: Math.floor(Math.random() * 10000),
              to: notification.user.username,
              from: auth.mainUserData.username,
              user: auth.mainUserData,
              type: 'friendAdded',
             };
             let email2 = notification.user.email;
             setOpen(false);
             try {
              const response = await request('/api/users/addFriend', 'POST', {
               notification2,
               notification,
               email,
               email2,
              });
              alert.show(response.message, { type: 'success' });
              //  window.location.reload();
              console.log(response);
             } catch (error) {
              alert.show(error.message, { type: 'error' });
             }
            }}
            color='primary'
            autoFocus
           >
            Yes
           </Button>
           <Button onClick={handleClose} color='primary'>
            No
           </Button>
          </DialogActions>
         </Dialog>
        </div>
       ) : (
        <div className='friendRequestDiv'>
         {' '}
         <img src={notification.user.avatar} width={50} height={50}></img>
         <h3>{`Friend added: ${notification.from}`}</h3>
         <IoMdDoneAll></IoMdDoneAll>
         <IconButton
          onClick={async () => {
           try {
            setOpen(false);
            const response = await request(
             '/api/users/removeNotification',
             'POST',
             {
              notification,
              email,
             }
            );
            alert.show(response.message, { type: 'success' });
            //  window.location.reload();
            console.log(response);
           } catch (error) {
            alert.show(error.message, { type: 'error' });
           }
          }}
         >
          <GiCancel></GiCancel>
         </IconButton>
        </div>
       )}
      </div>
     ))
    ) : (
     <div>
      <h1>You don`t have any notifications at the moment</h1>
     </div>
    )}
   </>
  </div>
 );
};

export default Notifications;
