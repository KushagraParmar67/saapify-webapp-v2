import type { Metadata } from "next";
import { AIPageClient } from "@/components/ai/ai-page-client";

export const metadata: Metadata = {
  title: "AI Suite",
  description:
    "SaaPify AI Suite — custom AI models, automation, and intelligent workflows built for real business outcomes.",
};

export default function AIPage() {
  return <AIPageClient />;
}
