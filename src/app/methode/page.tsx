import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta, Faq } from "@/components/funnel";
import { etapesMethode } from "@/content/methode";
import { faqCommune } from "@/content/faq";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Diagnostic, stratégie, mise en place, suivi, croissance. Ce que vous obtenez à chaque étape, et ce qui se passe après le premier rendez-vous.",
  alternates: { canonical: "/methode" },
};

/**
 * Le site actuel présente la méthode du point de vue du travail d'Elan. Cette
 * page la présente du point de vue de ce que le client obtient, et répond à la
 * question que le site actuel laisse ouverte : ce qui se passe APRÈS le
 * rendez-vous.
 */
export default function MethodePage() {
  return (
    <>
      <PageHero
        eyebrow="Méthode"
        titre="Ce qui se passe après"
        titreAccent="le premier rendez-vous"
        intro="Cinq étapes. Pour chacune, ce que nous faisons, ce que vous obtenez, et ce que nous attendons de vous."
      />

      <Section tone="creuse">
        <SectionHeading
          eyebrow="Les étapes"
          title="Du diagnostic à la croissance"
        />

        {/* Chaque étape est un rang plein cadre, pas une carte : le numéro
            composé en très grand à gauche fait la colonne vertébrale de la
            page, et l'œil descend la suite 01 → 05 sans effort. Ce que le
            client OBTIENT est en encre pleine, ce qu'Elan fait et ce qu'on
            attend de lui sont en encre atténuée : la hiérarchie de couleur
            dit qui est le sujet de la phrase. */}
        <ol className="mt-12 border-t border-line-strong">
          {etapesMethode.map((etape) => (
            <li
              key={etape.numero}
              className="grid gap-x-10 gap-y-6 border-b border-line py-10 lg:grid-cols-[14rem_1fr]"
            >
              <div className="flex items-baseline gap-5 lg:block">
                <span
                  aria-hidden="true"
                  className="font-display text-[3.2rem] leading-none font-extrabold tracking-[-0.05em] text-brand/25"
                >
                  {etape.numero}
                </span>
                <div className="lg:mt-3">
                  <h2 className="font-display text-[1.3rem] leading-tight font-bold tracking-[-0.02em] text-ink">
                    <span className="sr-only">Étape {etape.numero} : </span>
                    {etape.titre}
                  </h2>
                  <p className="mt-2 text-[0.72rem] tracking-[0.16em] text-ink-muted uppercase">
                    {etape.duree}
                  </p>
                </div>
              </div>

              <dl className="grid gap-8 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                    Ce que nous faisons
                  </dt>
                  <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink-muted">
                    {etape.action}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-brand uppercase">
                    Ce que vous obtenez
                  </dt>
                  <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink">
                    {etape.livrable}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                    Ce qu&apos;on attend de vous
                  </dt>
                  <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink-muted">
                    {etape.attenduDuClient}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </Section>

      <Faq questions={faqCommune} />

      <FinalCta
        titre="La première étape dure vingt minutes"
        texte="Elle est sans frais et sans suite obligatoire. C'est le seul moyen honnête de savoir si la suite a du sens."
      />
    </>
  );
}
