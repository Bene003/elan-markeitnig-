import type { Parcours } from "@/lib/parcours";

/**
 * Le tunnel est le même sur les deux parcours : mêmes composants, contenu
 * différent. Tout ce qui distingue une entreprise d'un particulier vit ici, et
 * nulle part dans les composants.
 *
 * Règle de rédaction : pas de tirets cadratins dans la prose du site.
 */

export type Douleur = {
  titre: string;
  texte: string;
};

export type Resultat = {
  titre: string;
  texte: string;
};

export type Etape = {
  numero: string;
  titre: string;
  /** Ce que le client obtient à cette étape, pas ce qu'Elan y fait. */
  livrable: string;
};

export type QuestionFaq = {
  question: string;
  reponse: string;
};

export type ContenuParcours = {
  slug: string;
  /** Libellé du parcours dans la navigation et le sélecteur. */
  nav: string;
  titreMeta: string;
  descriptionMeta: string;
  eyebrow: string;
  titre: string;
  /**
   * La fin du titre, composée en italique et en vert clair.
   *
   * Le découpage est une donnée et non une coupure de chaîne dans le
   * composant : c'est le rédacteur qui décide où la phrase bascule, et la
   * moitié mise en relief est celle qui porte la promesse.
   */
  titreAccent: string;
  promesse: string;
  douleursTitre: string;
  douleurs: Douleur[];
  resultatsTitre: string;
  resultats: Resultat[];
  etapesTitre: string;
  etapes: Etape[];
  pourquoiTitre: string;
  pourquoi: Resultat[];
  faq: QuestionFaq[];
  ctaTitre: string;
  ctaTexte: string;
};

