const walksRouter = require('express').Router();

const Walk = require('../db/models/walk')

walksRouter.get('/', async (req, res, next) => {
  console.log('in walk router');
  try {
    const allWalks = await Walk.findAll();
    res.send(allWalks)
  }
  catch (err) {
    console.error(err)
  }
})

module.exports = walksRouter;
