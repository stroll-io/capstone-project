const router = require('express').Router();
module.exports = router;

// router.use((req, res, next) => {
//   console.log(req)
// })

router.use('/users', require('./users'));
router.use('/navPoints', require('./navPoints'));
router.use('/walks', require('./walks'));
router.use('/userPins', require('./userPins'));
router.use('/walks', require('./walks'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
