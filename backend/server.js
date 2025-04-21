// Call gemni here 
/*
Sources used: 
https://ai.google.dev/gemini-api/docs#javascript (Gemni API docs)

I need to move this to node js!!! This is backend and apparently this is 
unsafe so I need to learn how to use node js bc i havent used it before

*/

// const express = require('express'); // to avoid path issues 
// const path = require('path');

// const app = express();

// // load a file
// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, '..', 'index.html'));
// })

// // load data 
// app.get('/api/user', (req, res)=>{
//     const users = [
//         {
//         id: '123',
//         name: 'Shawun',
//         },
//         {
//             id: '456',
//             name: 'Mia',
//         },  
//     ]

//     res.json(users);
// });
    
// app.listen(8080, () => {
//     console.log('server is listening apparently 8080');
// });

// Learning about Node.js : https://www.youtube.com/watch?v=C_vv1D5oDZ0&ab_channel=CBTNuggets
// This is the file we send to the front end apparently 
// html file is sent back 
// exectures stuff from js code sent back..?





// Use first one first 
// import { GoogleGenAI } from "@google/genai/web";

// const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

// async function main() {
//     const prompt = `List a few popular cookie recipes using this JSON schema:

//     Recipe = {'recipeName': string}
//     Return: Array<Recipe>`;

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//     });
//     console.log(response.text);
// }

// main();



// Load in API
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

async function main() {
    
    // My prompt to create calendar
    const prompt = 
    `
    Your objective as an AI assistant is to extracts structured calendar event 
    data from what the user desires 
    (emails and texts for the most part as of now)

    Steps:
    First you must extract the selected or given text.
    Then from the input, identify any events mentioned. 
        For each event, return a JSON object with the following keys:
        - timezone (e.g., "America/Los_Angeles")
        - startTime (e.g., "Apr 25, 2025 10:00 AM PST")
        - endTime (e.g., "Apr 25, 2025 11:30 AM PST")
        - title (short name of the event)
        - description (brief summary or context)
        - venueName (if available)
        - address (street address only)
        - city
        - state

    If any of the categories don't have the information neccessary, simply
    put N/A in it's place 

    Examples of output 
    [
        {
            "timezone": "America/Los_Angeles",
            "startTime": "Apr 25, 2025 10:00 AM PST",
            "endTime": "Apr 25, 2025 11:30 AM PST",
            "title": "Team Standup",
            "description": "Daily check-in meeting",
            "venueName": "Main Office",
            "address": "123 Innovation Blvd",
            "city": "San Jose",
            "state": "CA"
        },
        {
        timezone: "America/New_York",
        title: "Workshop",
        startTime: "Apr 22, 2025 10:00 AM EST",
        endTime: "Apr 22, 2025 12:00 PM EST",
        description: "Client training",
        venueName: "WeWork",
        address: "567 East Ave",
        city: "New York",
        state: "NY"
        }
    ]
    
    Return: Array<events>`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,

    });

    // Later make this into sending this to make the ics file 
    console.log(response.text);
}

// createDownloadICSFile(
//     'America/Los_Angeles',
//     new Date('Jan 1, 2020 08:00 PST'),
//     new Date('Jan 4, 2020 17:00 PST'),
//     'Example Event',
//     'This is the event description',
//     'Washington State Convention Center',
//     '705 Pike St',
//     'Seattle',
//     'WA'
//   );  

// Loop through each and use them
//   geminiResponse.forEach(event => {
//     createDownloadICSFile(
//       event.timezone,
//       new Date(event.startTime),
//       new Date(event.endTime),
//       event.title,
//       event.description,
//       event.venueName,
//       event.address,
//       event.city,
//       event.state
//     );
//   });


main();