/**
 * La méthode, page 5 des huit. Les étapes existent déjà par parcours dans
 * content/parcours.ts : cette page dit ce que le site actuel ne dit pas, à
 * savoir ce qui se passe APRÈS le rendez-vous.
 *
 * CONTENU À VALIDER AU CADRAGE. Les durées ci-dessous sont des exemples de
 * mise en page : elles disent un ordre de grandeur plausible pour que la
 * page se compose, et Yliès doit les confirmer ou les corriger.
 */

export type EtapeMethode = {
  numero: string;
  titre: string;
  /** Ce qu'Elan fait. */
  action: string;
  /** Ce que le client obtient, qui est ce qui l'intéresse. */
  livrable: string;
  /** Ce qu'on attend du client à cette étape. */
  attenduDuClient: string;
  duree: string;
};

export const etapesMethode: EtapeMethode[] = [
  {
    numero: "01",
    titre: "Diagnostic",
    action:
      "Vingt minutes pour comprendre votre situation, vos contraintes et ce qui bloque réellement.",
    livrable:
      "Une lecture honnête de votre situation, et notre avis franc sur l'utilité d'un accompagnement.",
    attenduDuClient: "Vingt minutes, et de la franchise sur les chiffres.",
    duree: "20 minutes",
  },
  {
    numero: "02",
    titre: "Stratégie",
    action:
      "Nous posons le positionnement, la clientèle cible et les priorités des prochains mois.",
    livrable:
      "Les trois chantiers qui comptent avant tous les autres, avec l'effet attendu de chacun.",
    attenduDuClient: "Vos données de vente et un accès à votre équipe.",
    duree: "2 à 3 semaines",
  },
  {
    numero: "03",
    titre: "Mise en place",
    action:
      "Nous installons ce qui a été décidé dans votre quotidien : processus, outils, rôles.",
    livrable: "Un fonctionnement en place, utilisé, et non un document à lire.",
    attenduDuClient:
      "Des points courts et réguliers, et une décision quand il en faut une.",
    duree: "1 à 2 mois",
  },
  {
    numero: "04",
    titre: "Suivi",
    action: "Nous revoyons les indicateurs et ajustons ce qui ne produit pas.",
    livrable: "Une progression lisible mois après mois, et des corrections rapides.",
    attenduDuClient: "Un point récurrent au calendrier.",
    duree: "Mensuel",
  },
  {
    numero: "05",
    titre: "Croissance",
    action:
      "Ce qui fonctionne est amplifié, ce qui ne fonctionne pas est arrêté sans état d'âme.",
    livrable: "Une croissance qui repose sur un processus, pas sur l'improvisation.",
    attenduDuClient: "La volonté d'arrêter ce qui ne marche pas.",
    duree: "En continu",
  },
];
