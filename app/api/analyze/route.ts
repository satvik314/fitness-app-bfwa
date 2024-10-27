import { NextRequest, NextResponse } from 'next/server';
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Please analyze this image and tell me if the posture is correct. If there are any issues, provide specific recommendations for improvement. Image: ${imageUrl}`,
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json({
      success: true,
      analysis: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
