const router = require('express').Router();
const userRoutes = require('../routes/api/userRoutes');
const thoughtsRoutes = require('../routes/api/thoughtsRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;