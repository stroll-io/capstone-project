const walksRouter = require('express').Router();
const Walk = require('../db/models/walk');
const NavPoint = require('../db/models/navPoint');

//GET /api/walks/:walkId
walksRouter.get('/:walkId', async (req, res, next) => {
  try {
    const navPointsForWalk = await Walk.findByPk(req.params.walkId, {
      include: [{ model: NavPoint }],
    });
    let corrdArray = navPointsForWalk.navPoints.filter(point => point.start);
    console.log('TCL: corrdArray', corrdArray);
    console.log('TCL: corrdArray length', corrdArray.length);

    while (corrdArray[corrdArray.length - 1].next) {
      let navPointToAdd = navPointsForWalk.navPoints.filter(
        point => point.id === corrdArray[corrdArray.length - 1].next
      );
      corrdArray.push(navPointToAdd);
      console.log('TCL: corrdArray from inside loop', corrdArray);
    }
    navPointsForWalk.navPoints = corrdArray;
    res.send(navPointsForWalk);
  } catch (err) {
    next(err);
  }
});

module.exports = walksRouter;
