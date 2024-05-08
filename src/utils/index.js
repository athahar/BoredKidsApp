
const { OpenAI } = require("openai");

// Directly create an instance of the OpenAI client with the API key
const openai = new OpenAI({
    apiKey: process.env.API_KEY || 'sk-proj-0a4yhyDeBLP2F8OPJG1lT3BlbkFJ1pPDl3eGW91e4TJvockA',
});


function getRandomWord() {
  // Implement a function to get a random word from a list or generate one
    const words = ["Ingeniously", "Originality", "Inventively", "Resourcefully", "Artistically", "Inspirationally", "Curiously", "Adventurously", "Inquisitively", "Pioneeringly", "Experimentally", "Improvisationally", "Unconventionally", "Innovatively", "Groundbreakingly", "Groundbreakingly", "Trailblazingly", "Visionarily", "Uncharted", "Pioneeringly"];
  return words[Math.floor(Math.random() * words.length)];
}



/**
 * Calls the OpenAI API to generate a response based on provided parameters.
 * @param {string} kidsAge - Age group of the kids.
 * @param {string} timeAvailable - Time available for the activity.
 * @param {string} interests - Interests to tailor the activities.
 * @param {string} playWith - Companions for the activity.
 * @returns {Promise<string>} - The generated activity suggestion.
 */
async function getResponse(kidsAge, timeAvailable, interests, playWith, attempts, prevActivityTitle) {

  
    var dislikePrev;


    console.log('Calling getResponse with --> :', { kidsAge, timeAvailable, interests, playWith,attempts, prevActivityTitle });

    try {
    //     const prompt = `Generate a fun, creative activity for children for the age ${kidsAge} and 
    // for an activity of ${timeAvailable} with interests in ${interests} and play with ${playWith}. 
    // It should return these elements ONLY formatted in HTML syntax, but provide inside a <div>, that can be embedded in the html page - the title of the activity, 
    // items needed, time for the activity, fun score and a messy score and a description of the activity 
    // in steps. The fun score and messy score should be out of 5, and formatted example as: 3/5. 
    // Activity title should be fun, kid-friendly and feel exciting. the title shouldn't have the prefix "Title".  Try count: ${attempts}`;

    if (attempts > 1) {
        dislikePrev = "I dislike the previous suggestion of: " + prevActivityTitle + ", so please suggest a very different type of activity"        
    }

    const randomWord = getRandomWord(); // Implement a function to get a random word
    const prompt = `Generate a ${randomWord} fun activity for kids aged ${kidsAge} with ${timeAvailable} available focusing on ${interests} and play involving ${playWith}. It should return these elements ONLY formatted in HTML syntax, but provide inside a <div>, that can be embedded in the html page - the title of the activity, 
    items needed, time for the activity, fun score and a messy score and a description of the activity 
    in steps. The fun score and messy score should be out of 5, and formatted example as: 3/5. 
    Activity title should be fun, kid-friendly and feel exciting. the title shouldn't have the prefix "Title", but should have a html id called activityTitle. 
    Try count: ${attempts}. ${dislikePrev} `;        

    //console.log("prompt ------> : " + prompt);

        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
          });
        
         //console.log('OpenAI response:', response.choices[0].message.content); // Adjusted to access message content         
        return response.choices[0].message.content; // Return the HTML content directly

    } catch (error) {
        console.error('Error in getResponse:', error);
        return "Error generating recommendations.";
    }
}

module.exports = {
    getResponse
};






