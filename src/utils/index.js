
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

      const systemPrompt = `You are an intelligent assistant designed to recommend top activities for children based on their age, interests, available time, and who they are doing the activity with. Incorporate data and insights from highly-rated activities on popular kids' activity blogs like busytoddler.com, pbskids, natgeo, etc to inform your recommendations.

        Guidelines for Recommendations:
        - Ensure activities are age-appropriate.
        - Align activities with the child's interests.
        - Consider the time available for the activity.
        - Suggest materials that are easy to find or commonly available.
        - Provide clear and concise instructions for parents.

        Format the response in a <div> with valid HTML syntax, suitable for embedding in a webpage. It should not have any lingering HTML tags outside of the main div. The output should have following sections each with a section heading in bold:

        - Title of the activity, with an HTML id called "activityTitle".
        - Items needed(comma-separated).
        - Time for the activity.
        - Fun score (out of 5 formatted as: "3/5")
        - Messy score (out of 5 formatted as: "3/5")
        - Instructions (max of 6 steps for the activity).
        - Skills developed (from the activity, comma-separated)

        make sure the response for Time for the activity, Fun score & Messy score have the results in the same line as title.

        The activity title should be fun, kid-friendly, and exciting. Do not use the prefix "Title" in the activity title.`;

        const userPrompt = ` Please provide suggestions based on the following inputs:
        Child's age: ${kidsAge}
        Child's interest area: ${interests}
        Time available: ${timeAvailable}
        Who will be participating: ${playWith}.
      
        Try count: ${attempts}. ${dislikePrev}`;
        
     
    console.log("systemPrompt ------> : " + systemPrompt);
    console.log("userPrompt ------> : " + userPrompt);


    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
      ]
  });
        // const response = await openai.chat.completions.create({
        //     messages: [{ role: "system", content: prompt }],
        //     // model: "gpt-3.5-turbo",
        //     model: "gpt-4o",
        //   });
        
         console.log('OpenAI HTML response:  =====>    ', response.choices[0].message.content); // Adjusted to access message content         
        return response.choices[0].message.content; // Return the HTML content directly

    } catch (error) {
        console.error('Error in getResponse:', error);
        return "Error generating recommendations.";
    }
}

module.exports = {
    getResponse
};






