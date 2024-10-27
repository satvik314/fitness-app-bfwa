import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PromoBanner() {
  return (
    <div className="bg-primary/10 border-b">
      <div className="container flex items-center justify-center gap-2 py-2 text-center text-sm">
        <p>
          Level up your AI skills with our Generative AI Bootcamp
        </p>
        <Link
          href="https://www.buildfastwithai.com/genai-course"
          target="_blank"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
