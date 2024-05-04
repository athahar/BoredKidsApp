const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY || 'sk-proj-0a4yhyDeBLP2F8OPJG1lT3BlbkFJ1pPDl3eGW91e4TJvockA',
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
