const walksRouter = require('express').Router();
const Walk = require('../db/models/walk');
const NavPoint = require('../db/models/navPoint');

//GET /api/walks/:walkId
walksRouter.get('/:walkId', async (req, res, next) => {
  try {
    const walkInstance = await Walk.findByPk(req.params.walkId, {
      include: [{ model: NavPoint }],
    });
    let walkCopy = walkInstance.get({
      plain: true,
    });

    let navPointsArray = walkInstance.navPoints;
    let orderedPoints = navPointsArray.filter(point => point.start === true);
    while (orderedPoints[orderedPoints.length - 1].next !== null) {
      const nextPoint = navPointsArray.filter(
        point => point.id === orderedPoints[orderedPoints.length - 1].next
      );
      orderedPoints = [...orderedPoints, ...nextPoint];
    }
    walkCopy.navPoints = orderedPoints;
    res.json(walkCopy);
  } catch (err) {
    next(err);
  }
});

walksRouter.get('/tags/:tag', async (req, res, next) => {
  try {
    const walks = await Walk.findAll({
      where: {
        category: req.params.tag,
      },
    });
    res.send(walks);
  } catch (err) {
    next(err);
  }
});

walksRouter.get('/', async (req, res, next) => {
  try {
    const allWalks = await Walk.findAll();
    res.send(allWalks);
  } catch (err) {
    next(err);
  }
});

module.exports = walksRouter;
