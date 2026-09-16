import type { Parcours } from "@/lib/parcours";

/**
 * Les huit services de l'article 3 du contrat, quatre par clientèle.
 * L'article 4 impose qu'ils soient présentés séparément par clientèle : c'est
 * ce que porte le champ `parcours`.
 */

export type Service = {
  slug: string;
  parcours: Parcours;
  nom: string;
  /** Le problème que le service règle, avant ce qu'il contient. */
  probleme: string;
  /** Ce que le client obtient. */
  resultat: string;
};

export const services: Service[] = [
  {
    slug: "structuration-operationnelle",
    parcours: "entreprise",
    nom: "Structuration opérationnelle",
    probleme:
      "L'entreprise grandit, mais les façons de faire sont restées celles du début.",
    resultat:
      "Des processus écrits, des rôles clairs et des suivis qui tiennent sans vous.",
  },
  {
    slug: "branding",
    parcours: "entreprise",
    nom: "Branding",
    probleme:
      "Votre image ne dit pas ce que vous valez, et vous vous retrouvez à devoir l'expliquer à chaque fois.",
    resultat:
      "Une identité cohérente sur tous vos points de contact, qui travaille pour vous avant le premier échange.",
  },
  {
    slug: "positionnement",
    parcours: "entreprise",
    nom: "Positionnement",
    probleme:
      "Vous ressemblez à vos concurrents, donc la discussion finit toujours sur le prix.",
    resultat:
      "Une place distincte sur votre marché, et des arguments que vos concurrents ne peuvent pas reprendre.",
  },
  {
    slug: "accompagnement-croissance",
    parcours: "entreprise",
    nom: "Accompagnement à la croissance",
    probleme:
      "Les bonnes décisions se prennent seul, tard, et souvent dans l'urgence.",
    resultat:
      "Un cadre de suivi régulier, des indicateurs revus, et un interlocuteur qui connaît votre dossier.",
  },
  {
    slug: "clarification-de-projet",
    parcours: "particulier",
    nom: "Clarification de projet",
    probleme: "Votre idée est bonne, mais vous n'arrivez pas encore à la dire simplement.",
    resultat:
      "Une formulation claire de votre projet, de sa cible et de sa valeur.",
  },
  {
    slug: "personal-branding",
    parcours: "particulier",
    nom: "Personal branding",
    probleme:
      "Votre expérience est réelle, mais rien en ligne ne la raconte à votre place.",
    resultat:
      "Une présence professionnelle cohérente, qui vous ressemble et qui attire les bonnes occasions.",
  },
  {
    slug: "structuration-des-etapes",
    parcours: "particulier",
    nom: "Structuration des prochaines étapes",
    probleme: "Trop d'idées en parallèle, et rien qui aboutit vraiment.",
    resultat:
      "Une séquence ordonnée, avec ce qui peut attendre clairement mis de côté.",
  },
  {
    slug: "plan-daction",
    parcours: "particulier",
    nom: "Plan d'action",
    probleme:
      "Vous savez quoi faire, mais pas dans quel ordre ni à quel rythme.",
    resultat:
      "Un plan écrit et daté, que vous pouvez suivre seul une fois l'accompagnement terminé.",
  },
];

export const servicesParParcours = (parcours: Parcours) =>
  services.filter((service) => service.parcours === parcours);
