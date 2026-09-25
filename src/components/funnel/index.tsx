import {
  Anneaux,
  ButtonLink,
  Card,
  Container,
  Display,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal } from "@/components/scenes/reveal";
import { Etoiles } from "@/components/scenes/etoiles";
import { ChiffreVivant } from "@/components/scenes/chiffre";
import type {
  Douleur,
  Etape,
  QuestionFaq,
  Resultat,
} from "@/content/parcours";
import type { EtudeDeCas } from "@/content/cas";
import type { CSSProperties } from "react";
import { avis, lienFicheGoogle, nombreAvis, noteGoogle } from "@/content/avis";
import { tarifs } from "@/content/tarifs";

/**
 * Les blocs du tunnel. Ils sont partagés par les deux parcours : tout ce qui
 * distingue une entreprise d'un particulier arrive en props depuis
 * content/parcours.ts, et rien n'est codé en dur ici.
 *
 * Tous sont des composants serveur. Aucun n'entre dans le bundle client.
 *
 * Deux procédés reviennent partout et ce sont eux qui font la différence avec
 * un gabarit :
 *   - la GRILLE À FILETS : les cellules ne portent pas de bordure, elles sont
 *     séparées par un écart de 1 px à travers lequel on voit le fond. Une
 *     seule ligne, aucune bordure double, aucun demi-pixel aux jonctions.
 *   - l'ASYMÉTRIE : jamais trois cartes de taille identique en ligne. Une
 *     grille régulière de cartes identiques est la signature visuelle du
 *     gabarit, et l'œil la reconnaît avant même de lire.
 */

