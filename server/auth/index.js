const authRouter = require('express').Router();
const User = require('../db/models/user');

//login
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).send('Wrong email and/or password');
    } else if (user.correctPassword(password)) {
      res.send(user);
    } else {
      res.status(401).send('Wrong email and/or password');
    }
  } catch (err) {
    next(err);
  }
});

//signup

authRouter.post('/register', async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;
    const user = await User.create({ firstName, email, password });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;
