import type { QuestionFaq } from "./parcours";

/**
 * FAQ commune aux deux parcours, jouée sur /contact. Les FAQ propres à chaque
 * clientèle vivent dans content/parcours.ts.
 *
 * Ces questions traitent des objections, pas de la documentation : c'est le
 * ressort qui fait fonctionner la référence retenue pour le chantier.
 */

export const faqCommune: QuestionFaq[] = [
  {
    question: "Comment se passe le diagnostic de 20 minutes ?",
    reponse:
      "Vous choisissez un créneau dans le calendrier, vous recevez une confirmation, et nous nous parlons en visioconférence ou en personne à Montréal. Vingt minutes, sans frais et sans suite obligatoire.",
  },
  {
    question: "Est-ce que je peux vous écrire plutôt que réserver ?",
    reponse:
      "Oui. Le formulaire plus bas fonctionne tout aussi bien. Le rendez-vous est simplement le chemin le plus rapide si vous êtes prêt à avancer.",
  },
  {
    question: "Travaillez-vous en dehors de Montréal ?",
    reponse:
      "Oui, partout au Québec, à distance. Montréal et ses environs sont simplement les endroits où nous pouvons aussi nous rencontrer en personne.",
  },
  {
    question: "Quels sont vos tarifs ?",
    reponse:
      "Ils dépendent de votre situation et de ce que vous cherchez à régler. Nous les communiquons lors du diagnostic, avant tout engagement.",
  },
  {
    question: "En combien de temps répondez-vous ?",
    reponse:
      "Sous un jour ouvrable. Si vous réservez un créneau dans le calendrier, la confirmation est immédiate et il n'y a rien à attendre.",
  },
];