export function PainCards({
  titre,
  douleurs,
}: {
  titre: string;
  douleurs: Douleur[];
}) {
  const [principale, ...secondaires] = douleurs;

  return (
    <Section tone="sombre" grille>
      <SectionHeading eyebrow="Le constat" title={titre} tone="sombre" />

      {/* Asymétrie assumée : la première douleur occupe une colonne large sur
          toute la hauteur, les autres s'empilent à côté. C'est la disposition
          qui dit « celle-ci d'abord » sans avoir à l'écrire. */}
      <div className="grille-filets-invert mt-14 grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="lg:row-span-2">
          <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden bg-surface-invert p-9 transition-colors duration-500 hover:bg-invert-raised sm:p-11">
            {/* Deux anneaux concentriques, assez grands pour que le vide du
                haut de la carte se lise comme une composition et non comme un
                bloc qui n'a pas été rempli. */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-6 size-40 rounded-full border border-accent/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 sm:size-52"
            />
            <span
              aria-hidden="true"
              className="absolute top-6 right-6 size-40 scale-[0.62] rounded-full border border-dashed border-accent/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-75 sm:size-52"
            />
            <span className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-accent">
              01
            </span>
            <h3 className="mt-8 font-display text-[1.6rem] leading-tight font-bold text-ink-invert">
              {principale.titre}
            </h3>
            <p className="mt-4 max-w-md text-[0.95rem] leading-[1.8] text-ink-invert-muted">
              {principale.texte}
            </p>
          </article>
        </Reveal>

        {secondaires.map((douleur, i) => (
          <Reveal key={douleur.titre} delay={(i + 1) * 90}>
            <article className="h-full bg-surface-invert p-9 transition-colors duration-500 hover:bg-invert-raised sm:p-11">
              <span className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-accent">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-[1.25rem] leading-tight font-bold text-ink-invert">
                {douleur.titre}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-invert-muted">
                {douleur.texte}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Outcomes({
  titre,
  resultats,
}: {
  titre: string;
  resultats: Resultat[];
}) {
  return (
    <Section grille>
      <SectionHeading eyebrow="Ce que vous obtenez" title={titre} />
      <div className="mt-14 grid gap-x-14 gap-y-2 sm:grid-cols-2">
        {resultats.map((resultat, i) => (
          <Reveal key={resultat.titre} delay={i * 70}>
            <div className="group border-t-2 border-line py-7 transition-colors duration-500 hover:border-brand">
              <h3 className="flex items-start gap-3 font-display text-[1.05rem] font-semibold text-ink">
                {/* La puce est un anneau, pas un disque : c'est le motif du
                    logo, réduit à sa plus petite expression. */}
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-brand transition-colors duration-500 group-hover:bg-brand"
                />
                {resultat.titre}
              </h3>
              <p className="mt-2.5 pl-[1.4rem] text-[0.95rem] leading-[1.8] text-ink-muted">
                {resultat.texte}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Les étapes en RANGS, pas en cartes. Un rang plein cadre laisse la place au
 * titre à gauche et au livrable à droite, ce qui met les deux en regard. Quatre
 * cartes carrées côte à côte auraient dit la même chose en moins lisible.
 */
export function ProcessSteps({
  titre,
  etapes,
}: {
  titre: string;
  etapes: Etape[];
}) {
  return (
    <Section tone="creuse">
      <SectionHeading eyebrow="La méthode" title={titre} />
      <ol className="mt-14 border-t border-line-strong">
        {etapes.map((etape, i) => (
          <Reveal key={etape.numero} delay={i * 80}>
            <li className="group grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-3 border-b border-line py-8 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3 md:grid-cols-[5rem_1fr_1.1fr] md:gap-x-10">
              <span className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-brand md:pt-1.5">
                {String(etape.numero).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[1.3rem] leading-tight font-bold tracking-[-0.02em] text-ink">
                {etape.titre}
              </h3>
              <p className="col-start-2 text-[0.95rem] leading-[1.8] text-ink-muted md:col-start-3">
                {etape.livrable}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function CaseStudies({ cas }: { cas: EtudeDeCas[] }) {
  return (
    <Section grille>
      <SectionHeading
        eyebrow="Résultats"
        title="Ce que ça donne concrètement"
        subtitle="Le problème de départ, ce que nous avons fait, et ce qui a changé. Chaque chiffre vient avec sa période : un résultat sans sa fenêtre de temps ne prouve rien."
      />
      <div className="cas grille-filets mt-14 grid-cols-1 lg:grid-cols-3">
        {cas.map((etude, i) => (
          <Reveal key={etude.slug} delay={i * 90}>
            <article
              className="carte flex h-full flex-col bg-surface p-8"
              style={{ "--rang": i } as CSSProperties}
            >
              {/* Monogramme. Quand le client n'autorise pas à être nommé, un
                  cas anonymisé n'a pas d'initiales : le carré tombe alors, et
                  la carte reste bien composée sans lui. */}
              <div className="flex items-start gap-4">
                {etude.clientName ? (
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center border border-line bg-surface-raised font-display text-xs font-extrabold tracking-wider text-brand"
                  >
                    {monogramme(etude.clientName)}
                  </span>
                ) : null}
                <div>
                  <p className="font-display text-[0.95rem] leading-tight font-bold text-ink">
                    {etude.clientName ?? "Cas anonymisé"}
                  </p>
                  <p className="mt-1 text-[0.8rem] leading-snug text-ink-muted">
                    {etude.contexte}
                  </p>
                </div>
              </div>

              {/* Les deux chiffres en regard. Le premier porte un filet sous
                  lui, le second non : c'est ce léger déséquilibre qui dit
                  lequel des deux est le résultat principal. */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <ChiffreVivant
                    valeur={etude.chiffre.valeur}
                    className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none font-extrabold tracking-[-0.04em] text-brand"
                  />
                  {/* La jauge. Elle va toujours au bout : ce n'est pas une
                      proportion, nous n'avons pas de quoi en calculer une.
                      C'est le geste de la mesure, pas son résultat. */}
                  <div
                    aria-hidden="true"
                    className="mt-4 h-0.5 w-2/3 bg-line-strong/60"
                  >
                    <span className="cas-jauge block h-full origin-left bg-brand" />
                  </div>
                  <div className="mt-3 text-[0.82rem] leading-snug text-ink-muted">
                    {etude.chiffre.libelle}
                  </div>
                </div>
                {etude.chiffreSecondaire ? (
                  <div>
                    <ChiffreVivant
                      valeur={etude.chiffreSecondaire.valeur}
                      className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none font-extrabold tracking-[-0.04em] text-accent"
                    />
                    <div className="mt-6 text-[0.82rem] leading-snug text-ink-muted">
                      {etude.chiffreSecondaire.libelle}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* LA MENTION « EXEMPLE FICTIF » RESTE TANT QUE LES CAS NE SONT
                  PAS RÉELS. Le site est en ligne sur une adresse publique
                  pendant que le client compare les maquettes : les chiffres
                  doivent y être, pour qu'on juge la page à sa vraie densité,
                  mais rien ne doit se lire comme une performance affirmée.
                  C'est le même traitement que la V3, qui marque déjà chacun
                  de ses chiffres. Elle disparaît avec les vrais cas. */}
              <p className="mt-4 text-xs tracking-wide text-ink-muted">
                {etude.chiffre.periode}
                <span className="ml-2 text-ink-muted/70 italic">
                  exemple fictif
                </span>
              </p>

              {etude.temoignage ? (
                <figure className="mt-7 border-l-2 border-brand/40 pl-5">
                  <blockquote className="text-[0.92rem] leading-[1.8] text-ink italic">
                    « {etude.temoignage.citation} »
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-ink-muted">
                    {etude.temoignage.auteur}
                  </figcaption>
                </figure>
              ) : null}

              <p className="mt-auto pt-7 text-[0.92rem] leading-[1.8] text-ink-muted">
                {etude.changement}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* LA MENTION DE NON-GARANTIE, et elle est volontairement visible plutôt
          que reléguée en pied de page. Un prospect qui lit trois chiffres sans
          réserve les entend comme un engagement, et l'écart entre ce qu'il a
          compris et ce qu'il obtiendra se paie au troisième mois. La poser ici
          coûte une ligne et retire une objection. */}
      <p className="mt-10 flex max-w-2xl items-start gap-3 text-[0.85rem] leading-[1.7] text-ink-muted">
        <span
          aria-hidden="true"
          className="mt-2 h-px w-6 shrink-0 bg-line-strong"
        />
        Ce sont des situations réelles, pas une promesse. Aucun résultat
        n&apos;est garanti : chaque contexte est différent, et c&apos;est
        justement ce que le diagnostic sert à regarder.
      </p>
    </Section>
  );
}

/** Deux lettres au maximum, sinon le carré cesse d'être un carré. */
function monogramme(nom: string) {
  return nom
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot[0])
    .join("")
    .toUpperCase();
}

export function GoogleReviews() {
  return (
    <Section tone="creuse">
      <SectionHeading
        eyebrow="Avis vérifiés"
        title="Ce qu'en disent les clients"
        align="center"
      />

      {/* LA NOTE EST DEVENUE UNE IMAGE. Elle était composée en grand dans le
          titre, ce qui la rendait lisible mais pas visible : un chiffre au
          milieu d'une phrase se lit à la même vitesse que le reste. Cinq
          étoiles qui se remplissent se voient avant d'être lues, et c'est tout
          ce qu'on demande à une preuve sociale. */}
      <div className="mt-8 flex justify-center">
        <Etoiles note={noteGoogle} />
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-ink-muted">
        Sur {nombreAvis} avis Google vérifiés
      </p>

      <div className="grille-filets mt-14 grid-cols-1 md:grid-cols-3">
        {avis.map((a, i) => (
          <Reveal key={a.id} delay={i * 80}>
            <figure className="flex h-full flex-col bg-surface-raised p-8">
              <blockquote className="flex-1 text-[0.95rem] leading-[1.85] text-ink">
                « {a.extrait} »
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-wide text-ink-muted">
                {a.auteur}, {a.date}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      {lienFicheGoogle ? (
        <p className="mt-10 text-center">
          <a
            href={lienFicheGoogle}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm font-semibold text-brand underline underline-offset-4"
          >
            Lire les {nombreAvis} avis sur Google
          </a>
        </p>
      ) : null}
    </Section>
  );
}

export function PricingSlot() {
  return (
    <Section grille>
      <SectionHeading
        eyebrow="Tarifs"
        title="Combien ça coûte"
        align="center"
      />
      <div className="mx-auto mt-12 max-w-2xl">
        {tarifs.status === "pending" ? (
          <Card className="border-brand/25 text-center">
            <p className="text-[0.98rem] leading-[1.8] text-ink-muted">
              {tarifs.message}
            </p>
            <ButtonLink href="/contact" className="mt-8" withArrow>
              Réserver un diagnostic de 20 minutes
            </ButtonLink>
          </Card>
        ) : (
          <div className="grille-filets grid-cols-1 sm:grid-cols-2">
            {tarifs.offres.map((offre) => (
              <div key={offre.nom} className="carte bg-surface p-8">
                <h3 className="font-display text-[1.05rem] font-semibold text-ink">
                  {offre.nom}
                </h3>
                <p className="mt-3 font-display text-[2.4rem] leading-none font-extrabold tracking-[-0.04em] text-brand">
                  {offre.prix}
                </p>
                <p className="mt-2 text-xs text-ink-muted">{offre.precision}</p>
                <ul className="mt-7 space-y-3 text-sm leading-relaxed text-ink-muted">
                  {offre.inclus.map((ligne) => (
                    <li key={ligne} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-2 shrink-0 rounded-full border-2 border-brand"
                      />
                      {ligne}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export function WhyUs({
  titre,
  points,
}: {
  titre: string;
  points: Resultat[];
}) {
  return (
    <Section tone="creuse">
      <SectionHeading eyebrow="Pourquoi nous" title={titre} />
      <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
        {points.map((point, i) => (
          <Reveal key={point.titre} delay={i * 80}>
            <div>
              <span
                aria-hidden="true"
                className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-brand"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="filet mt-4 mb-6 w-16 bg-brand/30" />
              <h3 className="font-display text-[1.15rem] leading-snug font-bold text-ink">
                {point.titre}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-muted">
                {point.texte}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * FAQ en <details>/<summary> natif plutôt qu'un accordéon maison : zéro
 * JavaScript, clavier natif, accessibilité native, et le contenu reste dans le
 * HTML servi donc lisible par un moteur de recherche.
 *
 * L'icône est un `+` construit en CSS à partir de deux traits : la barre
 * verticale disparaît quand `<details>` est ouvert, ce qui la transforme en
 * `−`. Cet état est porté par le sélecteur natif `[open]`, donc l'accordéon
 * garde son animation sans une ligne de JavaScript.
 */
export function Faq({ questions }: { questions: QuestionFaq[] }) {
  return (
    <Section>
      {/* Deux colonnes plutôt qu'un bloc empilé. Une FAQ en pleine largeur de
          texte laisse la moitié droite de l'écran vide sur ordinateur, et
          c'est exactement le vide qui fait « gabarit ». Le titre tient la
          colonne de gauche, les questions occupent la droite. */}
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Questions"
          title="Ce qu'on nous demande souvent"
        />
        <div className="border-t border-line-strong">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group border-b border-line py-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.05rem] leading-snug font-semibold text-ink transition-colors duration-300 marker:content-none hover:text-brand">
                {item.question}
                <span
                  aria-hidden="true"
                  className="relative mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-brand group-open:border-brand"
                >
                  <span className="absolute h-px w-3 bg-brand" />
                  <span className="absolute h-3 w-px bg-brand transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:scale-y-0" />
                </span>
              </summary>
              <p className="mt-4 pr-12 text-[0.95rem] leading-[1.85] text-ink-muted">
                {item.reponse}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FinalCta({ titre, texte }: { titre: string; texte: string }) {
  return (
    <section className="sur-sombre relative isolate overflow-hidden bg-surface-invert py-24 text-ink-invert sm:py-32">
      <div
        aria-hidden="true"
        className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-10"
      />
      {/* L'anneau est centré derrière le titre : c'est le seul endroit du site
          où le motif du logo est frontal plutôt que coupé par un bord. */}
      <Anneaux className="top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 sm:size-[42rem]" />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Display as="h2" taille="grand" className="text-ink-invert">
            {titre}
          </Display>
          <p className="mx-auto mt-6 max-w-lg text-[1.02rem] leading-[1.8] text-ink-invert-muted">
            {texte}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="invert" withArrow>
              Réserver un diagnostic de 20 minutes
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
