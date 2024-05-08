const express = require('express');
const { handleRecommendation } = require('../controllers/recommendationController');
const router = express.Router();
const path = require('path');  // Import the path module

router.get('/test', (req, res) => {
    res.send('Test route is working');
});

// Serve the HTML file for the root route
router.get('/', (req, res) => {
     if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views += 1;
    res.sendFile(path.join(__dirname, '../../views/index.html')); // This should now work correctly
});

// POST route to handle recommendations
router.post('/recommendations', (req, res, next) => {

     if (!req.session.attempts) {
        req.session.attempts = 0; // Initialize attempts if not already done
    }
    req.session.attempts += 1; // Increment the attempt count
    next();
}, handleRecommendation);

module.exports = router;
