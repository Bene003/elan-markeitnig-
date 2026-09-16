/**
 * LE CONSTAT COMMUN, première section après le hero.
 *
 * Sa raison d'être est structurelle. L'accueil bifurque plus bas entre
 * entreprises et particuliers, et une bifurcation posée trop tôt demande au
 * visiteur de se classer avant de savoir de quoi on parle. Cette section dit
 * donc d'abord ce qui est vrai des deux côtés, et c'est ce qui rend le choix
 * suivant évident au lieu d'arbitraire.
 *
 * Contrainte de rédaction propre à ce fichier : aucune phrase ne doit trahir
 * une clientèle. Pas de « votre équipe », pas de « votre chiffre d'affaires »,
 * pas de « votre carrière ». Un dirigeant de PME et un porteur de projet
 * doivent tous les deux se reconnaître dans les trois, sinon la section rate
 * exactement ce pour quoi elle existe.
 */

export type Constat = {
  numero: string;
  titre: string;
  texte: string;
};

export const constats: Constat[] = [
  {
    numero: "01",
    titre: "Le travail ne se cumule pas",
    texte: "Beaucoup d'énergie, peu de choses qui restent. Chaque mois repart de zéro.",
  },
  {
    numero: "02",
    titre: "Les bons mois ne s'expliquent pas",
    texte: "Quand ça marche, personne ne sait pourquoi. Donc personne ne sait le refaire.",
  },
  {
    numero: "03",
    titre: "Tout passe par une seule personne",
    texte: "Ça avance à votre rythme, et ça s'arrête quand vous vous arrêtez.",
  },
];

/**
 * L'IMPACT, deuxième temps du récit.
 *
 * Le constat dit ce que le visiteur observe ; ceci dit ce que ça lui coûte. La
 * distinction n'est pas cosmétique : un symptôme se reconnaît, un coût se
 * ressent, et c'est le coût qui fait décrocher le téléphone.
 *
 * Rédaction : UN MOT, puis une ligne. Personne ne lit un paragraphe à cet
 * endroit de la page, et un mot composé en grand se retient là où une phrase
 * se survole. Aucun chiffre ici : nous n'avons pas les données du client, et
 * un pourcentage inventé se retourne contre nous au premier rendez-vous.
 */
export type Cout = { cle: string; mot: string; texte: string };

export const couts: Cout[] = [
  {
    cle: "temps",
    mot: "Du temps",
    texte: "Refaire chaque mois ce qui existait déjà.",
  },
  {
    cle: "budget",
    mot: "Du budget",
    texte: "Des dépenses engagées sans savoir ce qu'elles rapportent.",
  },
  {
    cle: "occasions",
    mot: "Des occasions",
    texte: "Des clients qui passent pendant qu'on hésite.",
  },
  {
    cle: "plafond",
    mot: "Un plafond",
    texte: "Un niveau que l'année suivante ne dépasse pas.",
  },
];

/**
 * La scène de la montée, en données plutôt qu'en CSS écrit à la main.
 *
 * `fin` est la hauteur AU REPOS, en pourcentage du cadre : c'est la
 * progression régulière, et c'est l'état que voit un visiteur sans
 * `animation-timeline`, avec `prefers-reduced-motion`, ou sans JavaScript.
 * `debut` est la hauteur irrégulière de départ, uniquement jouée en animation.
 *
 * Les valeurs de `debut` ne sont pas aléatoires : elles sont bornées à 100 pour
 * qu'aucune barre ne déborde du cadre pendant l'animation, et elles alternent
 * fort et faible pour que le désordre se lise dès la première image.
 */
export type BarreMontee = { mois: string; debut: number; fin: number };

export const barresMontee: BarreMontee[] = [
  { mois: "Janvier", debut: 62, fin: 16 },
  { mois: "Février", debut: 21, fin: 22 },
  { mois: "Mars", debut: 78, fin: 28 },
  { mois: "Avril", debut: 34, fin: 34 },
  { mois: "Mai", debut: 92, fin: 41 },
  { mois: "Juin", debut: 27, fin: 48 },
  { mois: "Juillet", debut: 71, fin: 56 },
  { mois: "Août", debut: 39, fin: 64 },
  { mois: "Septembre", debut: 96, fin: 73 },
  { mois: "Octobre", debut: 33, fin: 82 },
  { mois: "Novembre", debut: 57, fin: 91 },
  { mois: "Décembre", debut: 44, fin: 100 },
];
