const attractionsRouter = require("express").Router();
const Attraction = require('../db/models/attraction');

attractionsRouter.get('/:walkId', async (req, res, next) => {
  try {
    const attractions = await Attraction.findAll({
      where: {
        walkId: req.params.walkId
      }
    })
    res.send(attractions);
  } catch(err) {
    next(err)
  }
})



module.exports = attractionsRouter
