import { envoyerPisteParCourriel } from "./mail";

export type Piste = {
  nom: string;
  courriel: string;
  telephone: string;
  entreprise: string;
  parcours: string;
  message: string;
};

export type ResultatPiste = {
  ok: boolean;
  /** Par quel chemin la piste est réellement partie. */
  transport: "odoo" | "courriel" | "aucun";
};

/**
 * Un appel réseau vers un serveur qu'on ne contrôle pas doit toujours être
 * borné. Sans cette limite, une lenteur d'Odoo devient une lenteur du site,
 * puis une fonction qui expire, puis un prospect perdu.
 */
const DELAI_ODOO_MS = 4000;

/**
 * Création de piste, derrière une seule interface, pour que le repli soit une
 * dégradation et non une réécriture.
 *
 *   createLead → API JSON-2 → crm.lead        (chemin nominal)
 *              ↘ alias courriel via Resend    (repli, art. 7.2)
 *
 * L'art. 7.2 du contrat pose que le repli par alias VAUT EXÉCUTION COMPLÈTE.
 * C'est ce qui plafonne le risque du chantier : une panne d'Odoo ne perd
 * aucune piste et ne remet pas la livraison en cause.
 */
export async function createLead(piste: Piste): Promise<ResultatPiste> {
  const odoo = await creerDansOdoo(piste);
  if (odoo) return { ok: true, transport: "odoo" };

  const courriel = await envoyerPisteParCourriel(piste);
  return { ok: courriel, transport: courriel ? "courriel" : "aucun" };
}

async function creerDansOdoo(piste: Piste): Promise<boolean> {
  const url = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const login = process.env.ODOO_LOGIN;
  const apiKey = process.env.ODOO_API_KEY;

  // Tant que le forfait Custom et l'utilisateur dédié ne sont pas en place, on
  // passe directement au repli. Pas d'erreur, pas de piste perdue.
  if (!url || !db || !login || !apiKey) return false;

  try {
    const reponse = await fetch(`${url}/json/2/crm.lead`, {
      method: "POST",
      signal: AbortSignal.timeout(DELAI_ODOO_MS),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Odoo-Database": db,
      },
      body: JSON.stringify({
        method: "create",
        ids: [],
        kwargs: {
          vals_list: [
            {
              name: `${piste.nom}${piste.entreprise ? ` (${piste.entreprise})` : ""}`,
              contact_name: piste.nom,
              email_from: piste.courriel,
              phone: piste.telephone || false,
              partner_name: piste.entreprise || false,
              description: `Parcours : ${piste.parcours}\n\n${piste.message}`,
            },
          ],
        },
      }),
    });

    return reponse.ok;
  } catch (erreur) {
    // Expiration du délai, panne, mauvais forfait : tout finit ici, et tout
    // repart par le courriel.
    console.error("Odoo indisponible, bascule sur le repli courriel:", erreur);
    return false;
  }
}
