import { Dumbbell, Utensils, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    title: "Weekly Nutrition Planner",
    description: "Get personalized meal plans tailored to your goals. Track calories and macros with ease.",
    icon: Utensils,
    href: "/nutrition",
  },
  {
    title: "AI Posture Analysis",
    description: "Upload photos and receive instant feedback on your exercise form from our AI trainer.",
    icon: Camera,
    href: "/posture",
  },
  {
    title: "Workout Planner",
    description: "Create and track customized workout routines that match your fitness level and goals.",
    icon: Dumbbell,
    href: "/workouts",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link 
            key={feature.title} 
            href={feature.href}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