const entreprise: ContenuParcours = {
  slug: "entreprises",
  nav: "Entreprises",
  titreMeta: "Accompagnement des entreprises",
  descriptionMeta:
    "Structuration opérationnelle, positionnement et croissance pour les PME. Réservez un diagnostic de 20 minutes.",
  eyebrow: "Pour les entreprises",
  titre: "Vos ventes ne devraient pas dépendre",
  titreAccent: "du mois",
  promesse:
    "Elan Marketing structure votre développement commercial pour que la croissance vienne d'un processus, et non de l'énergie du dirigeant.",

  douleursTitre: "Ce que vous vivez aujourd'hui",
  // Tirées de l'audit remis au client le 3 septembre.
  douleurs: [
    {
      titre: "Les ventes sont irrégulières",
      texte:
        "Un bon mois, puis deux mois creux. Impossible de prévoir, donc impossible d'embaucher, d'investir ou de s'engager sereinement.",
    },
    {
      titre: "Tout repose sur le dirigeant",
      texte:
        "Les décisions, les suivis, les relances. L'entreprise avance à votre rythme, et s'arrête quand vous vous arrêtez.",
    },
    {
      titre: "Les processus ne suivent plus la croissance",
      texte:
        "Ce qui fonctionnait à trois personnes se fissure à douze. L'équipe travaille beaucoup sans savoir quelle action a le plus d'impact.",
    },
  ],

  resultatsTitre: "Ce que vous obtenez",
  resultats: [
    {
      titre: "Une vision claire de ce qui vous coûte des occasions",
      texte:
        "Les freins sont nommés et hiérarchisés, avec leur coût estimé. Vous savez par quoi commencer.",
    },
    {
      titre: "Un processus de vente que l'équipe peut suivre",
      texte:
        "Des étapes écrites, des critères de qualification, un suivi qui ne vit plus dans votre tête.",
    },
    {
      titre: "Moins de charge opérationnelle sur vous",
      texte:
        "Ce qui peut être délégué l'est, ce qui peut être outillé l'est. Vous reprenez du temps de décision.",
    },
    {
      titre: "Une croissance qui dépend moins de l'improvisation",
      texte:
        "Des indicateurs suivis, revus, et corrigés. La progression devient lisible mois après mois.",
    },
  ],

  etapesTitre: "Comment on avance ensemble",
  etapes: [
    {
      numero: "01",
      titre: "Diagnostic",
      livrable:
        "Vingt minutes pour comprendre où votre croissance bloque, et vous dire franchement si nous sommes les bons.",
    },
    /* L'immersion n'existe que sur ce parcours : un particulier n'a pas
       d'équipe à observer. Voir content/methode.ts. */
    {
      numero: "02",
      titre: "Immersion dans l'entreprise",
      livrable:
        "Nous venons voir votre quotidien sur place. Le diagnostic repose sur ce que nous avons observé, pas seulement sur ce qu'on nous a décrit.",
    },
    {
      numero: "03",
      titre: "Positionnement et priorités",
      livrable:
        "Une offre clarifiée, une clientèle cible nommée, et les trois chantiers qui comptent avant tous les autres.",
    },
    {
      numero: "04",
      titre: "Mise en place",
      livrable:
        "Le processus de vente, les outils et les rôles installés dans votre quotidien, pas dans un document.",
    },
    {
      numero: "05",
      titre: "Suivi et croissance",
      livrable:
        "Des points réguliers, des indicateurs revus, et des ajustements au fur et à mesure des résultats.",
    },
  ],

  pourquoiTitre: "Pourquoi Elan Marketing",
  pourquoi: [
    {
      titre: "Un interlocuteur proche",
      texte:
        "Nous connaissons votre marché, ses cycles et ses réseaux. Les échanges se font en visioconférence, ou en personne quand la distance le permet.",
    },
    {
      titre: "De l'exécution, pas des recommandations",
      texte:
        "Nous installons ce que nous proposons. Un rapport que personne n'applique n'a jamais fait vendre.",
    },
    {
      titre: "Un interlocuteur unique",
      texte:
        "Vous parlez à la personne qui travaille sur votre dossier, pas à un chargé de compte qui transmet.",
    },
  ],

  faq: [
    {
      question: "À partir de quelle taille d'entreprise est-ce pertinent ?",
      reponse:
        "Il n'y a pas de seuil. Ce qui compte davantage, c'est qu'il y ait déjà des clients et quelqu'un pour appliquer ce qui sera décidé. Le diagnostic sert justement à répondre à cette question sans engagement.",
    },
    {
      question: "Combien de temps avant de voir des résultats ?",
      reponse:
        "Les premiers effets se voient sur l'organisation avant de se voir sur les ventes. Nous n'annonçons aucun délai à l'avance : chaque contexte est différent, et un chiffre donné sans connaître le vôtre serait une devinette.",
    },
    {
      question: "Est-ce que vous remplacez notre équipe marketing ?",
      reponse:
        "Non, nous travaillons avec elle. L'objectif est qu'elle sache continuer sans nous : un accompagnement dont on ne peut pas sortir n'en est pas un.",
    },
    {
      question: "Le diagnostic est-il vraiment sans engagement ?",
      reponse:
        "Oui. Vingt minutes, en visioconférence ou en personne quand c'est possible. Vous repartez avec une lecture de votre situation, que nous travaillions ensemble ou non.",
    },
    {
      question: "Pourquoi venir dans nos locaux ?",
      reponse:
        "Parce que ce qui bloque une entreprise se voit rarement de l'extérieur. Le questionnaire et l'appel disent ce que vous vivez ; une présence sur place montre ce que plus personne ne remarque, parce qu'on est dedans tous les jours. C'est la première étape de l'accompagnement, une fois que nous avons décidé de travailler ensemble.",
    },
  ],

  ctaTitre: "Vingt minutes pour savoir où ça bloque",
  ctaTexte:
    "Réservez un diagnostic. Nous regardons votre situation, et nous vous disons ce qui aurait le plus d'effet dans les trois prochains mois.",
};

