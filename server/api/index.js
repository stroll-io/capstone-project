const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/navPoints', require('./navPoints'));
router.use('/walks', require('./walks'));
router.use('/userPins', require('./userPins'));
router.use('/walks', require('./walks'));
router.use('/favorites', require('./favorites'));
router.use('/pastWalks', require('./pastWalks'));
router.use('/attractions', require('./attractions'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
