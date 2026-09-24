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
  /**
   * Présent quand l'étape ne vaut que pour une clientèle. La page méthode est
   * commune aux deux parcours : sans cette mention, un particulier lirait
   * qu'on viendra observer une équipe qu'il n'a pas.
   */
  clientele?: { libelle: string; ailleurs: string };
};

/*
 * LE DIAGNOSTIC SE FAIT EN DEUX TEMPS, ET LE SECOND SUR LE TERRAIN.
 *
 * Le questionnaire rempli à la réservation et l'appel de vingt minutes disent
 * ce que le client VIT. L'immersion montre ce qu'il ne voit plus, parce qu'il
 * est dedans tous les jours : c'est la différence entre un diagnostic décrit
 * et un diagnostic observé, et c'est ce qui distingue Elan d'un cabinet qui
 * recommande à distance. Elle a donc sa propre étape plutôt qu'une ligne
 * dans « Stratégie », où elle serait passée pour un détail d'organisation.
 *
 * Déroulé confirmé par Eben le 2026-09-22 : questionnaire AVANT l'appel,
 * immersion APRÈS, payante (première étape de l'accompagnement), et pour les
 * entreprises seulement. Sa durée n'est pas connue : rien n'est affiché
 * plutôt qu'un chiffre inventé.
 */
export const etapesMethode: EtapeMethode[] = [
  {
    numero: "01",
    titre: "Diagnostic",
    action:
      "Vingt minutes pour comprendre votre situation, vos contraintes et ce qui bloque réellement. Nous partons de vos réponses au questionnaire, pas d'une page blanche.",
    livrable:
      "Une lecture honnête de votre situation, et notre avis franc sur l'utilité d'un accompagnement.",
    attenduDuClient:
      "Le questionnaire rempli à la réservation, et de la franchise sur les chiffres.",
    duree: "20 minutes",
  },
  {
    numero: "02",
    titre: "Immersion",
    action:
      "Nous venons dans votre entreprise voir le travail tel qu'il se fait : la vente, les échanges, les outils, les passages de relais. Le questionnaire dit ce que vous vivez, le terrain montre ce que plus personne ne remarque.",
    livrable:
      "Un diagnostic établi sur place, qui nomme les blocages observés et pas seulement ceux qu'on nous a décrits.",
    attenduDuClient:
      "Un accès à vos locaux et à votre équipe, et la liberté d'observer votre quotidien tel qu'il est, sans mise en scène.",
    duree: "Sur place",
    clientele: {
      libelle: "Entreprises",
      ailleurs:
        "Pour les particuliers, le questionnaire et nos échanges en tiennent lieu.",
    },
  },
  {
    numero: "03",
    titre: "Stratégie",
    action:
      "À partir de ce que le diagnostic a montré, nous posons le positionnement, la clientèle cible et les priorités des prochains mois.",
    livrable:
      "Les trois chantiers qui comptent avant tous les autres, avec l'effet attendu de chacun.",
    attenduDuClient: "Vos données de vente, et une décision sur les priorités.",
    duree: "2 à 3 semaines",
  },
  {
    numero: "04",
    titre: "Mise en place",
    action:
      "Nous installons ce qui a été décidé dans votre quotidien : processus, outils, rôles.",
    livrable: "Un fonctionnement en place, utilisé, et non un document à lire.",
    attenduDuClient:
      "Des points courts et réguliers, et une décision quand il en faut une.",
    duree: "1 à 2 mois",
  },
  {
    numero: "05",
    titre: "Suivi",
    action: "Nous revoyons les indicateurs et ajustons ce qui ne produit pas.",
    livrable: "Une progression lisible mois après mois, et des corrections rapides.",
    attenduDuClient: "Un point récurrent au calendrier.",
    duree: "Mensuel",
  },
  {
    numero: "06",
    titre: "Croissance",
    action:
      "Ce qui fonctionne est amplifié, ce qui ne fonctionne pas est arrêté sans état d'âme.",
    livrable: "Une croissance qui repose sur un processus, pas sur l'improvisation.",
    attenduDuClient: "La volonté d'arrêter ce qui ne marche pas.",
    duree: "En continu",
  },
];
