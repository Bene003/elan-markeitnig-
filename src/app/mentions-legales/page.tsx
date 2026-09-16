import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { entreprise } from "@/content/entreprise";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergement et propriété intellectuelle du site d'Elan Marketing.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

/**
 * Page hors des 8 pages contractuelles, donc sans effet sur l'art. 18.
 *
 * Les coordonnées viennent de content/entreprise.ts : quand Yliès confirme sa
 * raison sociale ou son adresse, c'est un fichier à corriger, pas trois pages.
 */
export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" titre="Mentions légales" />

      <Container>
        <div className="max-w-2xl py-20 sm:py-24">
          <div className="space-y-10">
          <Bloc titre="Éditeur du site">
            <p>
              {entreprise.nom}, exploité par {entreprise.raisonSociale}.
              <br />
              {entreprise.adresse.rue}, {entreprise.adresse.ville},{" "}
              {entreprise.adresse.region} {entreprise.adresse.codePostal}, Canada
              <br />
              Représentant : {entreprise.representant}, {entreprise.fonction}
              <br />
              Téléphone : {entreprise.telephoneAffiche}
              <br />
              Courriel : {entreprise.courriel}
            </p>
          </Bloc>

          <Bloc titre="Hébergement">
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis.
            </p>
          </Bloc>

          <Bloc titre="Propriété intellectuelle">
            <p>
              Les textes, images, logo et éléments graphiques du site
              appartiennent à {entreprise.raisonSociale}. Toute reproduction
              sans autorisation écrite est interdite.
            </p>
          </Bloc>

          <Bloc titre="Responsabilité">
            <p>
              Les informations publiées sont fournies à titre indicatif et
              peuvent évoluer. Elles ne constituent pas un engagement
              contractuel. Pour une réponse ferme sur un besoin précis,
              réservez un diagnostic.
            </p>
          </Bloc>

          <Bloc titre="Liens vers des sites tiers">
            <p>
              Le site peut renvoyer vers des services tiers, notamment le
              calendrier de réservation et la fiche Google de l&apos;entreprise.
              Leur contenu relève de leurs éditeurs respectifs.
            </p>
            </Bloc>
          </div>
        </div>
      </Container>
    </>
  );
}

function Bloc({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-6">
      <h2 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
        {titre}
      </h2>
      <div className="mt-3 text-[0.92rem] leading-[1.8] text-ink-muted">
        {children}
      </div>
    </section>
  );
}
