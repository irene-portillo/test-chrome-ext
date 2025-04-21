console.log("Please please PLEASEEEE EELOOADDDDDD");

import {GoogleGenAI} from './node_modules/@google/genai/dist/web/index.mjs';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: 'AIzaSyD4ep-RLPf8Ttmc1RNAC7A2n76XkWSCOfY'});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
