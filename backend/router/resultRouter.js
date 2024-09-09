const express = require('express');
const router = express.Router();
const { calculateScore,getUserResult } = require('../controllers/resultController');
const authenticateToken = require('../middleware/authenticateToken');



// Define the route to calculate score
router.post('/calculatescore',authenticateToken, calculateScore);
router.get('/get-result', authenticateToken ,getUserResult);

module.exports = router;