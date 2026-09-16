"use client";

import { useEffect } from "react";
import { PARCOURS_COOKIE, type Parcours } from "@/lib/parcours";

/**
 * Écrit le choix de parcours dans un cookie de session. Monté sur
 * /entreprises et /particuliers : arriver sur une de ces pages EST le choix,
 * qu'on y soit venu par un bouton ou par un lien externe.
 *
 * Cookie de session, SameSite=Lax, aucune donnée personnelle. Il ne survit pas
 * à la fermeture du navigateur, ce qui correspond exactement à l'exigence de
 * l'art. 3 : mémorisé "pendant la visite".
 *
 * Ce composant ne rend rien. Il ne peut donc pas provoquer de clignotement, et
 * c'est tout l'intérêt d'écrire ici et de lire côté serveur.
 */
export function ParcoursSetter({ parcours }: { parcours: Parcours }) {
  useEffect(() => {
    document.cookie = `${PARCOURS_COOKIE}=${parcours}; path=/; SameSite=Lax`;
  }, [parcours]);

  return null;
}
