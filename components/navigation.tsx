"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Build Fast with AI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/nutrition"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/nutrition' ? 'text-primary' : ''
              }`}
            >
              Nutrition
            </Link>
            <Link
              href="/workouts"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/workouts' ? 'text-primary' : ''
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/posture"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/posture' ? 'text-primary' : ''
              }`}
            >
              Posture
            </Link>
          </nav>
          <Button asChild variant="default" size="sm">
            <Link href="https://www.buildfastwithai.com/genai-course" target="_blank">
              Join AI Bootcamp
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
