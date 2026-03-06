import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    // Try the most current model names
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Fixed model name
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    });

    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Content generation failed: ${error.message}`);
  }
}

export default main;