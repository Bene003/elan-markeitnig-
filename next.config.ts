import type { NextConfig } from "next";

/**
 * Redirections de l'ancien site (art. 20 : les anciennes URL renvoient vers
 * leur équivalent). En 301, donc permanentes : c'est ce qui transfère
 * l'historique de référencement au lieu de le perdre.
 *
 * Ne figurent ici que les anciennes URL dont la version minuscule n'est PAS
 * une page du nouveau site. `/Services` et `/Contact` sont traités dans
 * `middleware.ts`, pour la raison expliquée là-bas.
 *
 * Le cas /Career : cette page n'a aucun équivalent parmi les 8 pages du
 * contrat. Elle pointe vers le bloc « Carrières » de /a-propos, ce qui
 * satisfait la lettre de l'article sans créer un 9ᵉ gabarit, qui serait un
 * avenant au sens de l'art. 18. Rediriger vers /contact polluerait le
 * formulaire avec des candidatures, et rediriger vers l'accueil serait traité
 * par Google comme un soft 404, donc le critère ne serait pas rempli.
 *
 * Le « guide gratuit » de l'ancien site n'est pas reconstruit : c'est un aimant
 * à prospects hors périmètre, et aucun lien vers lui ne doit survivre.
 */
const anciennesPages: [string, string][] = [
  ["/Home", "/"],
  ["/About", "/a-propos"],
  ["/Method", "/methode"],
  ["/Results", "/resultats"],
  ["/Career", "/a-propos#carriere"],
];

const nextConfig: NextConfig = {
  async redirects() {
    // Next compare les `source` SANS tenir compte de la casse : déclarer en
    // plus les variantes minuscules serait redondant, et surtout ce sont ces
    // doublons qui créaient une boucle sur /services et /contact.
    return anciennesPages.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
