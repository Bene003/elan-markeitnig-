import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta, Faq } from "@/components/funnel";
import { etapesMethode } from "@/content/methode";
import { faqCommune } from "@/content/faq";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Diagnostic, stratégie, mise en place, suivi, croissance. Ce que vous obtenez à chaque étape, et ce qui se passe après le premier rendez-vous.",
  alternates: { canonical: "/methode" },
};

/**
 * Le site actuel présente la méthode du point de vue du travail d'Elan. Cette
 * page la présente du point de vue de ce que le client obtient, et répond à la
 * question que le site actuel laisse ouverte : ce qui se passe APRÈS le
 * rendez-vous.
 */
export default function MethodePage() {
  return (
    <>
      <PageHero
        eyebrow="Méthode"
        titre="Ce qui se passe après"
        titreAccent="le premier rendez-vous"
        intro="Six étapes, dont une chez vous, sur le terrain. Pour chacune, ce que nous faisons, ce que vous obtenez, et ce que nous attendons de vous."
      />

      <Section tone="creuse">
        <SectionHeading
          eyebrow="Les étapes"
          title="Du diagnostic à la croissance"
        />

        {/* LA SECTION EST SA PROPRE SCÈNE : UNE FLÈCHE QUI DESCEND.

            La scène vient de l'accueil, où elle résumait la méthode en
            quelques lignes. Sa place est ici : une méthode est une progression
            dans le temps, le défilement en est une aussi, et c'est la page qui
            détaille les étapes qui gagne le plus à les faire coïncider. Le
            visiteur ne lit pas les étapes, il les parcourt, et chacune se
            découvre au moment où la pointe l'atteint.

            Ce qui change par rapport à l'accueil : le rang n'est plus un titre
            et une ligne, c'est le tableau complet des trois colonnes. C'est
            donc `.methode-texte` qui porte la grille entière plutôt que le seul
            couple titre / livrable.

            Trois pièces : un rail pâle qui montre le chemin restant, une tige
            verte qui grandit, une pointe qui la suit. La pointe est le seul
            élément mobile, tout le reste est un `scaleY` sur le fil de
            composition. Chronologie `view()` nommée sur le parent `.methode`,
            plages échelonnées par `--rang`. `--etapes` donne le nombre de
            rangs à la feuille de style, qui en déduit le pas d'échelonnement :
            ajouter l'immersion a fait passer la méthode de cinq à six étapes,
            et un pas écrit en dur aurait allumé les jalons en retard sur la
            pointe. Voir globals.css. */}
        <ol
          className="methode relative mt-12 border-t border-line-strong pl-12 sm:pl-16"
          style={{ "--etapes": etapesMethode.length } as CSSProperties}
        >
          {/* LA PISTE. Elle donne sa hauteur à tout le reste, et c'est ce qui
              permet de faire descendre la pointe sans connaître cette hauteur :
              le calque de la pointe fait exactement la taille de la piste, donc
              `translateY(-100%)` le remonte d'une piste entière, pile. Une
              distance en pourcentage plutôt qu'en pixels, donc juste quel que
              soit le nombre d'étapes et la longueur des textes. */}
          <span
            aria-hidden="true"
            className="absolute top-14 bottom-10 left-[7px] w-0.5 sm:top-[3.4rem] sm:left-[10px]"
          >
            <span className="absolute inset-0 bg-line-strong" />
            <span className="methode-tige absolute inset-0 origin-top bg-brand" />
            {/* La pointe donne le sens de lecture : sans elle, le trait
                pourrait aussi bien monter. */}
            <span className="methode-pointe absolute inset-0">
              <span className="absolute bottom-0 left-1/2 size-0 -translate-x-1/2 translate-y-1/2 border-x-[6px] border-t-[9px] border-x-transparent border-t-brand" />
            </span>
          </span>

          {/* Chaque étape est un rang plein cadre, pas une carte : le numéro
              composé en très grand à gauche fait la colonne vertébrale de la
              page, et l'œil descend la suite des numéros sans effort. Ce que le
              client OBTIENT est en encre pleine, ce qu'Elan fait et ce qu'on
              attend de lui sont en encre atténuée : la hiérarchie de couleur
              dit qui est le sujet de la phrase. */}
          {etapesMethode.map((etape, i) => (
            <li
              key={etape.numero}
              className="relative border-b border-line"
              style={{ "--rang": i } as CSSProperties}
            >
              {/* Le jalon est en dehors du flux du texte, sur le rail, et calé
                  sur le milieu du grand numéro : c'est le point d'ancrage
                  visuel du rang, celui que l'œil vise en descendant. */}
              <span
                aria-hidden="true"
                className="methode-jalon absolute top-14 -left-12 size-4 rounded-full border-2 border-brand bg-surface sm:top-[3.4rem] sm:-left-16 sm:size-[1.375rem]"
              />

              <div className="methode-texte grid gap-x-10 gap-y-6 py-10 lg:grid-cols-[14rem_1fr]">
                <div className="flex items-baseline gap-5 lg:block">
                  <span
                    aria-hidden="true"
                    className="font-display text-[3.2rem] leading-none font-extrabold tracking-[-0.05em] text-brand/25"
                  >
                    {etape.numero}
                  </span>
                  <div className="lg:mt-3">
                    <h2 className="font-display text-[1.3rem] leading-tight font-bold tracking-[-0.02em] text-ink">
                      <span className="sr-only">Étape {etape.numero} : </span>
                      {etape.titre}
                    </h2>
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] tracking-[0.16em] text-ink-muted uppercase">
                      {etape.duree}
                      {/* La clientèle est dite à côté de la durée, là où
                          l'œil lit déjà les conditions de l'étape, et non
                          dans le titre, qui reste le même pour tous. */}
                      {etape.clientele ? (
                        <span className="rounded-full border border-brand/30 px-2.5 py-0.5 text-[0.62rem] tracking-[0.18em] text-brand">
                          {etape.clientele.libelle}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>

                <dl className="grid gap-8 sm:grid-cols-3">
                  <div>
                    <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                      Ce que nous faisons
                    </dt>
                    <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink-muted">
                      {etape.action}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-brand uppercase">
                      Ce que vous obtenez
                    </dt>
                    <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink">
                      {etape.livrable}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                      Ce qu&apos;on attend de vous
                    </dt>
                    <dd className="mt-3 text-[0.92rem] leading-[1.75] text-ink-muted">
                      {etape.attenduDuClient}
                    </dd>
                  </div>
                </dl>

                {etape.clientele ? (
                  <p className="text-[0.85rem] leading-[1.7] text-ink-muted italic lg:col-start-2">
                    {etape.clientele.ailleurs}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Faq questions={faqCommune} />

      <FinalCta
        titre="La première étape dure vingt minutes"
        texte="Elle est sans frais et sans suite obligatoire. C'est le seul moyen honnête de savoir si la suite a du sens."
      />
    </>
  );
}
