"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DAILY_GOALS = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fats: 65,
};

export function MacroTracker() {
  const [consumed, setConsumed] = useState({
    calories: 1450,
    protein: 95,
    carbs: 180,
    fats: 48,
  });

  const getProgress = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Progress</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span>{consumed.calories} / {DAILY_GOALS.calories} kcal</span>
            </div>
            <Progress value={getProgress(consumed.calories, DAILY_GOALS.calories)} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Protein</span>
              <span>{consumed.protein} / {DAILY_GOALS.protein}g</span>
            </div>
            <Progress value={getProgress(consumed.protein, DAILY_GOALS.protein)} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Carbohydrates</span>
              <span>{consumed.carbs} / {DAILY_GOALS.carbs}g</span>
            </div>
            <Progress value={getProgress(consumed.carbs, DAILY_GOALS.carbs)} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fats</span>
              <span>{consumed.fats} / {DAILY_GOALS.fats}g</span>
            </div>
            <Progress value={getProgress(consumed.fats, DAILY_GOALS.fats)} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}