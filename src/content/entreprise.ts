/**
 * Identité de l'entreprise. Source unique pour le pied de page, les mentions
 * légales, les métadonnées et le JSON-LD : un seul endroit à corriger quand
 * Yliès confirme ses coordonnées définitives.
 */

export const entreprise = {
  nom: "Elan Marketing",
  raisonSociale: "9544-4386 Québec inc.",
  representant: "Yliès El Safadi",
  fonction: "CEO",
  adresse: {
    rue: "2700 rue Angus",
    ville: "Montréal",
    region: "QC",
    codePostal: "H2H 1P3",
    pays: "CA",
  },
  telephone: "+1 579-373-0226",
  telephoneAffiche: "579 373-0226",
  courriel: "Ysafadi@elanmarketing.ca",

  /**
   * À CONFIRMER AU CADRAGE (décision posée à Yliès, art. 26.2) : le domaine
   * canonique. L'ancien site est sur elanmarketingagence.ca, mais le courriel
   * est sur elanmarketing.ca. Les deux ne peuvent pas être canoniques.
   */
  domaine: "https://www.elanmarketingagence.ca",

  /** À CONFIRMER : lien de la fiche Google et texte des 7 avis. */
  ficheGoogle: "",
  avisGoogle: {
    nombre: 7,
    note: 5,
  },
} as const;

export const siteName = entreprise.nom;
export const baseUrl = entreprise.domaine;
