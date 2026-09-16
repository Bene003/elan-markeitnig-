/**
 * Vocabulaire du parcours, et RIEN D'AUTRE.
 *
 * Ce fichier est importé aussi bien par des composants serveur que par
 * <ParcoursSetter>, qui est un composant client. Il ne doit donc contenir
 * aucune API réservée au serveur : la lecture du cookie vit dans
 * `lib/parcours-server.ts`, qui n'est importable que côté serveur.
 */

export const PARCOURS = ["entreprise", "particulier"] as const;
export type Parcours = (typeof PARCOURS)[number];

export const PARCOURS_COOKIE = "parcours";

export const parcoursHref: Record<Parcours, string> = {
  entreprise: "/entreprises",
  particulier: "/particuliers",
};

export const parcoursLabel: Record<Parcours, string> = {
  entreprise: "Je suis une entreprise",
  particulier: "Je suis un particulier",
};
