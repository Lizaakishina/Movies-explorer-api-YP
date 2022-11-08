const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { signIn, signUp } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', signIn);
router.post('/signup', signUp);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

module.exports = router;
