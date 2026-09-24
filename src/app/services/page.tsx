import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta } from "@/components/funnel";
import { Ecart } from "@/components/scenes/ecart";
import { servicesParParcours } from "@/content/services";
import { couts } from "@/content/constat";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Les services d'Elan Marketing, présentés séparément pour les entreprises et pour les particuliers.",
  alternates: { canonical: "/services" },
};

/**
 * L'article 4 impose que les services soient présentés SÉPARÉMENT par
 * clientèle. D'où deux sections distinctes plutôt qu'une grille de huit.
 *
 * LA PAGE S'OUVRE SUR LE COÛT, PAS SUR LE CATALOGUE. Cette section vivait sur
 * l'accueil, entre le constat et l'aiguillage. Elle est ici parce qu'elle y
 * fait un travail qu'elle ne faisait pas là-bas : elle dit pourquoi les huit
 * rangs qui suivent valent qu'on les lise. Une liste de services qui commence
 * par la liste demande au lecteur de deviner lui-même ce qu'il y gagne.
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

      {/* ------------------------------------------------------------------
          L'IMPACT. Aucun chiffre dans ce bloc. Nous n'avons pas les données
          d'Élan, et un pourcentage inventé se retourne contre nous au premier
          rendez-vous d'un prospect. La figure dit l'ampleur par sa forme, et sa
          légende écrit noir sur blanc que ce n'est pas une promesse.

          Un mot en grand, une ligne dessous : le mot se retient, la phrase se
          survole. Personne ne lit un paragraphe à cet endroit d'une page.
          ------------------------------------------------------------------ */}
      <Section id="impact" tone="creuse">
        <SectionHeading
          eyebrow="L'impact"
          title={
            <>
              Le problème n&apos;est pas un mois raté.{" "}
              <em className="text-brand italic">C&apos;est l&apos;année</em>
            </>
          }
          subtitle="Un écart de quelques points par mois ne se voit pas. Au bout de douze, il est devenu la distance entre deux entreprises."
        />

        <Ecart className="mt-16" />

        <ul className="grille-filets mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {couts.map((cout) => (
            <li
              key={cout.cle}
              className="group bg-surface-raised p-8 transition-colors duration-500 hover:bg-surface"
            >
              <p className="font-display text-[clamp(1.6rem,2.4vw,2.05rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-ink">
                {cout.mot}
              </p>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-8 bg-brand/40 transition-all duration-500 group-hover:w-16 group-hover:bg-brand"
              />
              <p className="mt-5 text-[0.9rem] leading-[1.7] text-ink-muted">
                {cout.texte}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {(
        [
          { parcours: "entreprise", titre: "Pour les entreprises" },
          { parcours: "particulier", titre: "Pour les particuliers" },
        ] as const
      ).map(({ parcours, titre }, index) => (
        <Section
          key={parcours}
          id={parcours === "entreprise" ? "entreprises" : "particuliers"}
          /* L'alternance part de « clair » et non de « creuse » : la section
             d'impact au-dessus est déjà creuse, et deux fonds identiques
             collés effacent la séparation entre les deux blocs. */
          tone={index % 2 === 0 ? "clair" : "creuse"}
          grille={index % 2 === 0}
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
