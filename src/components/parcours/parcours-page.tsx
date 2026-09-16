import {
  Anneaux,
  ButtonLink,
  Container,
  Display,
  Eyebrow,
} from "@/components/ui";
import {
  PainCards,
  Outcomes,
  ProcessSteps,
  CaseStudies,
  GoogleReviews,
  PricingSlot,
  WhyUs,
  Faq,
  FinalCta,
} from "@/components/funnel";
import { ParcoursSetter } from "./parcours-setter";
import { contenuParcours } from "@/content/parcours";
import { etudesDeCas } from "@/content/cas";
import type { Parcours } from "@/lib/parcours";

/**
 * Le tunnel complet, joué deux fois. /entreprises et /particuliers sont la
 * MÊME composition : seule la clé de contenu change.
 *
 * C'est la résolution de la tension du chantier. La référence retenue est un
 * tunnel long à audience unique, alors que l'art. 3 impose un aiguillage vers
 * deux clientèles. Plutôt que d'affaiblir le tunnel pour le rendre commun, on
 * le joue intégralement de chaque côté, avec des douleurs et un vocabulaire
 * propres à chacun.
 */
export function ParcoursPage({ parcours }: { parcours: Parcours }) {
  const c = contenuParcours[parcours];

  return (
    <>
      <ParcoursSetter parcours={parcours} />

      {/* Hero de parcours. Sombre comme l'accueil, mais ALIGNÉ À GAUCHE et en
          deux colonnes là où l'accueil est centré : arriver ici depuis
          l'accueil doit se sentir comme un changement de lieu, pas comme le
          même écran avec un autre texte.

          La colonne de droite reprend les quatre étapes du parcours en très
          petit. Elle n'apporte pas d'information neuve (elles sont détaillées
          plus bas), elle répond à la seule question qu'un prospect se pose
          en haut d'une page longue : combien de temps ça m'engage. */}
      <section className="sur-sombre relative isolate overflow-hidden bg-surface-invert text-ink-invert">
        <div
          aria-hidden="true"
          className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-10"
        />
        <Anneaux className="bottom-[-40%] left-[-16%] hidden size-[34rem] lg:block" />

        <Container className="py-16 sm:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Eyebrow tone="sombre">{c.eyebrow}</Eyebrow>
              <Display
                as="h1"
                taille="grand"
                className="mt-6 text-ink-invert"
              >
                {c.titre} <em className="text-accent italic">{c.titreAccent}</em>
              </Display>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.8] text-ink-invert-muted">
                {c.promesse}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" variant="invert" withArrow>
                  Réserver un diagnostic de 20 minutes
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  className="border-invert-line bg-transparent text-ink-invert hover:border-accent hover:bg-transparent hover:text-accent"
                >
                  Voir les services
                </ButtonLink>
              </div>
            </div>

            <ol
              aria-label="Les étapes du parcours"
              className="border-t border-invert-line"
            >
              {c.etapes.map((etape) => (
                <li
                  key={etape.numero}
                  className="flex items-baseline gap-4 border-b border-invert-line py-4"
                >
                  <span className="font-display text-[0.72rem] font-semibold tracking-[0.16em] text-accent/70">
                    {etape.numero}
                  </span>
                  <span className="text-[0.9rem] text-ink-invert-muted">
                    {etape.titre}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <PainCards titre={c.douleursTitre} douleurs={c.douleurs} />
      <Outcomes titre={c.resultatsTitre} resultats={c.resultats} />
      <ProcessSteps titre={c.etapesTitre} etapes={c.etapes} />
      <CaseStudies cas={etudesDeCas} />
      <GoogleReviews />
      <PricingSlot />
      <WhyUs titre={c.pourquoiTitre} points={c.pourquoi} />
      <Faq questions={c.faq} />
      <FinalCta titre={c.ctaTitre} texte={c.ctaTexte} />
    </>
  );
}
