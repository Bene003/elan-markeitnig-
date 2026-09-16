import { Resend } from "resend";
import type { Piste } from "./odoo";

/**
 * Le repli de l'art. 7.2 : la piste part vers l'alias courriel qui crée les
 * pistes dans le CRM.
 *
 * Cet alias est configuré MÊME SI l'API Odoo fonctionne, comme redondance. Ce
 * n'est pas une roue de secours théorique : c'est le chemin qui rend le
 * chantier indépendant du forfait Odoo du client.
 */
export async function envoyerPisteParCourriel(piste: Piste): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const destinataire = process.env.LEAD_TO_EMAIL;

  if (!apiKey || !destinataire) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "RESEND_API_KEY ou LEAD_TO_EMAIL manquant : la piste ne peut pas être livrée.",
      );
      return false;
    }
    console.info("[lead] pas de clé Resend, piste journalisée :", piste);
    return true;
  }

  const lignes: [string, string][] = [
    ["Nom", piste.nom],
    ["Courriel", piste.courriel],
    ["Téléphone", piste.telephone || "non fourni"],
    ["Entreprise", piste.entreprise || "non fournie"],
    ["Parcours", piste.parcours],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0e1116">
      <h2 style="margin:0 0 16px">Nouvelle demande depuis le site</h2>
      <table style="border-collapse:collapse">
        ${lignes
          .map(
            ([label, valeur]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#5a6472">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(valeur)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap">${escapeHtml(piste.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL ?? "Site Elan <onboarding@resend.dev>",
      to: destinataire,
      replyTo: piste.courriel,
      subject: `Nouvelle demande, ${piste.nom}${piste.entreprise ? ` (${piste.entreprise})` : ""}`,
      html,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return false;
    }
    return true;
  } catch (erreur) {
    console.error("Envoi de la piste impossible:", erreur);
    return false;
  }
}

/** Le contenu vient d'un formulaire public : il n'entre jamais brut dans du HTML. */
function escapeHtml(valeur: string) {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
