/**
 * L'ANCRAGE : un plan de quartier, avec un repère posé dessus.
 *
 * Ce que la section « à propos » vend n'est pas une histoire d'entreprise,
 * c'est une proximité : quelqu'un de nommé, à une adresse réelle, qu'on peut
 * rencontrer. Une figure de localisation dit cela sans une phrase de plus.
 *
 * LA PREMIÈRE VERSION ÉTAIT UN RADAR ET NON UNE CARTE, et c'était une erreur
 * de forme, pas de dessin. Des anneaux concentriques autour d'un point central
 * avec deux axes en croix, c'est un écran de veille : ça balaie, ça cherche,
 * ça ne situe pas. Trois choses font qu'une figure se lit comme un plan :
 *
 *   1. UN CADRE RECTANGULAIRE. Un plan est une découpe du monde, donc il a des
 *      bords droits et le dessin les dépasse. Un cercle se referme sur
 *      lui-même et redevient un logo.
 *   2. UNE TRAME DE RUES DE BIAIS. C'est le trait le plus reconnaissable de
 *      Montréal : le damier n'est pas aligné sur le nord, il suit le fleuve.
 *      Une grille droite lirait comme un fond d'écran ; une grille inclinée
 *      lit comme une ville.
 *   3. UN REPÈRE EN GOUTTE, ET DÉCENTRÉ. Un point au milieu d'une cible est un
 *      viseur. Une adresse, elle, n'est jamais au centre de son plan.
 *
 * CE PLAN NE PRÉTEND PAS ÊTRE UNE CARTE EXACTE DE MONTRÉAL, et c'est
 * volontaire. Redessiner une géographie réelle à vue donnerait un plan faux
 * que tout Montréalais repérerait. On garde donc le seul trait qui soit à la
 * fois vrai et lisible, l'inclinaison de la trame, et rien d'autre n'est
 * présenté comme une localisation. Le vrai repérage est le texte à côté.
 *
 * L'ÉTAT AU REPOS EST DÉJÀ L'AFFICHE FINALE : le plan entier, le repère à sa
 * place, la mention lisible. Les animations sont deux calques purement
 * additifs, tous deux gardés, et sans eux on ne perd rien.
 */

/* Le plan est dessiné dans un repère DROIT, puis le groupe entier est incliné
   d'un coup. Incliner chaque trait séparément serait la même image pour
   quarante fois plus de code, et le moindre réglage d'angle deviendrait
   quarante corrections. Les traits débordent largement du cadre : c'est ce
   débordement qui fait qu'on voit une découpe et non un motif centré. */
const RUES = Array.from(
  { length: 20 },
  (_, i) => `M-240 ${-96 + i * 24}H600`,
).join("");

const AVENUES = Array.from(
  { length: 21 },
  (_, i) => `M${-240 + i * 40} -140V380`,
).join("");

