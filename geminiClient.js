import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

console.log("Gemini API Key loaded:", import.meta.env.VITE_GEMINI_API_KEY);

export const runGemini = async (prompt, uploadedFile) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // If user uploaded image
    if (uploadedFile) {
      const imageBase64 = await fileToBase64(uploadedFile);
      const imagePart = {
        inlineData: {
          data: imageBase64.split(",")[1], // remove base64 header
          mimeType: uploadedFile.type,
        },
      };

      const result = await model.generateContent([
        prompt,

        imagePart
      ]);

      return result.response.text();
    } else {
      // Text only
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error) {
    console.error("Gemini error:", error);
    return "Error generating content with Gemini.";
  }
};

// helper to convert File → base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
