/**
 * Les trois études de cas de l'article 3. Format imposé par l'audit remis au
 * client : problème, intervention, ce qui a changé, un chiffre, un témoignage.
 *
 * `clientName` est optionnel à dessein : un cas anonymisé ("PME de services,
 * 12 employés") reste utilisable, un cas sans chiffre ne l'est pas.
 * C'est le point signalé par écrit dès le cadrage.
 *
 * ATTENTION : LES TROIS CAS CI-DESSOUS SONT DES EXEMPLES DE MISE EN PAGE.
 *
 * Ils ne décrivent aucun client réel et aucun de leurs chiffres n'est vrai.
 * Ils existent pour que la page se compose à sa vraie densité pendant la
 * construction, ce qu'un « EN ATTENTE » répété ne permettait pas de juger.
 *
 * ILS DOIVENT ÊTRE REMPLACÉS AVANT LA MISE EN LIGNE par les vrais cas de
 * Yliès (art. 17, dus dans les 5 premiers jours). Publier ceux-ci serait une
 * fausse déclaration, pas un contenu provisoire.
 */

export type EtudeDeCas = {
  slug: string;
  /** Absent si le client n'autorise pas à le nommer. */
  clientName?: string;
  /** Toujours présent, même quand le nom manque. */
  contexte: string;
  probleme: string;
  intervention: string;
  changement: string;
  chiffre: {
    valeur: string;
    libelle: string;
    /** La période, sans laquelle le chiffre ne prouve rien. */
    periode: string;
  };
  /**
   * Un second chiffre, sans période.
   *
   * Deux chiffres côte à côte valent bien plus que le double d'un seul : le
   * premier donne l'ampleur, le second donne la nature du gain. Il reste
   * optionnel parce qu'un cas qui n'en a qu'un doit rester publiable, et que
   * l'inventer serait une faute.
   */
  chiffreSecondaire?: {
    valeur: string;
    libelle: string;
  };
  temoignage?: {
    citation: string;
    auteur: string;
  };
};

export const etudesDeCas: EtudeDeCas[] = [
  {
    slug: "cas-1",
    contexte: "Entreprise de services, 14 employés",
    probleme:
      "Un bon mois, puis deux mois creux, sans que personne sache expliquer ni l'un ni l'autre.",
    intervention:
      "Un processus de vente écrit, des critères de qualification, et un suivi hebdomadaire des occasions en cours.",
    changement:
      "Les mois se ressemblent enfin assez pour qu'on puisse planifier une embauche.",
    chiffre: {
      valeur: "3 sur 4",
      libelle: "mois au-dessus de l'objectif, contre 1 sur 4 avant",
      periode: "Sur les six mois suivant la mise en place",
    },
    chiffreSecondaire: {
      valeur: "2 j",
      libelle: "de gestion en moins par semaine pour le dirigeant",
    },
    temoignage: {
      citation:
        "On ne devine plus. On sait quoi faire lundi matin, et l'équipe le sait aussi.",
      auteur: "Direction générale",
    },
  },
  {
    slug: "cas-2",
    contexte: "Commerce de détail, 2 succursales, Rive-Sud",
    probleme:
      "Un budget publicitaire engagé chaque mois sans savoir ce qu'il rapportait.",
    intervention:
      "Mesure des demandes par canal, arrêt de ce qui ne produisait rien, report du budget sur les deux canaux qui fonctionnaient.",
    changement:
      "Le même budget, réparti autrement, et une décision qui repose sur des chiffres plutôt que sur une impression.",
    chiffre: {
      valeur: "2 fois",
      libelle: "plus de demandes pour un budget identique",
      periode: "Sur quatre mois",
    },
    chiffreSecondaire: {
      valeur: "5 sur 9",
      libelle: "canaux arrêtés, sans perte de volume",
    },
    temoignage: {
      citation:
        "On dépensait pareil. La différence, c'est qu'on sait maintenant où va chaque dollar.",
      auteur: "Copropriétaire",
    },
  },
  {
    slug: "cas-3",
    contexte: "Entreprise familiale, 30 ans d'activité, Laval",
    probleme:
      "Tout passait par le fondateur : les devis, les relances, les décisions. L'entreprise avançait à son rythme et s'arrêtait avec lui.",
    intervention:
      "Rôles écrits, étapes déléguées une par une, et un point mensuel qui remplace les décisions au cas par cas.",
    changement:
      "Le fondateur est sorti du quotidien sans que la production ralentisse.",
    chiffre: {
      valeur: "60 %",
      libelle: "des devis désormais produits sans le fondateur",
      periode: "Après huit mois d'accompagnement",
    },
    temoignage: {
      citation:
        "J'ai pris trois semaines de vacances. C'est la première fois en trente ans.",
      auteur: "Fondateur",
    },
  },
];
