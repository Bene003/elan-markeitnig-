import { entreprise } from "./entreprise";

/**
 * Les avis Google, en extraits statiques et non via l'API Places : l'API
 * impose une clé, coûte par requête, ne renvoie que cinq avis, et ses
 * conditions interdisent la mise en cache prolongée. Pour sept avis, on cite
 * des extraits datés et vérifiés avec un lien vers la fiche.
 *
 * PIÈGE SEO. Ces avis ne doivent JAMAIS être balisés en `aggregateRating`
 * dans le JSON-LD : Google pénalise le balisage d'avis auto-déclarés.
 *
 * ATTENTION : LES TROIS AVIS CI-DESSOUS SONT DES EXEMPLES DE MISE EN PAGE.
 *
 * Personne ne les a écrits. Ils servent à composer la section à sa vraie
 * densité pendant la construction, et ils DOIVENT être remplacés par les
 * extraits réels de la fiche Google avant la mise en ligne. Publier un faux
 * avis n'est pas un contenu provisoire, c'est une fausse représentation.
 */

export type Avis = {
  /**
   * Identifiant stable de l'avis.
   *
   * Ni l'auteur ni la date ne peuvent servir de clé : deux avis peuvent
   * porter le même prénom le même mois, et c'est déjà le cas des trois
   * emplacements en attente, qui sont identiques.
   */
  id: string;
  auteur: string;
  note: number;
  /** Extrait, pas l'avis entier : on cite, on ne recopie pas. */
  extrait: string;
  date: string;
};

export const noteGoogle = entreprise.avisGoogle.note;
export const nombreAvis = entreprise.avisGoogle.nombre;
export const lienFicheGoogle = entreprise.ficheGoogle;

export const avis: Avis[] = [
  {
    id: "avis-1",
    auteur: "Exemple",
    note: 5,
    extrait:
      "Ils ont commencé par nous dire ce qui n'allait pas, avant de nous vendre quoi que ce soit. Ça change de ce qu'on avait connu.",
    date: "à remplacer par un vrai avis",
  },
  {
    id: "avis-2",
    auteur: "Exemple",
    note: 5,
    extrait:
      "Un accompagnement concret. On repart de chaque rencontre avec deux ou trois choses à faire, pas avec un document de quarante pages.",
    date: "à remplacer par un vrai avis",
  },
  {
    id: "avis-3",
    auteur: "Exemple",
    note: 5,
    extrait:
      "Six mois plus tard, on voit encore la différence dans notre façon de travailler. C'est resté après leur départ.",
    date: "à remplacer par un vrai avis",
  },
];
