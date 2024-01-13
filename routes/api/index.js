const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/Users', usersRoutes);
router.use('/Thoughts', thoughtsRoutes);

module.exports = router;
