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
 * LA BARRE POINTE VERS LES PAGES, ET NON VERS LES SECTIONS DE L'ACCUEIL.
 *
 * Le modèle précédent était celui d'Hephera : un accueil qui portait le récit
 * complet, et une barre d'ancres qui y déplaçait le lecteur. Il tenait tant
 * que l'accueil restait le seul endroit où le contenu existait vraiment. Ce
 * n'est plus le cas : les cinq pages internes sont écrites, et l'accueil
 * redisait ce qu'elles disent déjà, en plus court. Un visiteur qui cliquait
 * « Méthode » dans la barre puis « Voir la méthode en détail » au bas de la
 * section lisait la méthode deux fois.
 *
 * L'accueil redevient donc ce qu'il est : une entrée. Il pose le problème,
 * aiguille entre les deux clientèles, et laisse chaque page porter son sujet.
 * Chaque lien de la barre mène à une page, jamais à une ancre.
 *
 * L'ORDRE EST CELUI DE LA DÉCISION, pas celui du site : on veut savoir ce
 * qu'une agence fait, comment elle s'y prend, ce que ça a donné, à qui on
 * parle, et enfin comment la joindre.
 *
 * `telephone: false` retire le lien du second rang de l'en-tête sous 1024px.
 * Trois libellés y tiennent, pas cinq : au-delà, ils se serrent sous la cible
 * tactile de 44px sur un écran de 360px de large, et le rang doit encore
 * accueillir le sélecteur de parcours. « Contact » saute parce que le bouton
 * de rendez-vous occupe déjà cette place, en plus visible, et « À propos »
 * parce que c'est la page qu'on consulte en dernier. Les deux restent
 * atteignables depuis le pied de page.
 */
export const pageLinks = [
  { href: "/services", label: "Services", telephone: true },
  { href: "/methode", label: "Méthode", telephone: true },
  { href: "/resultats", label: "Résultats", telephone: true },
  { href: "/a-propos", label: "À propos", telephone: false },
  { href: "/contact", label: "Contact", telephone: false },
] as const;

/** Les huit pages contractuelles, pour le pied de page et la page 404. */
export const navLinks = [...parcoursLinks, ...pageLinks];
