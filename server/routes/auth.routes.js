const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
 '/register',
 [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Minimal password length is 6 symbols').isLength({
   min: 6,
  }),
 ],
 async (req, res) => {
  try {
   const errors = validationResult(req);

   //    if (!errors.isEmpty()) {
   //     return res.status(400).json({
   //      errors: errors.array(),
   //      message: 'Incorrect registration data',
   //     });
   //    }
   const { signUpForm } = req.body;

   const candidate = await User.findOne({ username: signUpForm.username });
   const candidateEmail = await User.findOne({ email: signUpForm.email });

   if (candidate || candidateEmail) {
    return res.status(400).json({ message: 'Such user already exists' });
   } else {
    const hashedPassword = await bcrypt.hash(signUpForm.password, 12);
    signUpForm.password = hashedPassword;
    const user = new User(signUpForm);
    await user.save(function (err, doc) {
     if (err) return console.error(err);
     console.log('Document inserted successfully!');
    });

    res.status(201).json({ message: 'User created' });
   }
  } catch (e) {
   res.status(500).json({ message: 'Something went wrong try again' });
  }
 }
);

// /api/auth/login
router.post(
 '/login',
 [
  check('email1', 'Enter correct email').normalizeEmail().isEmail(),
  check('password1', 'Enter password').exists(),
 ],
 async (req, res) => {
  try {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
    return res.status(400).json({
     errors: errors.array(),
     message: 'Incorrect login data',
    });
   }

   const { email1, password1 } = req.body;

   const user = await User.findOne({ email: email1 });

   if (!user) {
    return res.status(400).json({ message: 'User not found' });
   }

   const isMatch = await bcrypt.compare(password1, user.password);

   if (!isMatch) {
    return res.status(400).json({ message: 'Wrong password' });
   }

   const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
    expiresIn: '1h',
   });

   res.status(200).json({
    token,
    userId: user.id,
    username: user.username,
    email: user.email,
    message: 'Welcome!',
   });
  } catch (e) {
   res.status(500).json({ message: 'Something went wrong' });
  }
 }
);

router.get('/getUsers', async (req, res) => {
 try {
  const users = await User.find({});
  res.json(users);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});
router.post('/getMainUser', async (req, res) => {
 try {
  const { eMail1 } = req.body;
  console.log(eMail1);
  const users = await User.findOne({ email: eMail1 });
  res.json(users);
 } catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
 }
});

module.exports = router;
