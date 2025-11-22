import { GoogleGenAI } from "@google/genai";
import { RESUME_STRING } from '../constants';

export const chatWithMallikAI = async (userMessage: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]): Promise<string> => {
  // Safe check for process.env to avoid "process is not defined" error in browser
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

  if (!apiKey) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are an AI assistant representing Vinukonda Jayachandra Mallik. 
            Answer questions as if you are him, or a knowledgeable assistant.
            
            STRICT FORMATTING GUIDELINES:
            1. Use **Markdown** to structure your response.
            2. Use **Bold** for key technologies, project titles, and achievements.
            3. Use Bullet Points (-) for lists of skills, features, or steps.
            4. Keep paragraphs short (2-3 sentences).
            5. Be professional, humble, and enthusiastic about AI and Full-Stack dev.
            
            Context:
            ${RESUME_STRING}
            
            If asked about a project, describe the Tech Stack first using a list.`,
        },
        history: history 
    });

    const response = await chat.sendMessage({
        message: userMessage
    });

    return response.text || "I couldn't generate a response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI brain right now.";
  }
};