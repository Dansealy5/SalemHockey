const express = require('express');
const router = express.Router();

//test route
router.get('/test', (req, res) => {
  res.send('Sample API route working!');
});

//mount routes
router.use('/admins', require('../routes/admins'));
router.use('/announcements', require('../routes/announcements')); 
router.use('/auth', require('../routes/auth'));
router.use('/events', require('../routes/events'));
router.use('/games', require('../routes/games'));
router.use('/media', require('../routes/media'));
router.use('/notifications', require('../routes/notifications'));
router.use('/players', require('../routes/players'));
router.use('/stats', require('../routes/stats'));
router.use('/users', require('../routes/users'));

module.exports = router;