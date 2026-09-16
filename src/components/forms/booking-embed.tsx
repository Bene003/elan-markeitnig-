import { ButtonLink } from "@/components/ui";
import { entreprise } from "@/content/entreprise";

/**
 * L'app Rendez-vous d'Odoo, embarquée en iframe.
 *
 * Trois points ne sont pas décoratifs :
 *  - `title` est obligatoire, c'est un critère d'accessibilité direct ;
 *  - `loading="lazy"` évite de payer le tiers au premier rendu ;
 *  - le conteneur porte une hauteur fixe pour que l'iframe ne provoque aucun
 *    décalage de mise en page en arrivant.
 *
 * L'art. 20 exclut explicitement les modules tiers embarqués du score de
 * performance, ce qui protège cette page.
 *
 * L'URL vient d'une variable d'environnement plutôt que d'être codée en dur :
 * elle sera relevée au bouton "Partager" d'Odoo pendant le spike du jour 2. En
 * son absence, le bloc dégrade proprement vers le téléphone et le formulaire.
 */
export function BookingEmbed() {
  const url = process.env.ODOO_APPOINTMENT_URL;

  if (!url) {
    return (
      <div className="rounded-2xl border border-line bg-surface-raised p-8 text-center">
        <p className="text-sm leading-relaxed text-ink-muted">
          Le calendrier de réservation est en cours de configuration. En
          attendant, écrivez-nous avec le formulaire plus bas ou appelez le{" "}
          <a
            href={`tel:${entreprise.telephone.replace(/\s/g, "")}`}
            className="text-brand underline underline-offset-4"
          >
            {entreprise.telephoneAffiche}
          </a>
          .
        </p>
        <ButtonLink href="#formulaire" className="mt-6" variant="secondary">
          Aller au formulaire
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="h-[46rem] overflow-hidden rounded-2xl border border-line">
      <iframe
        src={url}
        title="Réserver un diagnostic de 20 minutes avec Elan Marketing"
        loading="lazy"
        className="size-full"
      />
    </div>
  );
}
