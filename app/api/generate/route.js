import { NextResponse } from "next/server";

const systemPrompt = `
You are a Flashcard creator, your task is to generate concise and effective flashcards based on the given topic or content, follow these guidelines:

    1. Create accurate, clear, and concise questions for the front of the flashcards.
    2. Provide accurate and informative answers for the back of the flashcard.
    3. Make sure each flashcard focuses on a single concept or piece of information.
    4. Use simple language to make the flashcards accessible to a wide range of learners.
    5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
    6. Avoid overly complex or ambiguous phrasing in both questions and answers.
    7. Tailor the difficulty level of the flashcards to the user's specified preferences.
    8. If given, a body of text extract the most important concept or relevant information for the flashcards.
    9. Aim to create a balanced set of flashcards that covers the topic comprehensively.
    10. Make sure to keep the answer part small, like one to five words.
    11.Only generate 10 flashcards.
    Remember the goal is effective learning and retention of information through these flashcards.

    Return in the following JSON format:
    {
      "flashcards": [
        {
          "front": str,
          "back": str,
          
        }
      ]
    }
`;

export async function POST(req) {
  const data = await req.text();

  // Replace OpenAI SDK call with a fetch request to OpenRouter
  const response = await fetch('https://api.openrouter.ai/v1/chat/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4', // Adjust based on the models available on OpenRouter
    }),
  });

  if (!response.ok) {
    return NextResponse.error({ status: 404, statusText: "Failed to get a response from OpenRouter." });
  }

  const completion = await response.json();
  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}
