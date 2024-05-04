// Middleware for logging requests
function logRequests(req, res, next) {
    console.log(`Received ${req.method} request for '${req.url}'`);
    next(); // Move to the next middleware or route handler
}

// Middleware to set common headers
function setHeaders(req, res, next) {
    res.setHeader('X-Powered-By', 'BoredKids App');
    next();
}

// Error handling middleware
function handleError(err, req, res, next) {
    console.error(err);
    res.status(500).send('Something went wrong!');
}

module.exports = {
    logRequests,
    setHeaders,
    handleError
};
