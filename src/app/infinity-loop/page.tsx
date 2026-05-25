import type { Metadata } from "next";
import { InfinityLoopSection } from "@/components/infinity-loop";

export const metadata: Metadata = {
  title: "The Infinity Loop – SaaPify",
  description:
    "Seven disciplines. One continuous flow. Our services interconnect and reinforce each other — strategy fuels creative, creative drives organic growth.",
};

export default function InfinityLoopPage() {
  return (
    <main className="min-h-screen bg-[#0a192f] pt-16">
      <InfinityLoopSection />
    </main>
  );
}
