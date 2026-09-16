import { parcoursHref } from "@/lib/parcours";

/**
 * Les deux parcours sont séparés du reste de la navigation : sur ordinateur,
 * c'est le sélecteur de l'art. 3 qui les porte, et les répéter dans la barre
 * donnerait deux fois les mêmes liens dans le même bandeau.
 *
 * Eux seuls restent des liens de PAGE dans la barre, parce que l'art. 3 exige
 * un choix mémorisé et changeable : une ancre ne changerait pas de parcours.
 */
export const parcoursLinks = [
  { href: parcoursHref.entreprise, label: "Entreprises" },
  { href: parcoursHref.particulier, label: "Particuliers" },
] as const;

/**
 * La barre de navigation pointe vers les SECTIONS DE L'ACCUEIL, pas vers les
 * pages internes.
 *
 * C'est le modèle d'Hephera, et il repose sur une observation simple : un
 * prospect qui arrive ne veut pas naviguer, il veut lire une histoire de bout
 * en bout. Une barre qui l'envoie sur cinq pages différentes le fait
 * recommencer cinq fois. L'accueil porte donc le récit complet, et les pages
 * internes servent à approfondir ce qui a retenu l'attention.
 *
 * Les huit pages contractuelles existent toujours et restent atteignables :
 * chaque section de l'accueil se termine par un lien vers sa page, et le pied
 * de page les liste toutes. C'est ce qui tient à la fois l'art. 4 et le
 * critère « aucun lien mort » de l'art. 20.
 */
/**
 * L'ORDRE SUIT LA PAGE, et non l'habitude.
 *
 * L'accueil raconte le constat, puis la méthode, puis il bifurque entre les
 * deux clientèles, et c'est cette bifurcation qui porte les huit services. La
 * méthode passe donc avant les services dans la barre. Une barre d'ancres qui
 * ne suit pas l'ordre de la page fait remonter le visiteur en arrière sans
 * qu'il comprenne pourquoi, et c'est le seul défaut vraiment coûteux de ce
 * modèle de navigation.
 */
export const ancreLinks = [
  { href: "/#methode", label: "Méthode" },
  { href: "/#services", label: "Services" },
  { href: "/#resultats", label: "Résultats" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Les pages internes, pour le pied de page et la page 404. */
export const pageLinks = [
  { href: "/services", label: "Services" },
  { href: "/methode", label: "Méthode" },
  { href: "/resultats", label: "Résultats" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

/** Les huit pages contractuelles, pour le pied de page et la page 404. */
export const navLinks = [...parcoursLinks, ...pageLinks];
