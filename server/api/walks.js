const walksRouter = require('express').Router();

const Walk = require('../db/models/walk')

walksRouter.get('/:id', async (req, res, next) => {
  try {
    const walk = await Walk.findOne({
      where: { id:req.params.id }
    })
    res.send(walk)
  } catch (err) {
    next(err)
  }
})

walksRouter.get('/', async (req, res, next) => {
  try {
    const allWalks = await Walk.findAll();
    res.send(allWalks)
  }
  catch (err) {
    next(err)
  }
})

module.exports = walksRouter;
