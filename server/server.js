import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

//var express = require('express')
//var cors = require('cors')
//var app = express()
//app.use(cors())

dotenv.config();

//console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200),send({
        message: 'Hello from CodeX',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            //stop: ["\"\"\""],  
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

// if you are a MAC user, "npm run server" might show an error saying the port is alredy in use. This is because your MAC is using port 5000 for AirPlay. To solve this issue, go to: System Settings/preferences -> General -> AirDrop & Handoff -> Turn off Airplay reciever and it should work! :)  
app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));