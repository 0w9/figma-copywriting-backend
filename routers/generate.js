const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const router = express.Router()
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  if(req.hasOwnProperty("body")) {
    /* const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    });
  
    res.json({
        response: completion.data.choices[0].text
    })
    */

    res.json({
      response: "This works."
    })
  }
  
})

module.exports = router