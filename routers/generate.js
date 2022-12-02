const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser")
const express = require('express')
const router = express.Router()
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {
  console.log(req.body.text)

      const headerPrompt = 
        ` Write a header for this product: ${req.body.text}
          Header: 
        `

      const headerCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: headerPrompt,
        max_tokens: 100,
        temperature: 0,
      });

      const subHeaderPrompt = 
        `
          Write a subheader for this product: ${req.body.text}
          Header: ${headerCompletion.data.choices[0].text}
          Subheader: 
        `

      const subheaderCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: subHeaderPrompt,
        max_tokens: 100,
        temperature: 0,
      });

      const descriptionPrompt = 
        `
          Write a description for this product: ${req.body.text}
          Header: ${headerCompletion.data.choices[0].text}
          Subheader: ${subheaderCompletion.data.choices[0].text}
          Description: 
        `

      const descriptionCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: descriptionPrompt,
        max_tokens: 100,
        temperature: 0,
      });

      const ctaPrompt = 
        `
          Write a cta for this product: ${req.body.text}
          Header: ${headerCompletion.data.choices[0].text}
          Subheader: ${subheaderCompletion.data.choices[0].text}
          Description: ${descriptionCompletion.data.choices[0].text}
          CTA: 
        `

      const ctaCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ctaPrompt,
        max_tokens: 100,
        temperature: 0,
      });
    
      res.json({
          header: headerCompletion.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, "").trim(),
          subheader: subheaderCompletion.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, "").trim(),
          description: descriptionCompletion.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, "").trim(),
          cta: ctaCompletion.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, "").trim()
      })

})

module.exports = router