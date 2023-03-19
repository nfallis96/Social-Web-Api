router.use('/users', usersRoutes);

router.use('/thoughts', thoughtsRoutes);

// required express router
const router = require('express').Router();

// For importing routes
const usersRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');


module.exports = router;