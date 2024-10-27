import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const mealPlanSchema = z.object({
  weeklyPlan: z.object({
    calories: z.number(),
    dietaryFocus: z.string(),
    cuisine: z.string(),
    days: z.array(
      z.object({
        day: z.string(),
        meals: z.object({
          breakfast: z.object({
            name: z.string(),
            cuisine: z.string(),
            calories: z.number(),
            ingredients: z.array(
              z.object({
                name: z.string(),
                amount: z.string(),
              })
            ),
            macros: z.object({
              protein: z.number(),
              carbs: z.number(),
              fats: z.number(),
            }),
          }),
          lunch: z.object({
            name: z.string(),
            cuisine: z.string(),
            calories: z.number(),
            ingredients: z.array(
              z.object({
                name: z.string(),
                amount: z.string(),
              })
            ),
            macros: z.object({
              protein: z.number(),
              carbs: z.number(),
              fats: z.number(),
            }),
          }),
          dinner: z.object({
            name: z.string(),
            cuisine: z.string(),
            calories: z.number(),
            ingredients: z.array(
              z.object({
                name: z.string(),
                amount: z.string(),
              })
            ),
            macros: z.object({
              protein: z.number(),
              carbs: z.number(),
              fats: z.number(),
            }),
          }),
        }),
      })
    ),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const { dietaryPreferences, calorieTarget, cuisinePreference, customInstructions } = await req.json();

    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: mealPlanSchema,
      prompt: `Generate a weekly meal plan with the following requirements:
        - Dietary preferences: ${dietaryPreferences}
        - Daily calorie target: ${calorieTarget}
        - Cuisine preference: ${cuisinePreference}
        - Include breakfast, lunch, and dinner for each day
        - Include detailed ingredients and macronutrient breakdown
        - Ensure meals align with ${cuisinePreference} cuisine traditions and ingredients
        - Use authentic ${cuisinePreference} recipes and cooking methods
        ${customInstructions ? `\nAdditional requirements:\n${customInstructions}` : ''}`,
    });

    return NextResponse.json({
      success: true,
      mealPlan: result.object.weeklyPlan,
    });
  } catch (error) {
    console.error("Meal plan generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate meal plan" },
      { status: 500 }
    );
  }
}
