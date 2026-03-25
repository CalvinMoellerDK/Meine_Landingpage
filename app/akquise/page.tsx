import { akquiseContent } from "@/content/akquise";
import { LandingPage } from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: akquiseContent.meta.title,
  description: akquiseContent.meta.description,
};

export default function AkquisePage() {
  return <LandingPage content={akquiseContent} ctaText="Suchprofil anlegen" />;
}