export function Ancrage({
  ville,
  rue,
  className,
}: {
  ville: string;
  rue?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="ancrage-carte relative aspect-[16/10] w-full max-w-md overflow-clip rounded-xs border border-line-strong bg-surface-raised">
        {/* Le plan. `overflow-clip` du parent et le viewBox du SVG coupent tous
            deux ce qui dépasse : pas de `clipPath` avec un identifiant, qui se
            dupliquerait si la figure servait deux fois sur une page. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 360 225"
          className="ancrage-plan absolute inset-0 size-full"
        >
          <g transform="rotate(-27 180 112.5)">
            {/* L'eau : la ville s'arrête, et c'est ce qui donne au plan un
                dehors. Sans elle, la trame est infinie et redevient un motif.
                La rive est posée à 222 et non plus bas, parce qu'une fois le
                groupe incliné, tout ce qui passe sous 230 sort du cadre et
                l'eau n'existe plus que dans le code. */}
            <path
              d="M-240 222q90 -10 180 0t180 0 180 0 180 0V380H-240Z"
              className="fill-brand/12"
            />
            <path
              d="M-240 222q90 -10 180 0t180 0 180 0 180 0"
              fill="none"
              strokeWidth="1.5"
              className="stroke-brand/40"
            />

            {/* Deux parcs. Une tache non rectangulaire au milieu d'un damier,
                et la trame cesse d'être une texture pour devenir un lieu. */}
            <path
              d="M58 150q34 -16 72 -10t42 32q6 26 -26 38t-60 0q-30 -10 -28 -60Z"
              className="fill-accent/15"
            />
            <path
              d="M300 24q26 -6 38 12t-8 32q-24 12 -38 -8t8 -36Z"
              className="fill-accent/12"
            />

            {/* Les îlots bâtis. Ils occupent des cases entières de la trame et
                jamais un demi-îlot : c'est ce calage qui fait qu'ils se lisent
                comme des bâtiments et non comme des taches posées dessus. */}
            <rect x="200" y="48" width="40" height="24" className="fill-ink/7" />
            <rect x="280" y="144" width="40" height="48" className="fill-ink/7" />
            <rect x="40" y="0" width="40" height="24" className="fill-ink/5" />
            <rect x="120" y="72" width="40" height="24" className="fill-ink/5" />
            <rect x="360" y="120" width="40" height="24" className="fill-ink/5" />

            {/* La trame ordinaire. Deux tracés pour quarante et une rues : un
                seul élément par direction, donc un balisage qui reste court. */}
            <path
              d={RUES}
              fill="none"
              strokeWidth="0.75"
              className="stroke-line"
            />
            <path
              d={AVENUES}
              fill="none"
              strokeWidth="0.75"
              className="stroke-line"
            />

            {/* Les artères. Une ville sans hiérarchie de voies se lit comme du
                papier millimétré : ce sont ces quatre traits épais qui donnent
                l'échelle de tout le reste. */}
            <path
              d="M-240 120H600M-240 216H600M160 -140V380M280 -140V380"
              fill="none"
              strokeWidth="3"
              className="stroke-line-strong"
            />
          </g>
        </svg>

        {/* LE REPÈRE. Décentré, parce qu'une adresse ne tombe jamais au milieu
            de son plan, et parce qu'un objet au centre exact d'un cadre se lit
            comme une cible. */}
        <div className="absolute top-[46%] left-[38%]">
          {/* L'onde est posée au PIED du repère et elle est aplatie : une onde
              ronde centrée sur la tête de l'épingle redonnerait exactement le
              radar qu'on vient d'enlever. Aplatie et partant du sol, elle se
              lit comme un signal émis depuis un point au sol. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-4 w-12 -translate-x-1/2 rounded-[50%] border border-brand/50 opacity-0 motion-safe:animate-[ancrage-onde_5.5s_var(--ease-elan)_infinite]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-4 w-12 -translate-x-1/2 rounded-[50%] border border-brand/50 opacity-0 motion-safe:animate-[ancrage-onde_5.5s_var(--ease-elan)_2.75s_infinite]"
          />

          {/* Le centrage est sur l'enveloppe, la chute sur l'épingle. Une
              animation qui pose `transform` écrase le `-translate-x-1/2`, et
              le repère atterrirait à côté de son propre point. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 block -translate-x-1/2"
          >
            <svg
              viewBox="0 0 24 34"
              className="ancrage-repere block w-6 origin-bottom drop-shadow-sm"
            >
              <path
                d="M12 0A12 12 0 0 0 0 12c0 8.4 12 22 12 22s12-13.6 12-22A12 12 0 0 0 12 0Z"
                className="fill-brand"
              />
              <circle cx="12" cy="12" r="4.25" className="fill-surface" />
            </svg>
          </span>
        </div>

        {/* L'étiquette de rue, dans la typographie du site et non dans le SVG :
            elle ne s'incline pas avec la trame, exactement comme les libellés
            d'un plan imprimé restent droits quelle que soit l'orientation. */}
        {rue ? (
          <span className="absolute top-[46%] left-[38%] ml-5 -translate-y-1 rounded-xs border border-line bg-surface/90 px-2 py-1 text-[0.62rem] font-medium tracking-[0.08em] text-ink">
            {rue}
          </span>
        ) : null}
      </div>

      {/* Le filet de liaison disparaît sous `sm` : à 375 px, la mention se
          casse sur deux lignes et le trait se retrouve à flotter en face
          d'un vide. */}
      <figcaption className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="font-display text-[0.8rem] font-semibold tracking-[0.18em] text-brand uppercase">
          {ville}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-px w-10 bg-line-strong sm:block"
        />
        <span className="text-[0.8rem] text-ink-muted">
          Rencontres possibles en personne
        </span>
      </figcaption>
    </figure>
  );
}
