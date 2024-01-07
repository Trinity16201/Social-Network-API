const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/usersRoutes', usersRoutes);
router.use('/thoughtsRoutes', thoughtsRoutes);

module.exports = router;
