
const { OpenAI } = require("openai");

// Directly create an instance of the OpenAI client with the API key
const openai = new OpenAI({
    apiKey: process.env.API_KEY || 'sk-proj-0a4yhyDeBLP2F8OPJG1lT3BlbkFJ1pPDl3eGW91e4TJvockA',
});


/**
 * Calls the OpenAI API to generate a response based on provided parameters.
 * @param {string} kidsAge - Age group of the kids.
 * @param {string} timeAvailable - Time available for the activity.
 * @param {string} interests - Interests to tailor the activities.
 * @param {string} playWith - Companions for the activity.
 * @returns {Promise<string>} - The generated activity suggestion.
 */
async function getResponse(kidsAge, timeAvailable, interests, playWith) {
    console.log('Calling getResponse with:', { kidsAge, timeAvailable, interests, playWith });
    try {
        const prompt = `Generate the most fun, creative at-home activity for children to do when bored for the age ${kidsAge} and 
    for an activity of ${timeAvailable} with interests in ${interests} and play with ${playWith}. 
    It should return these elements ONLY formatted in HTML syntax, but provide inside a <div>, that can be embedded in the html page - the title of the activity, 
    items needed, time for the activity, fun score and a messy score and a description of the activity 
    in steps. The fun score and messy score should be out of 5, and formatted example as: 3/5. 
    Activity title should be fun, kid-friendly and feel exciting.`;

        console.log('Generated prompt:', prompt);
         // const response = await openai.createCompletion({
         //    model: "gpt-3.5-turbo",
         //    max_tokens: 500,
         //    messages: [{role: "user", content: prompt}]
         //  }).catch((err)=>console.log(err.response));

        //  const response = await openai.createCompletion({
        //     model: "gpt-3.5-turbo",  // Adjust model ID based on the one you are licensed to use
        //     prompt: prompt,
        //     max_tokens: 500,
        //     temperature: 0.7  // Add temperature if needed, or other parameters like stop sequences
        // });


        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
          });
        
         console.log('OpenAI response:', response.choices[0].message.content); // Adjusted to access message content
        return response.choices[0].message.content; // Return the HTML content directly

    } catch (error) {
        console.error('Error in getResponse:', error);
        return "Error generating recommendations.";
    }
}

module.exports = {
    getResponse
};



//const prompt = `Generate a fun activity for kids aged ${kidsAge} with ${timeAvailable} available focusing on ${interests} and involving ${playWith}.`;