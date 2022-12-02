const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const router = express.Router()
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  if(req.hasOwnProperty("body")) {
    if(req.hasOwnProperty("text")) {
      const firstPrompt = 
        `Write a header for this product: ${req.body.text}`

        console.log(firstPrompt)

      const secondPrompt = 
        `Write a subheader for this product: ${req.body.text}`

      const thirdPrompt = 
        `Write a description for this product: ${req.body.text}`

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: firstPrompt,
        max_tokens: 7,
        temperature: 0,
      });
    
      res.json({
          response: completion.data.choices[0].text
      })
    }
    
  }
  
})

module.exports = router