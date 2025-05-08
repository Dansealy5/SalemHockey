const express = require('express');
const router = express.Router();

//test route
router.get('/test', (req, res) => {
  res.send('Sample API route working!');
});



module.exports = router;