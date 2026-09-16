"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * LE PLAN. Une structure de marbre blanc et de verre qui s'assemble en
 * lévitation sur le vert de la marque.
 *
 * CE N'EST PAS UN FOND DÉCORATIF, C'EST LA PHRASE DE LA PAGE EN IMAGE. Le
 * titre dit que la croissance ne devrait pas dépendre du mois ; le plan montre
 * des blocs épars qui se rangent en un volume stable. La promesse et l'image
 * disent la même chose, ce qui est la seule raison valable de mettre huit cent
 * kilo-octets de vidéo sur une page d'accueil.
 *
 * IL BOUCLE DÉJÀ. La dernière image du plan rejoint la première (on part en
 * gros plan, on s'éloigne sur le volume complet, on revient). Aucune coupure
 * n'est donc visible au raccord, et il n'y a pas besoin de jouer le plan en
 * aller-retour pour masquer un saut.
 *
 * CE QU'IL A FALLU LUI FAIRE, à partir du master `Architectural.mp4` conservé
 * à la racine du dépôt (2,9 Mo, hors `public/`, donc jamais servi) :
 *   - RETIRER LA PISTE AUDIO. La vidéo est muette et le restera : l'audio
 *     était du poids mort intégral ;
 *   - RECOMPRESSER en H.264 CRF 27, ce qui la fait passer de 2,9 Mo à 865 ko
 *     sans dégradation visible sur une image aussi peu texturée ;
 *   - `+faststart`, qui remonte l'index en tête de fichier pour que la lecture
 *     démarre avant la fin du téléchargement.
 *
 * Le WebM a été essayé et écarté : 836 ko contre 865, soit vingt-neuf
 * kilo-octets, ce qui ne justifie pas un second fichier à réencoder et à
 * garder synchronisé à chaque retouche.
 */
const SOURCE_VIDEO: string | null = "/hero-elan.mp4";

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
