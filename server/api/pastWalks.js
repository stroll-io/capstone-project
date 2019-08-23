const pastWalksRouter = require('express').Router();
const User = require("../db/models/user");
const Walk = require("../db/models/walk");

pastWalksRouter.post('/:userId/:walkId', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
  const walk = await Walk.findByPk(req.params.walkId);
  const newWalk = await user.setWalkedByUser(walk);
  res.send(newWalk);
  } catch(err) {
    next(err);
  }
})

module.exports = pastWalksRouter;
