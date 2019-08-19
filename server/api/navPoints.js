const navPointRouter = require('express').Router();
const NavPoint = require('../db/models/navPoint');
const Walk = require('../db/models/walk');

//POST /api/navPoints
navPointRouter.post('/', async (req, res, next) => {
  try {
    const walkInfo = {
<<<<<<< HEAD
      name: "Ben's test walk",
      description: 'a pretty cool walk',
      category: 'dog',
    };
=======
      name: req.body.walkTitle,
      description: req.body.walkDescription,
      category: req.body.walkTag
    }
>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
    const walk = await Walk.create(walkInfo);

    let previous = null;

<<<<<<< HEAD
=======
    //this loop isn't quite magic, but make sure to understand what it's doing if you try to change it
>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
    for (let i = 0; i < req.body.coords.length; i++) {
      const currentPoint = req.body.coords[i];
      let previousId = null;
      let start = i === 0;
      if (previous !== null) {
        previousId = previous.dataValues.id;
<<<<<<< HEAD
      }
      console.log('previousId :', previousId);
=======
      };
>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
      const newPoint = await NavPoint.create({
        location: {
          type: 'Point',
          coordinates: [currentPoint.latitude, currentPoint.longitude],
        },
        prev: previousId,
        next: null,
        start: start,
        walkId: walk.id,
      });

      if (previous !== null) {
        await previous.update({
          next: newPoint.dataValues.id,
        });
      }
      previous = newPoint;
    }
    res.send(req.body);
  } catch (err) {
    next(err);
  }
});

//GET /api/navPoints
navPointRouter.get(`/`, async (req, res, next) => {
  try {
    const allnavPoints = await NavPoint.findAll();
    res.send(allnavPoints);
  } catch (err) {
    next(err);
  }
});

module.exports = navPointRouter;
