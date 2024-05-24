const { getResponse } = require('../utils');


// Define the formatResponse function right within this file or import it if it's defined elsewhere
const formatResponse = (response) => {
    // Adjust this according to the actual structure of the response from getResponse
    if (!response || response.trim() === '') {
        return `
          <div class="response-container">
            <p>No activities, please try again...</p>
          </div>
        `;
    }
    // Replace newline characters with HTML paragraph tags
    const message = response.replace(/\n/g, '</p><p>');
    return `
        <div class="response-container">
            <div><p style="font-size:1em; color: #666;">✨ Try this out</p></div>
            <p>${message}</p>
        </div>
        <hr>
        <p class="feedback">Not interested in this activity?
        Try customizing your options to get a new recommendation.</p>
    `;
};





// get random custom option, if user has not chosen
function getRandomOptions() {
    const ageRanges = ["less than 2 years", "2 to 4 years", "4 to 8 years", "9 to 12 years", "12+ years"];
    const interests = [
        "Incredible Arts & Crafts", "Yummy Tasty Unique Baking", "Exhilarating Building & Constructing",
        "Captivating Drama & Acting", "Exhilarating Lego", "Marvelous Music & Dance", "Incredible Reading & Story Telling",
        "Breathtaking Sports & Physical games", "Captivating Science Experiments", "Captivating STEM activity", "Thrilling Outdoor Adventure"
    ];
    const playWithOptions = [
        "self-play", "siblings", "friends", "parents"
    ];

    // Function to pick a random item from an array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    const randomAge = getRandomItem(ageRanges);
    const randomInterest = getRandomItem(interests);
    const randomPlayWith = getRandomItem(playWithOptions);

    return {
        age: randomAge,
        interest: randomInterest,
        playWith: randomPlayWith
    };
}


exports.handleRecommendation = async (req, res) => {
    try {
        let { kidsAge, timeAvailable, interests, playWith, attempts, prevActivityTitle } = req.body;

         // Generate random options if necessary
        if (!kidsAge || !interests || !playWith) {
            const randomOptions = getRandomOptions();
            kidsAge = kidsAge || randomOptions.age;  // Use provided or random age
            interests = interests || randomOptions.interest;  // Use provided or random interest
            playWith = playWith || randomOptions.playWith;  // Use provided or random play with option
        }

                // Use a default for time available if not provided
        timeAvailable = timeAvailable || '1-2 hours';

        console.log("prevActivityTitle: " + prevActivityTitle);

        const response = await getResponse(kidsAge, timeAvailable, interests, playWith, attempts, prevActivityTitle);
        const formattedResponse = formatResponse(response);
        res.setHeader('Content-Type', 'text/html');
        res.send(formattedResponse);
    } catch (error) {
        console.error('Error handling recommendation:', error);
        res.status(500).send('Internal Server Error');
    }
};




