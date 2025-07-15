import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { conversation } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content: `Based on conversation between user and assistant generate a response with
                the complaint for user health issue.
                 A summary according to user report and give a health treatement at home.
                 What are the symptom patient is suffering,
                 how long patient was suffering (like 1 week, 3 day, 1 month), the severity.
                 Give medicine name and dose for the patient.
                 And recommendation.
                conversation: ${conversation}

                task:
                Generate with the following well structure json format.
                {
                complaint: "",
                summary: "",
                symptom: [],
                duration: "",
                severity: "",
                medicine: [{name: "", dose: ""}],
                recommendation: []
                }`,
        },
      ],
    });
    const result = completion.choices[0].message.content;
    return Response.json(result);
  } catch (err) {
    return Response.json(err);
  }
}
