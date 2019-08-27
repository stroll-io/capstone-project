const savedRouter = require('express').Router();
const User = require('../db/models/user');
const Walk = require('../db/models/walk');

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
    await user.addSavedByUser(walk);
    const newWalk = await user.getSavedByUser({
      where: {
        id: walk.id,
      },
    });
    res.send(newWalk);
  } catch (err) {
    next(err);
  }
});

module.exports = savedRouter;
