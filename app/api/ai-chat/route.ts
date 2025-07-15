import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content: `
            You are private and personal AI doctor. 
            Your goal is to answer about user health issue, and lifestyle questions and give medical insights.
            Answer in short to the point
        `,
        },
        ...messages,
      ],
    });
    return Response.json(completion.choices[0].message);
  } catch (error) {
    return Response.json(error);
  }
}
