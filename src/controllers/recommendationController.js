const { getResponse } = require('../utils');

exports.handleRecommendation = async (req, res) => {
    try {
        const { kidsAge, timeAvailable, interests, playWith } = req.body;
        const response = await getResponse(kidsAge, timeAvailable, interests, playWith);

        res.setHeader('Content-Type', 'text/html');  // Explicitly set the content type
        res.send(response);

        //res.json(response);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};