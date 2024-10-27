import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Your Personal AI
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"> Fitness Assistant</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
          Transform your fitness journey with AI-powered nutrition planning, posture analysis, and personalized workout routines.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/planner">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/posture">Try Posture Analysis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}