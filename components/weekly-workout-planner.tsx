'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  notes?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  emoji: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  focus: string;
  days: WorkoutDay[];
}

export function WeeklyWorkoutPlannerComponent() {
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([])
  const [fitnessLevel, setFitnessLevel] = useState("intermediate")
  const [fitnessGoals, setFitnessGoals] = useState("strength")
  const [preferences, setPreferences] = useState("")
  const { toast } = useToast()

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  const generateWorkoutPlan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/workout-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fitnessLevel,
          goals: fitnessGoals,
          preferences: preferences.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate workout plan")
      }

      const data = await response.json()
      if (data.success) {
        setWorkoutPlan(data.workoutPlan.days)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Level</label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Goals</label>
              <Select value={fitnessGoals} onValueChange={setFitnessGoals}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="hypertrophy">Muscle Growth</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="general-fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Preferences</label>
            <Textarea
              placeholder="Add any specific requirements (e.g., 'home workouts only', 'no barbells', 'include cardio')"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="min-h-[100px] resize-y"
            />
          </div>

          <Button
            onClick={generateWorkoutPlan}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Workout Plan"
            )}
          </Button>
        </div>
      </Card>

      {workoutPlan.length > 0 && (
        <div className="space-y-4">
          {workoutPlan.map((day) => (
            <Card key={day.day}>
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors" 
                onClick={() => toggleDay(day.day)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <span className="mr-2 text-2xl" role="img" aria-label={day.focus}>
                      {day.emoji}
                    </span>
                    {day.day}
                  </CardTitle>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      {day.focus}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      {expandedDay === day.day ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedDay === day.day && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent>
                      {day.exercises.length > 0 ? (
                        <ul className="space-y-3">
                          {day.exercises.map((exercise, index) => (
                            <li key={index} className="bg-muted/50 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{exercise.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {exercise.sets} sets × {exercise.reps}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Weight: {exercise.weight}
                                {exercise.notes && (
                                  <p className="mt-1 text-xs italic">{exercise.notes}</p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-muted-foreground">Rest Day</p>
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
