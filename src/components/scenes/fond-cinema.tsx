"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * LA SPHÈRE. Une composition en lévitation, posée comme un volume vivant
 * derrière l'accueil.
 *
 * CE N'EST PAS UN FOND DÉCORATIF, C'EST LA PHRASE DE LA PAGE EN IMAGE. Le
 * titre dit que la croissance ne devrait pas dépendre du mois ; la sphère
 * donne une présence continue et calme à ce premier écran. La promesse et l'image
 * disent la même chose, ce qui est la seule raison valable de mettre huit cent
 * kilo-octets de vidéo sur une page d'accueil.
 *
 * LA LECTURE EST CONTINUE. L'élément vidéo est configuré avec `loop`, pour
 * reprendre automatiquement à sa dernière image et rester en fond sans
 * intervention.
 *
 * Le fichier est placé dans `public/` afin d'être servi directement par
 * Next.js à l'URL `/sphere-loop.mp4`.
 */
const SOURCE_VIDEO: string | null = "/sphere-loop.mp4";

/**
 * FOND ANIMÉ DU HERO, CHARGÉ SUR TOUS LES ÉCRANS.
 *
 * POURQUOI UN COMPOSANT CLIENT plutôt qu'un `<video>` dans un `hidden lg:block`.
 * On vient de l'apprendre à ses dépens sur le filigrane : `display: none` ne
 * garantit pas qu'un média ne soit pas téléchargé. Pour une image de fond,
 * c'est vrai ; pour un masque, c'est faux ; pour un `<video autoplay>`, c'est
 * franchement faux, l'élément lance son chargement dès qu'il est dans le
 * document, visible ou non. La seule façon sûre de ne pas payer un média sur
 * mobile est de NE PAS METTRE L'ÉLÉMENT DANS LE DOCUMENT. D'où `matchMedia`.
 *
 * L'instantané serveur vaut `false`, donc le HTML servi ne contient jamais la
 * vidéo. Elle n'arrive qu'après l'hydratation, ce qui a un effet secondaire
 * heureux : elle n'entre pas en concurrence avec le titre pendant le premier
 * rendu, et ne peut donc pas devenir le LCP de la page.
 *
 * Elle est aussi retirée sous `prefers-reduced-motion`. Une boucle vidéo est
 * exactement le genre de mouvement continu, non déclenché et impossible à
 * arrêter que ce réglage existe pour supprimer.
 */
export function FondCinema({ className }: { className?: string }) {
  const mouvementAccepte = useRequeteMedia("(prefers-reduced-motion: no-preference)");

  if (!SOURCE_VIDEO || !mouvementAccepte) return null;

  return (
    <video
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      // `metadata` et non `auto` : on laisse le navigateur décider du moment où
      // il tire le reste, plutôt que de mettre la vidéo en concurrence avec les
      // polices et le CSS pendant le premier rendu.
      preload="metadata"
      className={cn(
        "pointer-events-none size-full object-cover",
        className,
      )}
    >
      <source src={SOURCE_VIDEO} type="video/mp4" />
    </video>
  );
}

/**
 * `useSyncExternalStore` et non `useState` + `useEffect` : c'est l'outil prévu
 * pour lire une source extérieure à React sans que le rendu serveur et le
 * premier rendu client puissent diverger. L'instantané serveur est explicite,
 * donc il n'y a pas d'avertissement d'hydratation possible.
 */
function useRequeteMedia(requete: string) {
  return useSyncExternalStore(
    (prevenir) => {
      const mq = window.matchMedia(requete);
      mq.addEventListener("change", prevenir);
      return () => mq.removeEventListener("change", prevenir);
    },
    () => window.matchMedia(requete).matches,
    () => false,
  );
}
