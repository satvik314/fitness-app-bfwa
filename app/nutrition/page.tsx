"use client";

import { WeeklyMealPlanner } from "@/components/weekly-meal-planner";
import { LearningPromo } from "@/components/learning-promo";

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Weekly Nutrition Planner</h1>
            <WeeklyMealPlanner />
          </div>
          <div className="md:col-span-1">
            <LearningPromo />
          </div>
        </div>
      </main>
    </div>
  );
}
