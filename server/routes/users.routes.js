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
  res.json(user1);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});

router.post('/updateGames', async (req, res) => {
 try {
  const { userData } = req.body;
  //   const user = await User.find({ username: userData.username });
  console.log(userData);
  const user1 = await User.updateOne(
   { email: userData.email },
   {
    games: userData.games,
   }
  );
  res.json(user1);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
module.exports = router;
