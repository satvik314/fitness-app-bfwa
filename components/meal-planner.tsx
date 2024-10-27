"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Meal {
  name: string;
  calories: number;
  ingredients: { name: string; amount: string }[];
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface DayPlan {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
  };
}

export function MealPlanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<DayPlan[]>([]);
  const [calories, setCalories] = useState("2000");
  const [dietaryPreference, setDietaryPreference] = useState("balanced");
  const { toast } = useToast();

  const generateMealPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calorieTarget: parseInt(calories),
          dietaryPreferences: dietaryPreference,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meal plan");
      }

      const data = await response.json();
      if (data.success) {
        setMealPlan(data.mealPlan.days);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Calories</label>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter daily calorie target"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dietary Preference</label>
              <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={generateMealPlan}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Meal Plan"
            )}
          </Button>
        </div>
      </Card>

      {mealPlan.map((day) => (
        <Card key={day.day} className="p-6">
          <h2 className="text-xl font-semibold mb-4">{day.day}</h2>
          {Object.entries(day.meals).map(([mealTime, meal]) => (
            <div key={mealTime} className="mb-4">
              <h3 className="text-lg font-medium capitalize mb-2">{mealTime}</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{meal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {meal.calories} calories | P: {meal.macros.protein}g | 
                  C: {meal.macros.carbs}g | F: {meal.macros.fats}g
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Ingredients:</p>
                  <ul className="text-sm text-muted-foreground">
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.amount} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}
