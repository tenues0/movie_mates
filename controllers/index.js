const router = require('express').Router();
//set up routes here
//home routes do not require /api prefix, unlike the API routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;