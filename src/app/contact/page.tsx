import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { Faq } from "@/components/funnel";
import { BookingEmbed } from "@/components/forms/booking-embed";
import { QualifyingForm } from "@/components/forms/qualifying-form";
import { faqCommune } from "@/content/faq";
import { entreprise } from "@/content/entreprise";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Réservez un diagnostic de 20 minutes avec Elan Marketing, ou écrivez-nous. Montréal.",
  alternates: { canonical: "/contact" },
};

/**
 * Le rendez-vous vient EN PREMIER, le formulaire ensuite. C'est la décision de
 * conversion du chantier : pour une personne prête à avancer, remplir un
 * formulaire et attendre une réponse est un détour, pas un service.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        titre="Réservez un diagnostic"
        titreAccent="de 20 minutes"
        intro="Choisissez un créneau, sans frais et sans suite obligatoire. Si vous préférez écrire, le formulaire plus bas fonctionne tout aussi bien."
      />

      <Section>
        <BookingEmbed />
      </Section>

      <Section id="formulaire" tone="creuse">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <SectionHeading
              eyebrow="Ou écrivez-nous"
              title="Dites-nous ce qui vous bloque"
              subtitle="Plus vous êtes précis, plus notre première réponse sera utile."
            />
            <div className="mt-10 max-w-xl">
              <QualifyingForm />
            </div>
          </div>

          <aside>
            <h2 className="text-xs font-medium tracking-[0.18em] text-ink uppercase">
              Nous joindre directement
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <a
                  href={`tel:${entreprise.telephone.replace(/\s/g, "")}`}
                  className="text-brand underline underline-offset-4"
                >
                  {entreprise.telephoneAffiche}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${entreprise.courriel}`}
                  className="text-brand underline underline-offset-4"
                >
                  {entreprise.courriel}
                </a>
              </li>
            </ul>
            <h2 className="mt-8 text-xs font-medium tracking-[0.18em] text-ink uppercase">
              Adresse
            </h2>
            <address className="mt-4 text-sm leading-relaxed text-ink-muted not-italic">
              {entreprise.adresse.rue}
              <br />
              {entreprise.adresse.ville}, {entreprise.adresse.region}{" "}
              {entreprise.adresse.codePostal}
            </address>
          </aside>
        </div>
      </Section>

      <Faq questions={faqCommune} />
    </>
  );
}
