import type { ReactNode } from "react";

/**
 * LA SCÈNE DE L'ÉCART : deux trajectoires parties du même point, et la surface
 * qui se creuse entre les deux.
 *
 * C'est le deuxième temps du récit de l'accueil, celui qui répond à « à quel
 * point ça m'impacte ». La réponse n'est pas un chiffre, c'est une forme, et
 * c'est délibéré : nous n'avons aucune donnée du client, et un pourcentage
 * inventé se retourne contre nous dès le premier rendez-vous. Une surface qui
 * s'ouvre dit l'ampleur sans rien promettre. La légende sous la figure le pose
 * noir sur blanc.
 *
 * ZÉRO JAVASCRIPT, comme le reste de l'accueil.
 *
 * LE TRACÉ SE FAIT AU `clip-path`, PAS AU `stroke-dashoffset`. La méthode
 * classique — `pathLength="1"` plus un `stroke-dasharray` — a été essayée et
 * abandonnée : combinée à `vector-effect="non-scaling-stroke"`, dont on a
 * besoin ici, elle rend des morceaux de courbe au lieu d'un tracé continu,
 * parce que le motif de tirets et l'épaisseur du trait ne sont plus calculés
 * dans le même espace. Un `inset()` qui se referme est plus grossier sur le
 * papier, mais il est exact dans tous les navigateurs et il s'anime sur le fil
 * de composition. Chaque courbe a donc son propre calque, ce qui est aussi ce
 * qui permet de leur donner deux départs différents.
 *
 * L'ÉTAT AU REPOS EST L'ÉTAT FINAL, comme la scène de la montée : aucun
 * `clip-path` n'est posé par défaut, les deux courbes sont entières. Le tracé
 * ne se rejoue que dans le bloc gardé de globals.css. Sans
 * `animation-timeline`, sous `prefers-reduced-motion` ou sans JS, on voit la
 * figure complète, jamais un cadre vide.
 *
 * `preserveAspectRatio="none"` étire le dessin sur toute la boîte, ce qui rend
 * fiables les positions en pourcentage des étiquettes HTML. La contrepartie
 * serait des traits d'épaisseur inégale selon leur pente :
 * `vector-effect="non-scaling-stroke"` l'annule.
 */

/** Les deux courbes partent du même point. C'est ce qui rend l'écart lisible. */
const DEPART = "M 8 232";
const TRAJET_PLAT = `${DEPART} C 180 224, 360 232, 560 220`;
const TRAJET_MONTANT = `${DEPART} C 190 224, 360 132, 560 40`;
/** La zone : la montante à l'aller, la plate au retour, refermée sur le départ. */
const ZONE = `${TRAJET_MONTANT} L 560 220 C 360 232, 180 224, 8 232 Z`;

function Calque({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 568 240"
      preserveAspectRatio="none"
      className={`absolute inset-0 size-full ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function Ecart({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="ecart relative h-64 w-full sm:h-80">
        <Calque className="ecart-zone">
          <defs>
            <linearGradient id="ecart-remplissage" x1="0" y1="1" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor="var(--color-brand)"
                stopOpacity="0.02"
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity="0.24"
              />
            </linearGradient>
          </defs>
          <path d={ZONE} fill="url(#ecart-remplissage)" />
        </Calque>

        <Calque className="ecart-trait ecart-trait-bas">
          <path
            d={TRAJET_PLAT}
            fill="none"
            stroke="var(--color-ink-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </Calque>

        <Calque className="ecart-trait ecart-trait-haut">
          <path
            d={TRAJET_MONTANT}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </Calque>

        {/* Les étiquettes sont en HTML, pas en <text> SVG : dans un viewBox
            étiré, un texte SVG se déforme et sa taille ne suit plus l'échelle
            typographique de la page. En pourcentages, elles restent collées à
            l'extrémité de leur courbe à toutes les largeurs. */}
        <span className="ecart-etiquette absolute top-[8%] right-0 flex translate-y-[-100%] items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-brand uppercase sm:text-[0.75rem]">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
          Avec une structure
        </span>
        <span className="ecart-etiquette absolute top-[95%] right-0 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-ink-muted uppercase sm:text-[0.75rem]">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-ink-muted/50"
          />
          Sans
        </span>

        {/* La mesure de l'écart. C'est le seul élément qui nomme le sujet de
            la scène, donc il arrive en dernier dans l'animation. */}
        <span className="ecart-mesure absolute top-[24%] right-[9rem] hidden items-center gap-3 sm:flex">
          {/* En vert de MARQUE et non en vert d'accent : l'accent tombe à
              3,09:1 sur fond clair, et c'est du vrai texte, pas un ornement. */}
          <span aria-hidden="true" className="h-[7.5rem] w-px bg-brand/40" />
          <span className="font-display text-[0.8rem] font-semibold tracking-[0.16em] text-brand uppercase">
            L&apos;écart
          </span>
        </span>
      </div>

      <figcaption className="mt-10 max-w-xl text-[0.9rem] leading-[1.75] text-ink-muted">
        Ce n&apos;est pas une promesse de chiffres. C&apos;est la différence
        entre repartir de zéro chaque mois et repartir du mois précédent.
      </figcaption>

      <dl className="sr-only">
        <dt>Sans structure</dt>
        <dd>
          Une trajectoire qui reste au même niveau du premier au douzième mois.
        </dd>
        <dt>Avec une structure</dt>
        <dd>
          Une trajectoire partie du même point, qui s&apos;élève régulièrement.
          L&apos;espace entre les deux se creuse avec le temps.
        </dd>
      </dl>
    </figure>
  );
}
