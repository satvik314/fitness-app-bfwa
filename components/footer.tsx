import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href="https://www.buildfastwithai.com"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              Build Fast with AI
            </Link>
          </p>
        </div>
        <Button asChild variant="ghost" className="gap-1 text-muted-foreground hover:text-primary">
          <Link href="https://www.buildfastwithai.com/genai-course" target="_blank">
            Join Generative AI Bootcamp
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </footer>
  )
}
