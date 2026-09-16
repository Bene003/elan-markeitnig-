import { barresMontee } from "@/content/constat";

/**
 * LA SCÈNE SIGNATURE : douze mois irréguliers qui deviennent une progression
 * régulière. C'est la moitié « montée » du logo d'Élan, et c'est la phrase du
 * hero rendue en image : votre croissance ne devrait pas dépendre du mois.
 *
 * ELLE EST EN CSS PUR, et c'est la décision qui compte ici.
 *
 * Le plan la prévoyait en framer-motion, donc réservée à /entreprises,
 * /particuliers et /methode, parce que 40 ko de bibliothèque d'animation sur
 * l'accueil auraient mangé la marge du seuil de performance de l'art. 20, qui
 * ne mesure que cette page-là. Les animations pilotées par le défilement
 * (`animation-timeline: view()`) font le même travail depuis le moteur de
 * rendu : zéro octet de JavaScript, aucune hydratation, aucun observateur, et
 * le calcul se fait sur le fil de composition et non sur le fil principal. La
 * scène peut donc vivre sur l'accueil, ce qui est précisément là où elle sert.
 *
 * TROIS REPLIS, ET C'EST CE QUI REND LE PROCÉDÉ ACCEPTABLE. L'état AU REPOS du
 * DOM est déjà l'affiche finale : la progression régulière. L'animation ne
 * fait que remonter le temps en arrière au moment où la scène entre dans
 * l'écran. Conséquence directe :
 *   - sans `animation-timeline` (Firefox aujourd'hui), on voit la progression ;
 *   - sous `prefers-reduced-motion`, on voit la progression ;
 *   - sans JavaScript, on voit la progression.
 * Jamais une scène vide, ce qui est le critère de recette écrit au plan.
 *
 * On n'anime que `transform` et `opacity`. La hauteur des barres n'est jamais
 * touchée : c'est un `scaleY` sur une barre dont la hauteur finale est déjà
 * posée, sinon chaque image coûterait un recalcul de mise en page.
 */
export function Montee({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div
        aria-hidden="true"
        className="montee relative flex h-64 items-end gap-[3px] sm:h-80 sm:gap-1.5"
      >
        {barresMontee.map((barre, i) => (
          <span
            key={barre.mois}
            className="montee-barre relative flex-1 origin-bottom rounded-t-[1px]"
            style={
              {
                height: `${barre.fin}%`,
                // Le rapport de départ, calculé ici plutôt qu'en CSS : c'est
                // le facteur de `scaleY` qui ramène la barre à sa hauteur
                // irrégulière d'origine.
                "--depart": barre.debut / barre.fin,
                // L'échelonnement fait naître la régularité de gauche à
                // droite, dans le sens de la lecture. Toutes les barres qui
                // se rangent d'un coup se liraient comme un simple fondu.
                "--retard": `${i * 2}%`,
                backgroundColor:
                  i >= barresMontee.length - 3
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-brand) 55%, transparent)",
              } as React.CSSProperties
            }
          />
        ))}

        {/* La ligne de base. Elle n'est pas décorative : sans elle, les barres
            flottent et la scène perd son axe. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px bg-line-strong"
        />
      </div>

      {/* La narration textuelle. C'est elle qui permet de tenir
          l'accessibilité ≥ 90 sur une page qui porte une scène animée : le
          lecteur d'écran reçoit le sens, pas la figure. */}
      <figcaption className="mt-6 flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] text-ink-muted uppercase">
        <span aria-hidden="true" className="h-px w-7 bg-brand/50" />
        Douze mois
      </figcaption>
      <dl className="sr-only">
        <dt>Avant</dt>
        <dd>
          Douze mois irréguliers : des pics isolés, des creux, et aucune
          progression lisible d&apos;un mois sur l&apos;autre.
        </dd>
        <dt>Après</dt>
        <dd>
          Les mêmes douze mois, mais en progression régulière, chaque mois
          au-dessus du précédent.
        </dd>
      </dl>
    </figure>
  );
}
