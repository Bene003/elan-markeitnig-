/**
 * La section tarifs existe comme emplacement réel, mais ses chiffres sont en
 * attente de Yliès. Le `status` est ce qui empêche cette attente de bloquer le
 * reste du chantier : en `pending`, <PricingSlot> rend une carte "tarifs
 * communiqués lors du diagnostic", qui est un parti pris légitime et non un
 * trou dans la page.
 *
 * Quand les chiffres arrivent, c'est l'édition de ce seul fichier.
 */

export type Offre = {
  nom: string;
  prix: string;
  precision: string;
  inclus: string[];
};

export type Tarifs =
  | { status: "pending"; message: string }
  | { status: "published"; offres: Offre[] };

export const tarifs: Tarifs = {
  status: "pending",
  message:
    "Nos tarifs dépendent de votre situation et de ce que vous cherchez à régler. Nous les communiquons lors du diagnostic de 20 minutes, sans engagement.",
};
