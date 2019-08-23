const favoritesRouter = require("express").Router();
const User = require('../db/models/user');
const Walk = require('../db/models/walk');


favoritesRouter.post('/:userId/:walkId', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId);
  const walk = await Walk.findByPk(req.params.walkId);
  const newFavorite = await user.setFavoritedByUser(walk)
  res.send(newFavorite)
  } catch(err) {
    next(err)
  }
})

module.exports = favoritesRouter
