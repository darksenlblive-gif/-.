
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVideoSummary = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Проанализируй видео с названием "${title}" и описанием "${description}". Напиши краткое саммари на русском языке (2-3 предложения), почему это стоит посмотреть.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Не удалось сгенерировать саммари.";
  }
};

export const getSmartReply = async (commentText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Придумай остроумный и дружелюбный ответ от лица автора канала на этот комментарий: "${commentText}"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "Спасибо за ваш комментарий!";
  }
};
