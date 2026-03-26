import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { Home, Search, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.company.name} | Ihr Immobilienexperte`,
  description:
    "Immobilie verkaufen oder kaufen? Wir sind Ihr Makler vor Ort – persönlich, professionell und transparent.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {siteConfig.company.logo ? (
            <Image
              src={siteConfig.company.logo}
              alt={siteConfig.company.name}
              width={140}
              height={40}
              className="h-8 w-auto md:h-10"
            />
          ) : (
            <span className="font-heading text-lg font-bold text-stone-900">
              {siteConfig.company.name}
            </span>
          )}
          <a
            href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
            className="text-sm font-medium text-stone-600 transition-colors hover:text-primary"
          >
            {siteConfig.company.phone}
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary-dark">
              Willkommen
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
              Wie können wir<br />Ihnen helfen?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-stone-500">
              Wählen Sie die passende Option – wir begleiten Sie persönlich und professionell.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Verkauf Card */}
            <Link
              href="/verkauf"
              className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Home className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-stone-900">
                Immobilie verkaufen
              </h2>
              <p className="mt-3 flex-1 text-stone-500">
                Sie möchten Ihre Immobilie verkaufen und suchen einen erfahrenen Makler? Wir erzielen den besten Preis – schnell, diskret und professionell.
              </p>
              <div className="mt-6 flex items-center gap-2 font-semibold text-primary transition-colors group-hover:text-primary-dark">
                Kostenlose Bewertung anfordern
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Kaufen Card */}
            <Link
              href="/akquise"
              className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-stone-900">
                Immobilie kaufen
              </h2>
              <p className="mt-3 flex-1 text-stone-500">
                Sie suchen Ihr Traumhaus oder eine Wohnung als Kapitalanlage? Wir finden die passende Immobilie für Sie – aus unserem exklusiven Portfolio und Off-Market-Angeboten.
              </p>
              <div className="mt-6 flex items-center gap-2 font-semibold text-primary transition-colors group-hover:text-primary-dark">
                Passende Immobilie finden
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-sm text-stone-400 md:flex-row">
          <p>© 2026 {siteConfig.company.name}. Alle Rechte vorbehalten.</p>
          <nav className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-primary">Impressum</a>
            <a href="/datenschutz" className="transition-colors hover:text-primary">Datenschutz</a>
          </nav>
        </div>
        <div className="container mx-auto mt-3 border-t border-stone-200 pt-3 text-center text-xs text-stone-400">
          Designed with ❤️ von{' '}
          <a href="https://dirkkreuter.com" rel="nofollow noopener noreferrer" target="_blank" className="underline hover:text-primary transition-colors">
            Dirk Kreuters Tech Team
          </a>
        </div>
      </footer>
    </div>
  );
}
