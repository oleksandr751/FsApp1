const { Router } = require('express');
const shortid = require('shortid');
const Link = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const Games = require('../models/Games');
const User = require('../models/User');
const router = Router();

router.get('/getGames', async (req, res) => {
 try {
  const games = await Games.find({});
  res.json(games);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
router.post('/postAvarageMark', async (req, res) => {
 try {
  const { avarageMark } = req.body;
  //   const user = await User.find({ username: userData.username });
  //   console.log(avarageMark);
  avarageMark.map(async (game) => {
   //    console.log(game);
   const game1 = await Games.updateOne(
    { title: game.title },
    {
     rating: game.sum,
    }
   );
   //    console.log(game1);
  });

  res.status(200).json('Data updated succesfully');
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});

router.post('/addComments', async (req, res) => {
 try {
  const { game } = req.body;
  console.log(game.comments);

  const game1 = await Games.updateOne(
   { title: game.title },
   { comments: game.comments }
  );

  res.status(201).json({ game1 });
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});

router.post('/add', async (req, res) => {
 try {
  const { addGameInputs } = req.body;

  const existing = await Games.findOne({ title: addGameInputs.title });

  if (existing) {
   return res.status(409).json({ message: 'Such game already exists' });
  } else {
   const game1 = new Games(addGameInputs);

   await game1.save();

   res.status(201).json({ game1 });
  }
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
module.exports = router;
