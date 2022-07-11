const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const ratingRoutes = require('./ratingRoutes')

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/rating', ratingRoutes)

module.exports = router;
