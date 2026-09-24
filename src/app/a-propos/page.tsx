import type { Metadata } from "next";
import Image from "next/image";
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
    "Elan Marketing, agence commerciale et de croissance. Notre histoire, notre équipe et nos valeurs.",
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
        titre="Une agence à taille humaine, dirigée par une personne"
        titreAccent="que vous pouvez joindre"
        intro="Elan Marketing accompagne les entreprises et les porteurs de projet du Québec sur ce qui décide de leur croissance : savoir à qui l'on parle, comment on vend, et comment on refait le mois suivant ce qui a marché ce mois-ci."
      />

      {/* ------------------------------------------------------------------
          LES COORDONNÉES. Ce bloc vivait sur l'accueil, et c'est ici qu'il
          aurait toujours dû être : ce qu'il vend n'est pas une histoire
          d'entreprise, c'est une disponibilité. Quelqu'un de nommé, qu'on peut
          joindre.

          LE PLAN A ÉTÉ RETIRÉ. Il dessinait le damier de la ville et en
          affichait le nom en très grand : c'était la référence géographique la
          plus voyante du site, alors qu'Élan travaille à distance dans la
          quasi-totalité des cas. L'adresse reste dans la liste ci-dessous, où
          elle sert à joindre et non à situer.

          Colonnes inégales et coordonnées alignées en bas. À colonnes égales,
          le titre se cassait sur six lignes pendant que les trois coordonnées
          flottaient en haut d'un vide : deux blocs côte à côte qui ne se
          regardaient pas.
          ------------------------------------------------------------------ */}
      <Section tone="creuse">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Nous joindre"
              title="Une agence proche, disponible quand il faut avancer"
              subtitle="Les échanges se font en visioconférence, et en personne quand la distance le permet. Dans les deux cas, avec une équipe qui connaît votre dossier."
            />
          </div>

          <dl className="border-t border-line-strong">
            {[
              {
                terme: "Adresse",
                valeur: `${entreprise.adresse.rue}, ${entreprise.adresse.ville}`,
              },
              { terme: "Téléphone", valeur: entreprise.telephoneAffiche },
              { terme: "Courriel", valeur: entreprise.courriel },
            ].map((ligne) => (
              <div
                key={ligne.terme}
                className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-line py-5"
              >
                <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                  {ligne.terme}
                </dt>
                <dd className="text-[0.95rem] text-ink">{ligne.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          L'ÉQUIPE. La carte du représentant était seule ici, dans une colonne
          à moitié vide ; les trois façons de travailler et la photo vivaient
          sur l'accueil. Les deux disaient la même chose à deux endroits. Ils
          sont réunis : QUI, puis COMMENT, et la photo tient la colonne droite
          que la carte laissait ouverte.
          ------------------------------------------------------------------ */}
      <Section grille>
        <SectionHeading
          eyebrow="L'équipe"
          title={
            <>
              Des personnes impliquées, pas une{" "}
              <em className="text-brand italic">boîte noire</em>
            </>
          }
          subtitle="Derrière chaque recommandation, il y a une équipe qui écoute, clarifie et reste présente lorsque les décisions doivent devenir des actions."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <div>
            <Card>
              {/* Le monogramme tient lieu de portrait tant que le client n'en
                  a pas fourni un. Une carte avec un vide à la place de la
                  photo se lit comme un site inachevé, un monogramme se lit
                  comme un parti pris. */}
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
                    Il dirige les mandats et reste l&apos;interlocuteur du
                    début à la fin. Vous parlez à la personne qui travaille sur
                    votre dossier, pas à un chargé de compte qui transmet.
                  </p>
                </div>
              </div>
            </Card>

            <ul className="mt-10 border-t border-line-strong">
              {[
                ["Un regard partagé", "Les bonnes décisions se prennent avec les personnes qui vont les porter."],
                ["Du concret", "Nous transformons les échanges en prochaines étapes claires et réalisables."],
                ["Une présence continue", "Vous savez toujours qui avance sur votre dossier et pourquoi."],
              ].map(([titre, texte]) => (
                <li
                  key={titre}
                  className="grid grid-cols-[1.25rem_1fr] gap-4 border-b border-line py-5"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 rounded-full bg-accent" />
                  <div>
                    <h3 className="font-display text-[1.05rem] font-semibold text-ink">{titre}</h3>
                    <p className="mt-1.5 text-[0.92rem] leading-[1.75] text-ink-muted">{texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative overflow-hidden rounded-[1.5rem] bg-surface-sunken shadow-[0_2rem_4rem_-2.6rem_rgba(5,23,14,0.72)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/equipe-elan-exemple.png"
                alt="Portrait illustratif de l'équipe Élan réunie autour d'une table de travail"
                fill
                sizes="(min-width: 64rem) 48vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute right-4 bottom-4 left-4 rounded-full border border-white/20 bg-surface-invert/88 px-4 py-2 text-center text-[0.62rem] font-medium tracking-[0.16em] text-ink-invert-muted uppercase backdrop-blur-sm">
              Photo illustrative · portraits de l&apos;équipe à venir
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Creuse, parce que la section de l'équipe au-dessus est désormais sur
          grille : deux fonds identiques qui se suivent effacent la séparation. */}
      <Section tone="creuse">
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
      <Section id="carriere" grille>
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
