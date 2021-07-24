const { Router } = require('express');
const shortid = require('shortid');
const Link = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const Games = require('../models/Games');
const router = Router();

router.get('/getGames', async (req, res) => {
 try {
  const games = await Games.find({});
  res.json(games);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});

module.exports = router;
