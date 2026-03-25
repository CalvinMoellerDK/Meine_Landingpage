import { verkaufContent } from "@/content/verkauf";
import { LandingPage } from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: verkaufContent.meta.title,
  description: verkaufContent.meta.description,
};

export default function VerkaufPage() {
  return <LandingPage content={verkaufContent} ctaText="Kostenlose Bewertung" />;
}
