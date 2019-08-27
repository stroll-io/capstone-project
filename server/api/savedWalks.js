const savedRouter = require('express').Router();
const User = require('../db/models/user');
const Walk = require('../db/models/walk');

// savedRouter.get('/:userId/:walkId', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
//     const walk = await Walk.findByPk(req.params.walkId);
//     const savedWalk = await user.hasSavedByUser(walk);
//     res.send(savedWalk);
//   } catch (err) {
//     next(err);
//   }
// });
//GET /api/savedWalks/:userId/
savedRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const savedWalks = await user.getSavedByUser();
    res.send(savedWalks);
  } catch (err) {
    next(err);
  }
});

//POST /api/savedWalks/:userId/:walkId
savedRouter.post('/:userId/:walkId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const walk = await Walk.findByPk(req.params.walkId);
    const hasSavedWalk = await user.hasSavedByUser(walk);
    if (!hasSavedWalk) {
      await user.addSavedByUser(walk);
    }
    res.status(200).send(walk);
  } catch (err) {
    next(err);
  }
});

savedRouter.delete('/:userId/:walkId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const walk = await Walk.findByPk(req.params.walkId);
    await user.removeSavedByUser(walk);
    res.send('deleted');
  } catch (err) {
    next(err);
  }
});

module.exports = savedRouter;
