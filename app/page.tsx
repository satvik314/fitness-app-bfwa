import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { PromoCard } from "@/components/promo-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main>
        <Hero />
        <Features />
        <section className="container mx-auto px-4 py-16">
          <PromoCard />
        </section>
      </main>
    </div>
  );
}
