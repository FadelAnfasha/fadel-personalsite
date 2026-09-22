import { GoogleGenAI } from "@google/genai";

// Gunakan model resmi yang valid
const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT =
  "Kamu adalah AI Assistant resmi Fadel Anfasha Putra. Jawablah pertanyaan pengguna dengan ramah, profesional, dan singkat mengenai profil, skill, serta pengalaman Fadel.";

function getClient(): GoogleGenAI | null {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY tidak ditemukan di environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

/**
 * Konversi riwayat pesan lokal ke format yang diterima oleh Google Gen AI SDK
 */
export function toGeminiHistory(
  messages: ReadonlyArray<{ role: "user" | "assistant"; content: string }>,
): ChatMessage[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

/**
 * Memeriksa konektivitas ke Gemini API
 */
export async function pingGemini(): Promise<boolean> {
  const ai = getClient();
  if (!ai) return false;

  try {
    await ai.models.generateContent({
      model: MODEL,
      contents: "ping",
    });
    return true;
  } catch (err) {
    console.error("LLM ping error:", err);
    return false;
  }
}

/**
 * Mengirim percakapan ke Gemini API
 */
export async function askGemini(history: ChatMessage[]): Promise<string> {
  const ai = getClient();
  if (!ai) throw new Error("API key tidak ditemukan.");

  const res = await ai.models.generateContent({
    model: MODEL,
    contents: history,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  return res.text ?? "Maaf, AI tidak memberikan respon.";
}
