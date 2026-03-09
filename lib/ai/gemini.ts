import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateKsaReport(input: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a Saudi Arabia business expansion consultant.

Client Information:
Name: ${input.fullName}
Investor Type: ${input.investorType}
Business Activity: ${input.activity}
City: ${input.city}
Visas: ${input.visas}
Timeline: ${input.timeline}

Provide:
1. Estimated setup cost range
2. Recommended company structure
3. Business expansion advice
4. Key compliance requirements
5. Suggested timeline

Keep response professional and short.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}