const { Router } = require('express');
const shortid = require('shortid');
const Link = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const Games = require('../models/Games');
const User = require('../models/User');
const router = Router();

router.post('/updateAvatar', async (req, res) => {
 try {
  const { userData } = req.body;
  //   const user = await User.find({ username: userData.username });
  console.log(userData);
  const user1 = await User.updateOne(
   { email: userData.email },
   {
    username: userData.username,
    avatar: userData.avatar,
    description: userData.description,
   }
  );
  res.status(200).json({ message: 'Data edited successfully!', data: user1 });
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
router.post('/updateFavouriteGame', async (req, res) => {
 try {
  const { game1, email } = req.body;
  //   const user = await User.find({ username: userData.username });
  console.log(game1, email);
  const user1 = await User.updateOne(
   { email: email },
   {
    favouriteGame: game1,
   }
  );
  res.status(200).json({ message: 'Data edited successfully!', data: user1 });
 } catch (e) {
  res
   .status(500)
   .json({ message: 'Something went wrong, please try again later!' });
 }
});
router.post('/addFriendRequest', async (req, res) => {
 try {
  const { notification, email } = req.body;
  //   const user = await User.find({ username: userData.username });
  console.log(notification, email);
  const user1 = await User.updateOne(
   { email: email },
   {
    $push: { notifications: notification },
   }
  );
  res
   .status(200)
   .json({ message: 'Your friend request was successfully sended!' });
 } catch (e) {
  res
   .status(500)
   .json({ message: 'Something went wrong, please try again later!' });
 }
});
router.post('/removeNotification', async (req, res) => {
 try {
  const { notification, email } = req.body;
  //   const user = await User.find({ username: userData.username });
  const user1 = await User.updateOne(
   { email: email },
   {
    $pull: { notifications: { id: notification.id } },
   }
  );
  res.status(200).json({ message: 'Notification removed!' });
 } catch (e) {
  res
   .status(500)
   .json({ message: 'Something went wrong, please try again later!' });
 }
});
router.post('/addFriend', async (req, res) => {
 try {
  const { notification, email, notification2, email2 } = req.body;
  //   const user = await User.find({ username: userData.username });
  await User.updateOne(
   { email: email },
   {
    $pull: { notifications: { id: notification.id } },
    $push: { friends: notification.user },
   }
  );
  await User.updateOne(
   { email: email2 },
   { $push: { notifications: notification2, friends: notification2.user } }
  );
  res
   .status(200)
   .json({ message: `You and ${notification.from} are now friends!` });
 } catch (e) {
  res
   .status(500)
   .json({ message: 'Something went wrong, please try again later!' });
 }
});
router.post('/updateComments', async (req, res) => {
 try {
  const { comment, email } = req.body;
  //   const user = await User.find({ username: userData.username });

  const user1 = await User.updateOne(
   { email: email },
   {
    $push: { comments: comment },
   }
  );
  console.log(user1);
  res.status(200).json({ message: 'Data edited successfully!', data: user1 });
 } catch (e) {
  res
   .status(500)
   .json({ message: 'Something went wrong, please try again later!' });
 }
});
router.post('/updateGames', async (req, res) => {
 try {
  const { gameReview } = req.body;
  //   const user = await User.find({ username: userData.username });
  console.log(gameReview);
  const user = await User.findOne(
   { email: gameReview.email },
   async (err, obj) => {
    let counter = 0;
    obj.games.map((game) => {
     if (gameReview.title === game.title) {
      counter++;
     }
    });
    console.log('counter: ', counter);
    if (counter > 0) {
     res.status(404).json({ message: 'You have already reviewed this game' });
    } else if (!gameReview.title) {
     res.status(404).json({ message: 'Please fill in the fields' });
    } else {
     let arr = obj.games;

     arr.push(gameReview);
     //  console.log(arr);
     try {
      const user1 = await User.updateOne(
       { email: gameReview.email },
       {
        games: arr,
       }
      );
      res.status(200).json('Your review was updated successfuly');
     } catch (error) {
      console.log(error.message);
     }
    }
   }
  );
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
module.exports = router;
