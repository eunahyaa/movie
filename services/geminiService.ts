
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateReviewQuestions = async (movieTitle: string): Promise<string> => {
  try {
    if (!movieTitle) {
        return "영화 제목을 먼저 입력해주세요.";
    }

    const prompt = `영화 '${movieTitle}'에 대한 깊이 있는 리뷰를 작성하는 데 도움이 될 만한 흥미로운 질문 3가지를 한국어로 작성해줘. 각 질문은 줄바꿈으로 구분하고, 번호 없이 질문만 제공해줘.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating review questions:", error);
    return "AI 질문 생성에 실패했습니다. 잠시 후 다시 시도해주세요.";
  }
};