const particulier: ContenuParcours = {
  slug: "particuliers",
  nav: "Particuliers",
  titreMeta: "Accompagnement des particuliers",
  descriptionMeta:
    "Clarification de projet, personal branding et plan d'action pour les professionnels et porteurs de projet. Réservez un diagnostic de 20 minutes.",
  eyebrow: "Pour les particuliers",
  titre: "Vous savez où vous voulez aller,",
  titreAccent: "pas encore par où",
  promesse:
    "Elan Marketing transforme une ambition floue en un plan d'action que vous pouvez commencer cette semaine.",

  // CONTENU À VALIDER AU CADRAGE. Écrit à partir des quatre services nommés
  // au contrat (art. 3) : clarification de projet, personal branding,
  // structuration des prochaines étapes, plan d'action.
  douleursTitre: "Ce qui vous retient",
  douleurs: [
    {
      titre: "Le projet est encore flou",
      texte:
        "Vous savez ce qui vous anime, mais vous n'arrivez pas à l'expliquer en une phrase, donc pas à le vendre.",
    },
    {
      titre: "On ne vous voit pas pour ce que vous valez",
      texte:
        "Votre expérience est réelle, mais rien en ligne ne la raconte. Les occasions passent à côté sans vous voir.",
    },
    {
      titre: "Vous avancez sans ordre",
      texte:
        "Beaucoup d'idées, beaucoup de départs, peu de suites. Il manque une prochaine étape claire, une seule.",
    },
  ],

  resultatsTitre: "Ce que vous obtenez",
  resultats: [
    {
      titre: "Un projet que vous savez expliquer",
      texte:
        "Une formulation claire de ce que vous faites, pour qui, et pourquoi vous. Testée, pas devinée.",
    },
    {
      titre: "Une image professionnelle cohérente",
      texte:
        "Votre présence en ligne raconte enfin la même histoire que vous, d'un profil à l'autre.",
    },
    {
      titre: "Une prochaine étape, pas dix",
      texte:
        "La séquence des choses à faire, dans l'ordre, avec ce qui peut attendre clairement mis de côté.",
    },
    {
      titre: "Un plan que vous pouvez suivre seul",
      texte:
        "Écrit, daté, à votre rythme. L'accompagnement s'arrête, le plan reste.",
    },
  ],

  etapesTitre: "Comment on avance ensemble",
  etapes: [
    {
      numero: "01",
      titre: "Diagnostic",
      livrable:
        "Vingt minutes pour poser votre situation et voir si un accompagnement a du sens pour vous maintenant.",
    },
    {
      numero: "02",
      titre: "Clarification",
      livrable:
        "Votre projet ramené à une phrase juste, et une clientèle ou une cible nommée.",
    },
    {
      numero: "03",
      titre: "Personal branding",
      livrable:
        "Une présence cohérente, des messages qui vous ressemblent et qui parlent aux bonnes personnes.",
    },
    {
      numero: "04",
      titre: "Plan d'action",
      livrable:
        "Les prochaines étapes ordonnées et datées, avec ce qu'il faut pour tenir le rythme.",
    },
  ],

  pourquoiTitre: "Pourquoi Elan Marketing",
  pourquoi: [
    {
      titre: "On part de vous",
      texte:
        "Pas d'un modèle. Ce qui marche pour un autre ne marchera pas si ce n'est pas vous.",
    },
    {
      titre: "Concret dès la première séance",
      texte: "Vous repartez avec quelque chose d'utilisable, pas avec un devoir.",
    },
    {
      titre: "En personne si vous préférez",
      texte:
        "Visioconférence ou rencontre, selon ce qui vous met le plus à l'aise.",
    },
  ],

  faq: [
    {
      question: "Est-ce que c'est pour moi si je n'ai pas encore d'entreprise ?",
      reponse:
        "Oui. Le parcours particuliers existe précisément pour les projets qui ne sont pas encore lancés.",
    },
    {
      question: "Combien de séances faut-il prévoir ?",
      reponse:
        "Cela dépend de l'état d'avancement de votre projet. Certains ont besoin d'une seule séance pour trancher une question, d'autres d'un accompagnement sur plusieurs mois. Le diagnostic sert à le dire avant que vous vous engagiez.",
    },
    {
      question: "Quels sont les tarifs ?",
      reponse:
        "Ils sont communiqués lors du diagnostic, une fois que nous savons ce dont vous avez besoin. Annoncer un prix avant d'avoir regardé votre situation n'aurait de sens ni pour vous ni pour nous.",
    },
    {
      question: "Le diagnostic est-il vraiment sans engagement ?",
      reponse:
        "Oui. Vingt minutes, sans frais et sans suite obligatoire. Vous repartez avec une lecture de votre situation.",
    },
  ],

  ctaTitre: "Vingt minutes pour y voir clair",
  ctaTexte:
    "Réservez un diagnostic. Nous regardons votre projet et nous en sortons une prochaine étape concrète.",
};

export const contenuParcours: Record<Parcours, ContenuParcours> = {
  entreprise,
  particulier,
};
