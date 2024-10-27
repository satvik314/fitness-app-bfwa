'use client'

import { useRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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

const CUISINE_OPTIONS = [
  { value: "indian", label: "Indian" },
  { value: "chinese", label: "Chinese" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "thai", label: "Thai" },
  { value: "korean", label: "Korean" },
  { value: "italian", label: "Italian" },
  { value: "middle-eastern", label: "Middle Eastern" },
  { value: "western", label: "Western" },
] as const;

interface CollapsibleMealCardProps {
  mealType: string;
  meal: Meal;
}

function CollapsibleMealCard({ mealType, meal }: CollapsibleMealCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="bg-muted hover:bg-muted/80 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-left text-muted-foreground mt-1">
              {meal.name} • {meal.calories} calories
            </p>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Macros:</p>
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium">Protein</p>
                    <p>{meal.macros.protein}g</p>
                  </div>
                  <div>
                    <p className="font-medium">Carbs</p>
                    <p>{meal.macros.carbs}g</p>
                  </div>
                  <div>
                    <p className="font-medium">Fats</p>
                    <p>{meal.macros.fats}g</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Ingredients:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {meal.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-20 flex-shrink-0">{ingredient.amount}</span>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export function WeeklyMealPlanner() {
  const [activeDay, setActiveDay] = useState('Monday')
  const [isLoading, setIsLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState<DayPlan[]>([])
  const [calories, setCalories] = useState("2000")
  const [dietaryPreference, setDietaryPreference] = useState("balanced")
  const [cuisinePreference, setCuisinePreference] = useState<string>("western")
  const [customInstructions, setCustomInstructions] = useState("")
  const { toast } = useToast()
  
  // Create a single ref to hold all day elements
  const daysContainerRef = useRef<HTMLDivElement>(null)

  const generateMealPlan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calorieTarget: parseInt(calories),
          dietaryPreferences: dietaryPreference,
          cuisinePreference: cuisinePreference,
          customInstructions: customInstructions.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meal plan")
      }

      const data = await response.json()
      if (data.success) {
        setMealPlan(data.mealPlan.days)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToDay = (day: string) => {
    if (!daysContainerRef.current) return
    
    const dayElement = daysContainerRef.current.querySelector(`[data-day="${day}"]`)
    if (dayElement) {
      dayElement.scrollIntoView({ behavior: 'smooth' })
      setActiveDay(day)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Cuisine Preference</label>
              <Select value={cuisinePreference} onValueChange={setCuisinePreference}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUISINE_OPTIONS.map((cuisine) => (
                    <SelectItem key={cuisine.value} value={cuisine.value}>
                      {cuisine.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Instructions</label>
            <Textarea
              placeholder="Add any specific requirements or preferences (e.g., 'no spicy food', 'more protein-rich breakfast', 'include traditional festival foods')"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="min-h-[100px] resize-y"
            />
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

      {mealPlan.length > 0 && (
        <>
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
            <ScrollArea className="w-full">
              <div className="flex justify-between space-x-2">
                {mealPlan.map((dayPlan) => (
                  <button
                    key={dayPlan.day}
                    onClick={() => scrollToDay(dayPlan.day)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      activeDay === dayPlan.day ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {dayPlan.day}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-8" ref={daysContainerRef}>
            {mealPlan.map((dayPlan) => (
              <motion.div
                key={dayPlan.day}
                data-day={dayPlan.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">{dayPlan.day}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(dayPlan.meals).map(([mealType, meal]) => (
                    <CollapsibleMealCard
                      key={mealType}
                      mealType={mealType}
                      meal={meal}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
