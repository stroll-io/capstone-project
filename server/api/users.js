const userRouter = require('express').Router();
const User = require('../db/models/user');
const Walk = require('../db/models/walk');

userRouter.post('/', async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;
    const user = await User.create({ firstName, email, password });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    res.send(singleUser);
  } catch (err) {
    next(err);
  }
});

userRouter.put('/:userId/past-walks/:walkId', async (req, res, next) => {
  try {
    let userInstance = await User.findByPk(req.params.userId);
    await userInstance.addPast(req.params.walkId);
    res.send('worked');
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/past-walks
//TODO: change the ascending order for the imbedded past walk value, not the walk itself
userRouter.get('/:userId/past-walks', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    const pastWalks = await singleUser.getWalkedByUser({
      order: [['createdAt', 'ASC']],
    });
    res.send(pastWalks);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:userId/starred-walks', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    const starredWalks = await singleUser.getFavoritedByUser({
      order: [['createdAt', 'ASC']],
    });
    res.send(starredWalks);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
