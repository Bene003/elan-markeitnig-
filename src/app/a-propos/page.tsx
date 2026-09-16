import type { Metadata } from "next";
import {
  ButtonLink,
  Card,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui";
import { FinalCta } from "@/components/funnel";
import { entreprise } from "@/content/entreprise";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Elan Marketing, agence commerciale et de croissance à Montréal. Notre histoire, notre équipe et nos valeurs.",
  alternates: { canonical: "/a-propos" },
};

// CONTENU À VALIDER AU CADRAGE : histoire, équipe et valeurs sont des
// livrables du client (art. 17). Les textes ci-dessous sont des exemples de
// mise en page, écrits pour que la page se compose à sa vraie densité.
// Yliès les confirme ou les remplace.
const valeurs = [
  {
    titre: "Dire ce qui ne va pas",
    texte:
      "Y compris quand la réponse est qu'un accompagnement ne servirait à rien. Un client mal orienté coûte plus cher qu'un client refusé.",
  },
  {
    titre: "Laisser quelque chose derrière",
    texte:
      "Un fonctionnement que l'équipe sait faire tourner sans nous vaut mieux qu'une dépendance confortable.",
  },
  {
    titre: "Mesurer avant d'affirmer",
    texte:
      "Une décision qui repose sur une impression se paie au trimestre suivant. Nous regardons les chiffres, même quand ils dérangent.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        titre="Une agence montréalaise, dirigée par une personne"
        titreAccent="que vous pouvez joindre"
        intro="Elan Marketing accompagne les entreprises et les porteurs de projet du Québec sur ce qui décide de leur croissance : savoir à qui l'on parle, comment on vend, et comment on refait le mois suivant ce qui a marché ce mois-ci."
      />

      <Section tone="creuse">
        <SectionHeading eyebrow="L'équipe" title="Qui vous accompagne" />
        <div className="mt-12 max-w-xl">
          <Card>
            {/* Le monogramme tient lieu de portrait tant que le client n'en a
                pas fourni un. Une carte avec un vide à la place de la photo se
                lit comme un site inachevé, un monogramme se lit comme un
                parti pris. */}
            <div className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-brand/25 font-display text-base font-extrabold tracking-wider text-brand"
              >
                {entreprise.representant
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((mot) => mot[0])
                  .join("")
                  .toUpperCase()}
              </span>
              <div>
                <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
                  {entreprise.representant}
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium tracking-[0.1em] text-brand uppercase">
                  {entreprise.fonction}
                </p>
                <p className="mt-4 text-[0.95rem] leading-[1.8] text-ink-muted">
                  Il dirige les mandats et reste l&apos;interlocuteur du début
                  à la fin. Vous parlez à la personne qui travaille sur votre
                  dossier, pas à un chargé de compte qui transmet.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section grille>
        <SectionHeading eyebrow="Valeurs" title="Ce à quoi nous tenons" />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {valeurs.map((valeur, i) => (
            <div key={valeur.titre}>
              <span
                aria-hidden="true"
                className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-brand"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="filet mt-4 mb-6 w-16 bg-brand/30" />
              <h3 className="font-display text-[1.15rem] leading-snug font-bold text-ink">
                {valeur.titre}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-muted">
                {valeur.texte}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/*
        Bloc Carrières. Il existe parce que l'ancien site expose une page
        /Career qui n'a aucun équivalent parmi les huit pages contractuelles,
        et que l'art. 20 exige que chaque ancienne URL renvoie vers "son
        équivalent". Rediriger /Career vers l'accueil serait traité par Google
        comme un soft 404, donc le critère ne serait pas rempli. Créer une
        neuvième page serait un avenant au sens de l'art. 18.
        Décision soumise à Yliès au cadrage, validation tacite à 2 jours.
      */}
      <Section id="carriere" tone="creuse">
        <SectionHeading
          eyebrow="Carrières"
          title="Travailler avec nous"
          subtitle="Nous n'avons pas de poste ouvert en permanence. Si le travail décrit sur ce site est celui que vous voulez faire, écrivez-nous : nous lisons les candidatures spontanées."
        />
        <ButtonLink href="/contact" variant="secondary" className="mt-8">
          Nous écrire
        </ButtonLink>
      </Section>

      <FinalCta
        titre="Parlons de votre situation"
        texte="Vingt minutes, sans frais et sans suite obligatoire."
      />
    </>
  );
}
