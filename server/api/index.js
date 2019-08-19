const router = require('express').Router();
module.exports = router;

// router.use((req, res, next) => {
//   console.log(req)
// })

router.use('/users', require('./users'));
router.use('/navPoints', require('./navPoints'));
<<<<<<< HEAD
router.use('/walks', require('./walks'));
=======
router.use('/userPins', require('./userPins'));

>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
