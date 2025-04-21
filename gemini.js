
/** Get parameters !
 * @param {string} inputText  input text with event details
 * @returns {Promise<Array<Object>>}  json array details output 
 */

// Import GOOGLE GEMNI API 
import {GoogleGenAI} from './node_modules/@google/genai/dist/web/index.mjs';

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Currently unsure how to use .env so will just stick to this for now

// security issue i will have to fix later, this cant be public ! 
const GEMINI_API_KEY = 'AIzaSyD4ep-RLPf8Ttmc1RNAC7A2n76XkWSCOfY'; 
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// Prompt gemni for ICS json output when analyzing text
async function promptForICS(inputText) { 
    const prompt = `
    Your objective as an AI assistant is to extract structured calendar event 
    data from what the user desires (emails and texts).

    Steps:
    1. Extract the selected or given text.
    2. Identify any events mentioned.
    3. For each event, return an object with:
        - timezone (e.g., "America/Los_Angeles")
        - startTime (e.g., "Apr 25, 2025 10:00 AM PST" must be in this format for dates) 
        - endTime   (e.g., "Apr 25, 2025 11:30 AM PST")
        - title
        - description
        - venueName
        - address (street only)
        - city
        - state

    Use context clues if needed. For ex, if you get a prompt for just a month 
    and day for ex. it makes sense that it should be for 2025 since we are
    currently in 2025. If you don't know the time you can continue to just put N/A for that part

    If a field is missing, use "N/A".

    Output must be a JSON array of event‐objects exactly matching this schema 
    and must be in the exact order given. Every on of the required things in 
    the list in the config portion must be there and in order please ! 

    Examples of output (events)
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
    
    Here is the input text you should be analyzing from the user: 
    "${inputText}"
    `;

    const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: prompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
            timezone:    { type: 'string', 
                           description: 'IANA timezone', nullable: false },
            title:       { type: 'string', 
                           description: 'Short title of the event', 
                           nullable: false },
            startTime:   { type: 'string', 
                           description: 'Event start date/time', 
                           nullable: false },
            endTime:     { type: 'string', description: 'Event end date/time', 
                           nullable: false },
            description: { type: 'string', 
                           description: 'Brief summary or context', 
                           nullable: false },
            venueName:   { type: 'string', description: 'Name of venue', 
                           nullable: false },
            address:     { type: 'string', description: 'Street address only', 
                           nullable: false },
            city:        { type: 'string', description: 'City', 
                           nullable: false},
            state:       { type: 'string', description: 'State or region code', 
                           nullable: false }
            },
            required: [
            'timezone',
            'title',
            'startTime',
            'endTime',
            'description',
            'venueName',
            'address',
            'city',
            'state'
            ]
        }        
        }
    }
    }); 
    // it gives stuff in alphabetical order so might as well switch my stuff
    // later tho 

    console.log(response.text);
    console.log("Sending to client side");
    return JSON.parse(response.text);
}

// tests 
// promptForICS("May 12 well be having a picnic ! It should be at tepper");
// promptForICS("timezone: America/New_York, title: Workshop, Apr 22, 2025 10:00 AM EST endTime: Apr 22, 2025 12:00 PM EST description: Client training venueName:WeWork,address: 567 East Ave, city: New York, state: NY");