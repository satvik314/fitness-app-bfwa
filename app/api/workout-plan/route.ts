import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export const maxDuration = 5;

const workoutPlanSchema = z.object({
  weeklyPlan: z.object({
    focus: z.string(),
    days: z.array(
      z.object({
        day: z.string(),
        focus: z.string(),
        emoji: z.string(),
        exercises: z.array(
          z.object({
            name: z.string(),
            sets: z.number(),
            reps: z.string(),
            weight: z.string(),
            notes: z.string().optional(),
          })
        ),
      })
    ),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const { fitnessLevel, goals, preferences } = await req.json();

    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: workoutPlanSchema,
      prompt: `Generate a weekly workout plan with the following requirements:
        - Fitness Level: ${fitnessLevel}
        - Fitness Goals: ${goals}
        - Preferences: ${preferences}
        - Include a mix of exercises for each muscle group
        - Provide detailed sets, reps, and weight recommendations
        - Include appropriate rest days
        - Consider progressive overload principles
        - Add relevant emojis for each day's focus
        ${preferences ? `\nAdditional preferences:\n${preferences}` : ''}`,
    });

    return NextResponse.json({
      success: true,
      workoutPlan: result.object.weeklyPlan,
    });
  } catch (error) {
    console.error("Workout plan generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate workout plan" },
      { status: 500 }
    );
  }
}
