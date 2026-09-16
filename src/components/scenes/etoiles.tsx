/**
 * LES CINQ ÉTOILES DE LA NOTE GOOGLE, en deux calques superposés.
 *
 * Le calque du bas porte cinq étoiles vides, celui du haut cinq étoiles
 * pleines, et une largeur en pourcentage coupe le second à la note exacte. Ce
 * procédé, plutôt qu'une demi-étoile dessinée à part, rend n'importe quelle
 * note sans nouveau tracé : 4,2 comme 4,9. Quand Yliès enverra sa vraie note,
 * c'est l'édition d'un nombre dans `content/entreprise.ts`, rien d'autre.
 *
 * ZÉRO JAVASCRIPT. Le remplissage se rejoue au défilement par la même
 * mécanique que les autres scènes, et son état au repos est déjà la note
 * finale. Un visiteur sans `animation-timeline` voit 4,9 sur 5 ; il ne voit
 * jamais zéro étoile.
 *
 * ACCESSIBILITÉ. Les deux calques sont `aria-hidden` et la note est donnée en
 * toutes lettres juste à côté. Cinq images d'étoiles annoncées une par une à
 * un lecteur d'écran ne disent rien de plus que « 4,9 sur 5 », et disent
 * beaucoup plus longtemps.
 */

const ETOILE =
  "M12 2.4 14.9 8.6 21.6 9.5 16.8 14.2 18 20.9 12 17.7 6 20.9 7.2 14.2 2.4 9.5 9.1 8.6Z";

function Rangee({
  couleur,
  className,
}: {
  couleur: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-1.5 ${className ?? ""}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-7 shrink-0 sm:size-8"
          fill={couleur}
        >
          <path d={ETOILE} />
        </svg>
      ))}
    </div>
  );
}

export function Etoiles({
  note,
  className,
}: {
  /** Sur cinq. 4,9 rend quatre étoiles pleines et 90 % de la cinquième. */
  note: number;
  className?: string;
}) {
  const part = Math.max(0, Math.min(note / 5, 1));

  return (
    <div className={`etoiles flex items-center gap-4 ${className ?? ""}`}>
      <div aria-hidden="true" className="relative">
        <Rangee couleur="var(--color-line-strong)" />
        {/* Le calque plein est coupé à la note. `overflow-hidden` sur un
            conteneur de largeur variable, plutôt qu'un `clip-path` : la
            largeur est ce qui s'anime, et une largeur en pourcentage reste
            juste quelle que soit la taille des étoiles. */}
        <div
          className="etoiles-plein absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${part * 100}%` }}
        >
          <Rangee couleur="var(--color-brand)" />
        </div>
      </div>

      <span className="font-display text-[1.05rem] font-bold text-ink">
        {note.toString().replace(".", ",")}
        <span className="font-normal text-ink-muted"> sur 5</span>
      </span>
    </div>
  );
}
