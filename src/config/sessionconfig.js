const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

TODO: require('dotenv').config();

// MongoDB URL
const mongoUrl = 'mongodb+srv://bkapp:95IpPa26panv4TTs@boredkids-app.it1swtm.mongodb.net/?retryWrites=true&w=majority&appName=boredkids-app'; // Update with your MongoDB URL

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = session({
    secret: 'BOREDAPPKIDS*24',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        collectionName: 'bkapp-sessions'
    }),
    cookie: {
        // secure: false, // Set to true if you're running over HTTPS
        secure: process.env.NODE_ENV === 'production',  // Only use secure cookies in production
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
});


