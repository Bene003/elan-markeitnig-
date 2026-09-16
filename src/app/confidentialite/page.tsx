import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { entreprise } from "@/content/entreprise";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quels renseignements Elan Marketing recueille sur ce site, pourquoi, et comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

/**
 * Loi 25 (Québec). Deux choses rendent cette page courte et honnête :
 *  - la mesure d'audience retenue est sans témoin et sans donnée personnelle,
 *    donc aucune bannière de consentement n'est requise ;
 *  - le seul témoin déposé est `parcours`, un témoin de session qui retient
 *    « entreprise » ou « particulier » et rien d'autre.
 *
 * Si Yliès impose GA4 plus tard, cette page ne suffit plus : il faut une
 * bannière et un blocage avant consentement. C'est écrit ici pour que le lien
 * entre les deux décisions reste visible.
 */
export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        titre="Politique de confidentialité"
        intro="Cette politique décrit les renseignements personnels recueillis par l'entremise de ce site, l'usage qui en est fait et vos droits, conformément à la Loi 25 du Québec."
      />

      <Container>
        <div className="max-w-2xl py-20 sm:py-24">
          <div className="space-y-10">
          <Bloc titre="Responsable de la protection des renseignements">
            <p>
              {entreprise.representant}, {entreprise.fonction} de{" "}
              {entreprise.raisonSociale}.
              <br />
              Courriel : {entreprise.courriel} · Téléphone :{" "}
              {entreprise.telephoneAffiche}
            </p>
          </Bloc>

          <Bloc titre="Ce que nous recueillons">
            <p>
              Uniquement ce que vous nous transmettez vous-même : votre nom,
              votre courriel, et si vous les indiquez votre téléphone, le nom de
              votre entreprise et le message que vous rédigez. Le formulaire ne
              recueille rien d&apos;autre.
            </p>
            <p className="mt-3">
              Si vous réservez un rendez-vous, les renseignements saisis dans le
              calendrier sont traités par notre outil de gestion de la relation
              client.
            </p>
          </Bloc>

          <Bloc titre="Pourquoi">
            <p>
              Pour vous répondre et préparer votre diagnostic. Rien de plus.
              Aucune revente, aucun partage à des fins publicitaires, aucune
              infolettre sans votre demande explicite.
            </p>
          </Bloc>

          <Bloc titre="Témoins et mesure d&apos;audience">
            <p>
              Un seul témoin est déposé : il retient si vous consultez le site
              en tant qu&apos;entreprise ou en tant que particulier, pour vous
              montrer le bon contenu. Il ne contient aucun renseignement
              personnel et disparaît à la fermeture du navigateur.
            </p>
            <p className="mt-3">
              La mesure d&apos;audience du site est anonyme et sans témoin :
              elle compte des visites, jamais des personnes.
            </p>
          </Bloc>

          <Bloc titre="Conservation">
            <p>
              Les demandes reçues sont conservées le temps nécessaire au suivi
              commercial, puis supprimées sur demande à tout moment.
            </p>
          </Bloc>

          <Bloc titre="Vos droits">
            <p>
              Vous pouvez demander l&apos;accès, la rectification ou la
              suppression de vos renseignements, ainsi que le retrait de votre
              consentement, en écrivant à {entreprise.courriel}. Une réponse
              vous est fournie dans les 30 jours.
            </p>
            <p className="mt-3">
              En cas de désaccord, vous pouvez porter plainte auprès de la
              Commission d&apos;accès à l&apos;information du Québec.
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
