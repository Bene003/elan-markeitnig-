import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta } from "@/components/funnel";
import { servicesParParcours } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Les services d'Elan Marketing, présentés séparément pour les entreprises et pour les particuliers.",
  alternates: { canonical: "/services" },
};

/**
 * L'article 4 impose que les services soient présentés SÉPARÉMENT par
 * clientèle. D'où deux sections distinctes plutôt qu'une grille de huit.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        titre="Ce que nous réglons,"
        titreAccent="et pour qui"
        intro="Chaque service part d'un problème concret. Si vous ne reconnaissez pas le vôtre, le diagnostic sert justement à le nommer."
      />

      {(
        [
          { parcours: "entreprise", titre: "Pour les entreprises" },
          { parcours: "particulier", titre: "Pour les particuliers" },
        ] as const
      ).map(({ parcours, titre }, index) => (
        <Section
          key={parcours}
          id={parcours === "entreprise" ? "entreprises" : "particuliers"}
          tone={index % 2 === 0 ? "creuse" : "clair"}
          grille={index % 2 !== 0}
        >
          <SectionHeading eyebrow="Services" title={titre} />

          {/* Chaque service est un RANG à deux colonnes : le problème à
              gauche, le résultat à droite. C'est la mise en page qui porte
              l'argument, parce qu'elle met les deux en regard sur la même
              ligne. Quatre cartes empilées auraient dit la même chose en
              laissant le lecteur faire lui-même le rapprochement. */}
          <div className="mt-12 border-t border-line-strong">
            {servicesParParcours(parcours).map((service) => (
              <article
                key={service.slug}
                className="group grid gap-x-10 gap-y-4 border-b border-line py-8 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3 md:grid-cols-[16rem_1fr_1fr]"
              >
                <h3 className="font-display text-[1.2rem] leading-tight font-bold tracking-[-0.02em] text-ink">
                  {service.nom}
                </h3>
                <p className="text-[0.95rem] leading-[1.8] text-ink-muted">
                  {service.probleme}
                </p>
                <p className="flex items-start gap-3 text-[0.95rem] leading-[1.8] text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-2.5 shrink-0 rounded-full border-2 border-brand transition-colors duration-500 group-hover:bg-brand"
                  />
                  {service.resultat}
                </p>
              </article>
            ))}
          </div>
        </Section>
      ))}

      <FinalCta
        titre="On regarde votre situation en 20 minutes"
        texte="Le diagnostic est sans frais et sans suite obligatoire. Vous repartez avec une lecture de votre situation, que nous travaillions ensemble ou non."
      />
    </>
  );
}
