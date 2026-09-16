import type { CSSProperties } from "react";

/**
 * UN CHIFFRE QUI SE COMPTE, sans une ligne de JavaScript.
 *
 * Un compteur qui monte est le seul cas où l'animation ajoute du sens plutôt
 * que de l'ornement : elle fait passer le lecteur par toutes les valeurs
 * intermédiaires, donc elle lui fait sentir la distance parcourue. Un « 60 % »
 * posé d'un coup est une affirmation ; le même chiffre qui monte est un
 * parcours.
 *
 * LE PROCÉDÉ. Une propriété personnalisée déclarée en `<integer>` par
 * `@property` s'interpole comme un nombre, et `counter()` sait la rendre en
 * texte. C'est la seule façon d'afficher un nombre qui change sans JS.
 *
 * CE QUE ÇA COÛTE, ET IL FAUT LE DIRE. Contrairement aux autres scènes du
 * site, celle-ci n'est PAS de la pure composition : chaque valeur du compteur
 * force un recalcul de style sur l'élément. C'est assumé parce que la surface
 * est minuscule (cinq courts fragments de texte) et que le gain de sens est
 * réel. Ce n'est pas un procédé à généraliser.
 *
 * L'ÉTAT AU REPOS EST LE CHIFFRE FINAL. Le compteur part de `--cible` et
 * l'animation ne fait que le recouvrir le temps de jouer, donc Firefox,
 * `prefers-reduced-motion`, l'absence de JS et une chronologie inactive
 * affichent tous la valeur définitive. Personne ne voit zéro.
 *
 * ACCESSIBILITÉ. Le texte d'un `::after` n'est pas restitué de façon fiable
 * par les lecteurs d'écran, et un chiffre en cours d'animation ne devrait de
 * toute façon pas être annoncé. La valeur complète est donc dans le DOM en
 * `sr-only`, et toute la partie visible est `aria-hidden`.
 */

/**
 * Sépare « 3 sur 4 » en 3 et « sur 4 ». Rend `null` si la valeur ne commence
 * pas par un nombre : le contenu vient de Yliès, et le jour où il écrira
 * « x2 » ou « quatre fois », la carte doit afficher son texte tel quel plutôt
 * que de casser.
 */
function decoupe(valeur: string) {
  const m = /^(\d+)([\s\S]*)$/.exec(valeur);
  if (!m) return null;
  return { nombre: Number(m[1]), reste: m[2] };
}

export function ChiffreVivant({
  valeur,
  className,
}: {
  valeur: string;
  className?: string;
}) {
  const part = decoupe(valeur);

  if (!part) {
    return <div className={className}>{valeur}</div>;
  }

  return (
    <div className={className}>
      <span className="sr-only">{valeur}</span>
      <span aria-hidden="true" className="tabular-nums">
        {/* `--rangs` réserve la largeur du nombre final en `ch`. Sans elle,
            le passage de 9 à 10 élargirait le nombre et pousserait le
            suffixe d'un cran, ce qui se voit beaucoup plus que le compte
            lui-même. */}
        <span
          className="chiffre-compte inline-block text-left"
          style={
            {
              "--cible": part.nombre,
              "--rangs": String(part.nombre).length,
            } as CSSProperties
          }
        />
        {part.reste}
      </span>
    </div>
  );
}
