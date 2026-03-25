"use client";

import { useState, FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import type { ContactContent } from "@/types/content";

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    name.trim() &&
    email.trim() &&
    message.trim() &&
    consent &&
    !isSubmitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-stone-900 md:text-3xl">
              {content.successMessage}
            </h2>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
          {content.badge && (
            <div className="mb-4">
              <Badge text={content.badge} />
            </div>
          )}
          <h2 className="font-heading text-3xl font-bold text-stone-900 md:text-4xl">
            {content.headline}
          </h2>
          {content.subheadline && (
            <p className="mt-4 text-lg text-stone-500">{content.subheadline}</p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mx-auto max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-stone-100 bg-white p-6 shadow-lg md:p-8"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {content.fields.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {content.fields.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {content.fields.phone}
              </label>
              <PhoneInput
                international
                defaultCountry="DE"
                value={phone}
                onChange={setPhone}
                className={`${inputClasses} [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:text-stone-900 [&_.PhoneInputInput]:placeholder-stone-400`}
              />
              {phone && !isValidPhoneNumber(phone) && (
                <p className="mt-1 text-xs text-red-500">Bitte gültige Telefonnummer eingeben</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                {content.fields.message}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-stone-300 text-primary accent-primary"
              />
              <span
                className="text-sm leading-relaxed text-stone-500"
                dangerouslySetInnerHTML={{ __html: content.fields.consent }}
              />
            </label>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && (
                <Loader2 size={18} className="animate-spin" />
              )}
              {content.fields.submit}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
