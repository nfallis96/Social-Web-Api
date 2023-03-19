// Notify 'Wrong Route! if wrong route was used
router.use((req, res) => res.send('Wrong Route!'));

// convey all api routes
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// necessary express router
const router = require('express').Router();


// convey router
module.exports = router; 