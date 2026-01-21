
import { GoogleGenAI, Type } from "@google/genai";

export const getGeminiChatResponse = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are 'AlphaBot', a highly intelligent AI parenting assistant for Indian single parents.
        
        Your goal is to simplify the user's life by:
        1. Drafting professional or personal notes.
        2. Providing advice on domestic help management.
        3. Suggesting local activities.
        4. Answering general parenting questions with empathy and expertise.

        Keep responses concise, professional, and actionable. Use common Indian cultural contexts where appropriate.`,
        temperature: 0.7,
      }
    });

    return {
      text: response.text,
      functionCalls: []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "I encountered an error. Let's try again?", functionCalls: [] };
  }
};

export const summarizeArticle = async (articleTitle: string, content: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Please summarize this parenting article titled "${articleTitle}". 
  Provide the following:
  1. THE CORE MESSAGE (1 sentence)
  2. KEY TAKEAWAYS (3 bullet points)
  3. ALPHA ACTION (One immediate thing a busy parent should do today based on this)
  
  Article Content: ${content}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert pediatric consultant who distills long medical/parenting articles into short, actionable summaries for busy parents.",
        temperature: 0.5,
      }
    });
    return response.text || "Could not summarize this article.";
  } catch (error) {
    console.error("Summarization Error:", error);
    return "Error generating AI summary.";
  }
};

export const findNearbyActivities = async (lat: number, lng: number, query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 4 top-rated child-friendly activities or classes for "${query}" near my location. Include name, type, and a short reason why it is great for busy single parents.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.maps?.uri).filter(Boolean) || [];
    
    return {
      text: response.text,
      links: urls
    };
  } catch (error) {
    console.error("Maps Search Error:", error);
    return null;
  }
};

export const searchAlphaGuide = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find 5 high-quality, expert articles or advice summaries related to: ${query}. 
      Include medical guidelines (AAP, WHO), parenting tips, or activity ideas.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              source: { type: Type.STRING },
              sourceUrl: { type: Type.STRING },
              fullContent: { type: Type.STRING }
            },
            required: ["id", "title", "summary", "category", "source", "fullContent"]
          }
        }
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Guide Search Error:", error);
    return null;
  }
};
