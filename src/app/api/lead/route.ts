import { NextResponse } from "next/server";
import { createLead, type Piste } from "@/lib/odoo";

/**
 * La SEULE route dynamique du site. Les 11 autres sont statiques et servies
 * depuis le CDN : la capacité de lecture ne dépend pas d'une invocation. Toute
 * route dynamique ajoutée ici change la nature du problème de charge.
 *
 * Ce qui n'est PAS fait ici, volontairement : la limitation de débit en
 * mémoire. Un `Map` de compteurs vit dans un processus, donc la limite réelle
 * devient N × seuil dès qu'il y a plusieurs instances, et elle se réinitialise
 * à chaque démarrage à froid. Le comptage par IP est déplacé au bord, dans le
 * pare-feu Vercel, qui refuse la requête avant même que la fonction démarre.
 * On garde ici ce qui doit rester applicatif : le pot de miel et la validation.
 */

const LONGUEURS_MAX = {
  name: 120,
  email: 160,
  phone: 40,
  company: 160,
  parcours: 20,
  message: 4000,
} as const;

type Champ = keyof typeof LONGUEURS_MAX;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function lireChamp(corps: Record<string, unknown>, champ: Champ) {
  const valeur = corps[champ];
  if (typeof valeur !== "string") return "";
  return valeur.trim().slice(0, LONGUEURS_MAX[champ]);
}

export async function POST(request: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ error: "corps_invalide" }, { status: 400 });
  }

  // Pot de miel : un visiteur ne voit jamais ce champ, un robot le remplit.
  // On répond 200 pour ne pas lui apprendre qu'il a été repéré.
  if (typeof corps.website === "string" && corps.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const piste: Piste = {
    nom: lireChamp(corps, "name"),
    courriel: lireChamp(corps, "email"),
    telephone: lireChamp(corps, "phone"),
    entreprise: lireChamp(corps, "company"),
    parcours:
      lireChamp(corps, "parcours") === "particulier"
        ? "particulier"
        : "entreprise",
    message: lireChamp(corps, "message"),
  };

  if (
    !piste.nom ||
    !EMAIL_RE.test(piste.courriel) ||
    piste.message.length < 10
  ) {
    return NextResponse.json({ error: "champs_invalides" }, { status: 400 });
  }

  // createLead borne l'appel Odoo et bascule sur l'alias courriel en cas
  // d'échec ou de dépassement de délai. L'art. 7.2 pose que ce repli vaut
  // exécution complète : une panne d'Odoo ne perd donc aucune piste.
  const resultat = await createLead(piste);

  if (!resultat.ok) {
    return NextResponse.json({ error: "livraison_impossible" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, transport: resultat.transport });
}
