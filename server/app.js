const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const Games = require('./models/Games');
const User = require('./models/User');

const app = express();
app.use(express.json({ extended: true, limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb' }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/post', require('./routes/post.routes'));
app.use('/api/games', require('./routes/game.routes'));
app.use('/api/users', require('./routes/users.routes'));

const PORT = config.get('port') || 5000;

async function start() {
 try {
  await mongoose.connect(config.get('mongoUri'), {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
  });

  app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
 } catch (e) {
  console.log('Server Error', e.message);
  process.exit(1);
 }
}

start();
