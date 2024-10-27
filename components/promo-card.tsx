import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function PromoCard() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle>Supercharge Your AI Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Join our 6-week Generative AI Bootcamp and learn to build AI-powered applications
          from industry experts. Get hands-on experience with the latest AI technologies.
        </p>
        <Button asChild>
          <Link href="https://www.buildfastwithai.com/genai-course" target="_blank">
            Join Bootcamp
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
