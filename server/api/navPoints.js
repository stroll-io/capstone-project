const navPointRouter = require('express').Router();
const NavPoint = require('../db/models/navPoint');

//POST /api/navPoints
navPointRouter.post('/', async (req, res, next) => {
  console.log("req.body :", req.body);
  try {

    await NavPoint.create(req.body);
    res.send(req.body);
  } catch (err) {
    next(err);
  }
});

//GET /api/navPoints
navPointRouter.get('/', async (req, res, next) => {
  try {
    const allnavPoints = await NavPoint.findAll();
    res.send(allnavPoints);
  } catch (err) {
    next(err);
  }
});

module.exports = navPointRouter;
