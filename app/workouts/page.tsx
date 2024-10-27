import { WeeklyWorkoutPlannerComponent } from "@/components/weekly-workout-planner";
import { LearningPromo } from "@/components/learning-promo";

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Weekly Workout Planner</h1>
            <WeeklyWorkoutPlannerComponent />
          </div>
          <div className="md:col-span-1">
            <LearningPromo />
          </div>
        </div>
      </main>
    </div>
  );
}
