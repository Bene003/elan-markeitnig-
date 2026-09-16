import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ButtonLink,
  Container,
  Display,
  Filigrane,
  Fort,
  Section,
  SectionHeading,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  CaseStudies,
  Faq,
  FinalCta,
  GoogleReviews,
} from "@/components/funnel";
import { Bandeau } from "@/components/scenes/bandeau";
import { FondCinema } from "@/components/scenes/fond-cinema";
import { Montee } from "@/components/scenes/montee";
import { Ecart } from "@/components/scenes/ecart";
import { Ancrage } from "@/components/scenes/ancrage";
import { Aiguillage } from "@/components/parcours/aiguillage";
import { constats, couts } from "@/content/constat";
import { etapesMethode } from "@/content/methode";
import { etudesDeCas } from "@/content/cas";
import { faqCommune } from "@/content/faq";
import { entreprise } from "@/content/entreprise";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function InterludeVideo({
  eyebrow,
  titre,
  texte,
  align = "left",
}: {
  eyebrow: string;
  titre: string;
  texte: string;
  align?: "left" | "right";
}) {
  const droite = align === "right";

  return (
    <section className={cn("interlude-video relative flex min-h-[64svh] items-end overflow-hidden py-16 text-ink-invert sm:py-20 lg:min-h-[76svh]", droite && "interlude-video-droite")}>
      <Container className={droite ? "flex justify-end" : ""}>
        <div className={cn("interlude-video-texte max-w-2xl", droite && "text-right")}>
          <p className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
            {eyebrow}
          </p>
          <Display as="h2" taille="grand" className="mt-6 font-light text-ink-invert">
            {titre}
          </Display>
          <p className={cn("mt-7 max-w-xl text-[1.05rem] leading-[1.75] text-ink-invert-muted", droite && "ml-auto")}>
            {texte}
          </p>
        </div>
      </Container>
    </section>
  );
}

/**
 * L'accueil est COURT : c'est un aiguillage, pas un tunnel. Le tunnel complet
 * est sur /entreprises et /particuliers.
 *
 * Contraintes qui pèsent sur cette page en particulier :
 *  - c'est la seule page soumise au seuil de performance de l'art. 20 ;
 *  - c'est la page la plus visitée, donc celle dont le caractère statique
 *    porte la capacité de charge. Aucun `cookies()`, aucun `headers()`,
 *    aucun `fetch` non mis en cache ici. Jamais.
 *  - zéro tiers : pas d'iframe, pas de carte, pas de widget d'avis.
 *
 * Tout le décor de cette page est en CSS pur : anneaux en `border-radius`,
 * fond gravé en `linear-gradient`, bandeau défilant en `transform`. Aucune
 * bibliothèque d'animation n'entre dans le paquet de l'accueil. Les scènes
 * coûteuses vivent sur /entreprises et /particuliers, que l'art. 20 ne soumet
 * pas au seuil de performance.
 */
export default function Accueil() {
  return (
    <>
      <div aria-hidden="true" className="video-parcours fixed inset-0 z-0">
        <FondCinema className="video-parcours-media" />
        <div className="video-parcours-voile absolute inset-0" />
      </div>

      <div className="elan-accueil relative z-10">
      {/* ------------------------------------------------------------------
          HERO. UNE SEULE COMPOSITION QUI OCCUPE LA FENÊTRE, et pas un bloc
          centré posé sur un aplat. Ce qui change par rapport à un hero par
          défaut tient en trois décisions :

            - le texte est ANCRÉ À GAUCHE. Un bloc centré occupe tout et ne
              laisse aucune place à une image ; ancré à gauche, il libère la
              moitié droite pour le sujet, et c'est cette asymétrie qui fait
              que la fenêtre se lit comme un plan et non comme un formulaire ;
            - le sujet de droite est INTERCHANGEABLE. Aujourd'hui le filigrane,
              demain le plan vidéo : le voile et la mise en page sont les
              mêmes, seul le calque du fond change ;
            - la bande de réassurance descend DANS le fondu du bas, sans filet
              de séparation. Le filet en faisait un second bloc ; le fondu en
              fait le pied de la même image.

          L'art. 3 exige que les deux boutons soient visibles sans défilement,
          y compris sur un Android de 360x640. Avec un en-tête de 64 px il
          reste 576 px : d'où les paddings compacts en mobile, qui ne
          s'ouvrent qu'à partir de `sm`. La hauteur pleine n'est donc imposée
          qu'à partir de `lg` : sur un petit écran, forcer la fenêtre entière
          pousserait la bande de réassurance sous les boutons et mangerait
          précisément les pixels que l'article réserve. Ce n'est pas un réglage
          esthétique, c'est un budget de mise en page.
          ------------------------------------------------------------------ */}
      <section className="sur-sombre scene-cinema relative isolate flex flex-col overflow-hidden bg-transparent text-ink-invert lg:min-h-[calc(100svh-4rem)]">
        {/* La vidéo reste la matière principale du hero, mais elle est montée
            comme un volume à droite plutôt que diluée derrière tout le texte.
            Les plans transparents et le reflet créent le relief sans ajouter
            d'image ni de dépendance lourde. */}
        <div
          aria-hidden="true"
          className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-20"
        />

        {/* Le symbole d'Élan, en très grand, débordant à droite. C'est le
            SUPPLÉANT du plan vidéo, pas son compagnon : il tient la moitié
            droite quand la vidéo est absente, et il s'efface dès qu'elle est
            là (voir `.scene-cinema:has(video)` dans globals.css). Deux sujets
            superposés au même endroit ne font pas une image deux fois plus
            riche, ils font une bouillie.

            Il n'est présent que sur grand écran : en mobile il coûterait de
            la place aux deux boutons, et son fichier n'y est même pas
            téléchargé. */}
        <Filigrane className="filigrane-hero top-[-4%] right-[-14%] hidden size-[58rem] lg:block" />

        {/* Le voile passe APRÈS le filigrane et la grille, donc au-dessus
            d'eux, et sous le texte. C'est ce qui rend la colonne de gauche
            lisible quel que soit le sujet du fond. */}
        <div
          aria-hidden="true"
          className="voile-cinema pointer-events-none absolute inset-0 -z-10"
        />

        {/* L'AXE. Un filet vertical qui ne sépare rien : il donne à la moitié
            droite une verticale à laquelle la légende ci-dessous vient
            s'accrocher, et il s'arrête exactement sur l'arête du sol. Sans lui
            la légende flotterait ; avec lui elle pend d'un montant. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[8%] left-[62%] hidden h-[58%] w-px bg-gradient-to-b from-transparent via-accent/25 to-brand/30 lg:block"
        />

        {/* BUDGET DE MISE EN PAGE DE L'ARTICLE 3.
            Sur un Android de 360x640, il reste 576 px sous l'en-tête, et les
            DEUX boutons doivent y tenir. Chaque valeur `sm:` ci-dessous est
            donc l'ouverture d'un ressort comprimé en mobile, jamais l'inverse :
            on compose d'abord pour 576 px, on respire ensuite. C'est un
            critère opposable, pas un réglage esthétique. */}
        <Container className="flex flex-1 flex-col justify-center py-7 sm:py-20 lg:justify-start lg:pt-8 lg:pb-0">
          {/* `cinema-entre` échelonne ses ENFANTS DIRECTS dans l'ordre du
              document. D'où ce conteneur qui n'a que cinq enfants, dans
              l'ordre exact où on veut les voir arriver : ajouter un bloc ici,
              c'est l'inscrire dans la cascade sans toucher au CSS. */}
          <div className="cinema-entre max-w-[46rem] lg:max-w-[39rem] xl:max-w-[42rem]">
            {/* SURTITRE NUMÉROTÉ. Le `01` n'est pas un ornement : il annonce
                que la page est une séquence, et il rend le `02` de la légende
                de droite lisible comme un repère du même système plutôt que
                comme un chiffre égaré. Le filet le rattache au bord gauche de
                la colonne ; sans lui, le surtitre flotte comme une étiquette
                collée. */}
            <p className="flex items-center gap-3.5 text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
              <span className="font-display tabular-nums">01</span>
              <span className="h-px w-8 bg-accent/50" />
              <span className="text-ink-invert-muted">
                Agence de croissance, Montréal
              </span>
            </p>

            {/* LE TITRE SE LIT SUR TROIS REGISTRES DE GRAISSE, et c'est la
                graisse qui porte la hiérarchie, pas la couleur : maigre clair,
                maigre éteint, puis gras. Le poids de l'œil tombe donc sur les
                deux mots qui portent la promesse, et il y tombe encore en
                niveaux de gris, ce qu'un simple changement de teinte ne tient
                pas. La coupe en trois lignes est écrite à la main parce que
                c'est une décision de composition : laissée au navigateur, elle
                changerait à chaque largeur.

                LE `leading-[0.96]` EST OBLIGATOIRE ICI, et ce n'est pas un
                doublon de `Display`. Dès qu'on passe une taille arbitraire en
                `className`, tailwind-merge considère qu'elle remplace tout le
                groupe de la taille de texte et JETTE l'interligne posé par
                `displayTailles`. Sans cette classe, le titre retombe
                silencieusement sur 1,5 et gagne cent vingt pixels de hauteur,
                ce qui pousse les deux boutons de l'art. 3 sous la ligne de
                flottaison en mobile. Le symptôme est une non-conformité, la
                cause est une classe absorbée. */}
            <Display
              as="h1"
              taille="geant"
              className="mt-7 text-[clamp(2.05rem,6.4vw,4.4rem)] leading-[0.96] font-light text-ink-invert sm:mt-9"
            >
              <span className="block">Votre croissance</span>
              <span className="block text-ink-invert-muted">
                ne devrait pas dépendre
              </span>
              <span className="block font-extrabold text-accent">du mois</span>
            </Display>

            <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.75] text-ink-invert-muted sm:mt-8 sm:text-[1.05rem] sm:leading-[1.8]">
              Elan Marketing structure le développement des entreprises et des
              porteurs de projet. <Fort tone="sombre">Vingt minutes</Fort> pour
              savoir ce qui bloque.
            </p>

            {/* Les deux boutons de l'art. 3. Deux vrais liens vers deux vraies
                pages : le choix se mémorise en arrivant, pas en cliquant. */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-11 sm:w-auto sm:flex-row lg:mt-8">
              <ButtonLink href="/entreprises" variant="invert" withArrow>
                Je suis une entreprise
              </ButtonLink>
              <ButtonLink
                href="/particuliers"
                withArrow
                className="border-invert-line bg-transparent text-ink-invert hover:border-accent hover:bg-transparent hover:text-accent"
              >
                Je suis un particulier
              </ButtonLink>
            </div>
          </div>
        </Container>

        <div className="cinema-bande relative z-10 mt-8 lg:absolute lg:right-0 lg:bottom-[max(3.4rem,6vh)] lg:left-0 lg:mt-0">
          <Bandeau variant="hero" />
        </div>
      </section>

      <div className="premier-emboitement relative z-20">

      {/* ------------------------------------------------------------------
          ACTE 1, LE CONSTAT. Commun aux deux clientèles, et c'est tout son
          intérêt : l'accueil bifurque plus bas, et une bifurcation posée trop
          tôt demande au visiteur de se classer avant de savoir de quoi on
          parle. On dit donc d'abord ce qui est vrai des deux côtés.

          La scène de la montée est à droite du constat, pas en pleine largeur
          sous lui : les trois phrases et la figure disent la même chose, et
          les mettre en regard est ce qui fait qu'on lit l'une par l'autre.
          ------------------------------------------------------------------ */}
      <Section id="constat" grille>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <div className="reveal-apres-hero-entete">
              <SectionHeading
                eyebrow="Le constat"
                title={
                  <>
                    La croissance n&apos;est pas un problème{" "}
                    <em className="text-brand italic">d&apos;effort</em>
                  </>
                }
                subtitle="Voici ce que nous entendons presque à chaque premier rendez-vous, chez une entreprise comme chez un porteur de projet."
              />
            </div>

            <ul className="reveal-apres-hero-liste mt-12 border-t border-line-strong">
              {constats.map((constat) => (
                <li
                  key={constat.numero}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-2"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-brand/50 transition-colors duration-500 group-hover:text-brand"
                  >
                    {constat.numero}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.1rem] leading-snug font-semibold text-ink">
                      {constat.titre}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-[1.75] text-ink-muted">
                      {constat.texte}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Montee />
        </div>
      </Section>
      </div>

      <InterludeVideo
        eyebrow="Prendre de la hauteur"
        titre="Ce qui freine votre croissance devient enfin visible."
        texte="Avant d'ajouter une nouvelle action, nous identifions le point qui désorganise le reste."
        align="right"
      />

      {/* ------------------------------------------------------------------
          ACTE 1 BIS, L'IMPACT. Le constat dit ce que le visiteur observe ;
          cette section dit ce que ça lui coûte. Un symptôme se reconnaît, un
          coût se ressent, et c'est le coût qui fait réserver un rendez-vous.

          La composition est volontairement l'INVERSE de celle du constat :
          là-haut, texte à gauche et figure à droite ; ici, figure en pleine
          largeur et quatre mots dessous. Deux sections de suite dans la même
          grille, et l'œil arrête de les distinguer.

          Aucun chiffre dans ce bloc. Nous n'avons pas les données d'Élan, et
          un pourcentage inventé se retourne contre nous au premier rendez-vous
          d'un prospect. La figure dit l'ampleur par sa forme, et sa légende
          écrit noir sur blanc que ce n'est pas une promesse.
          ------------------------------------------------------------------ */}
      <Section id="impact" tone="creuse">
        <SectionHeading
          eyebrow="L'impact"
          title={
            <>
              Le problème n&apos;est pas un mois raté.{" "}
              <em className="text-brand italic">C&apos;est l&apos;année</em>
            </>
          }
          subtitle="Un écart de quelques points par mois ne se voit pas. Au bout de douze, il est devenu la distance entre deux entreprises."
        />

        <Ecart className="mt-16" />

        {/* Un mot en grand, une ligne dessous. Personne ne lit un paragraphe
            à cet endroit : le mot se retient, la phrase se survole. */}
        <ul className="grille-filets mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {couts.map((cout) => (
            <li
              key={cout.cle}
              className="group bg-surface-raised p-8 transition-colors duration-500 hover:bg-surface"
            >
              <p className="font-display text-[clamp(1.6rem,2.4vw,2.05rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-ink">
                {cout.mot}
              </p>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-8 bg-brand/40 transition-all duration-500 group-hover:w-16 group-hover:bg-brand"
              />
              <p className="mt-5 text-[0.9rem] leading-[1.7] text-ink-muted">
                {cout.texte}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <InterludeVideo
        eyebrow="Un cap commun"
        titre="La croissance ne repose plus sur une intuition du moment."
        texte="Chaque décision est reliée à un objectif clair, mesurable et partagé par les personnes qui la portent."
      />

      {/* ------------------------------------------------------------------
          MÉTHODE. Les étapes sont numérotées en très grand et en très pâle :
          le numéro devient une texture de fond plutôt qu'une information, ce
          qui donne l'échelle sans ajouter de bruit.
          ------------------------------------------------------------------ */}
      <Section id="methode" grille>
        <SectionHeading
          eyebrow="Méthode"
          title="Comment on avance"
          subtitle="Cinq étapes, et surtout ce qui se passe après le premier rendez-vous."
        />

        {/* LA SECTION EST SA PROPRE SCÈNE : UNE FLÈCHE QUI DESCEND.

            La méthode est une progression dans le temps, et le défilement est
            déjà une progression dans le temps. Les faire coïncider est le
            geste le plus court : la flèche avance exactement au rythme où le
            visiteur descend, et chaque étape se découvre au moment où la
            pointe l'atteint. Il ne lit pas cinq étapes, il les parcourt.

            La flèche est en trois pièces : un rail pâle qui montre le chemin
            restant, une tige verte qui grandit, et une pointe qui la suit vers
            le bas. La pointe est le seul élément mobile, tout le reste est un
            `scaleY` sur le fil de composition.

            Mécanisme habituel : chronologie `view()` nommée sur le parent
            `.methode`, plages échelonnées par `--rang`, état au repos déjà
            final. Voir globals.css. */}
        <ol className="methode relative mt-16 pl-12 sm:pl-16">
          {/* LA PISTE. Elle donne sa hauteur à tout le reste, et c'est ce qui
              permet de faire descendre la pointe sans connaître cette hauteur :
              le calque de la pointe fait exactement la taille de la piste, donc
              `translateY(-100%)` le remonte d'une piste entière, pile. Une
              distance en pourcentage plutôt qu'en pixels, donc juste quel que
              soit le nombre d'étapes et la longueur des textes. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-0 left-[7px] w-0.5 sm:left-[10px]"
          >
            <span className="absolute inset-0 bg-line-strong" />
            <span className="methode-tige absolute inset-0 origin-top bg-brand" />
            {/* La pointe donne le sens de lecture : sans elle, le trait
                pourrait aussi bien monter. */}
            <span className="methode-pointe absolute inset-0">
              <span className="absolute bottom-0 left-1/2 size-0 -translate-x-1/2 translate-y-1/2 border-x-[6px] border-t-[9px] border-x-transparent border-t-brand" />
            </span>
          </span>

          {etapesMethode.map((etape, i) => (
            <li
              key={etape.numero}
              className="group relative pb-12"
              style={{ "--rang": i } as React.CSSProperties}
            >
              {/* Le jalon est en dehors du flux du texte, sur le rail. */}
              <span
                aria-hidden="true"
                className="methode-jalon absolute top-1 -left-12 size-4 rounded-full border-2 border-brand bg-surface transition-colors duration-500 group-hover:bg-brand sm:-left-16 sm:size-[1.375rem]"
              />
              <div className="methode-texte flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span
                  aria-hidden="true"
                  className="font-display text-[1.6rem] leading-none font-extrabold tracking-[-0.05em] text-brand/25 transition-colors duration-500 group-hover:text-brand/50 sm:text-[2.4rem]"
                >
                  {etape.numero}
                </span>
                <div>
                  <h3 className="font-display text-[1.15rem] leading-snug font-bold text-ink sm:text-[1.45rem]">
                    <span className="sr-only">Étape {etape.numero} : </span>
                    {etape.titre}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9rem] leading-[1.75] text-ink-muted">
                    {etape.livrable}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/methode"
          className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand"
        >
          Voir la méthode en détail
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Section>

      <InterludeVideo
        eyebrow="Une croissance construite"
        titre="Chaque action trouve sa place dans un système qui avance."
        texte="Positionnement, acquisition et opérations cessent de se répondre au hasard : ils travaillent dans la même direction."
        align="right"
      />

      {/* ------------------------------------------------------------------
          ACTE 2, L'AIGUILLAGE. C'est le pivot de la page, et il est sur bande
          sombre pour ça : la même couleur que le hero et que l'appel final,
          donc les trois moments qui comptent se répondent.

          Le visiteur choisit, et le tunnel se joue dans son parcours sans
          quitter la page. Zéro JavaScript : voir aiguillage.tsx.
          ------------------------------------------------------------------ */}
      <Aiguillage />

      <InterludeVideo
        eyebrow="Le bon parcours"
        titre="Une direction adaptée à votre réalité, pas une recette toute faite."
        texte="Entreprise établie ou projet en construction : le point de départ change, l'exigence reste la même."
      />

      {/* ------------------------------------------------------------------
          RÉSULTATS. Les études de cas et les avis Google viennent du tunnel :
          ce sont exactement les mêmes composants que sur /entreprises et
          /particuliers, alimentés par les mêmes fichiers de contenu. Quand
          Yliès livre ses trois cas, ils apparaissent aux quatre endroits d'un
          coup.
          ------------------------------------------------------------------ */}
      <div id="resultats" className="resultats-emboites bg-surface-raised">
        <CaseStudies cas={etudesDeCas} />
        <GoogleReviews />
        <Container>
          <Link
            href="/resultats"
            className="group inline-flex items-center gap-2 pb-20 text-sm font-semibold text-brand sm:pb-24"
          >
            Voir tous les résultats
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Container>
      </div>

      <section
        aria-hidden="true"
        className="interlude-video-silence relative min-h-[40svh] sm:min-h-[52svh]"
      />

      {/* ------------------------------------------------------------------
          À PROPOS, en version courte. La page /a-propos garde l'histoire,
          l'équipe et les valeurs : ici on ne garde que ce qui pèse dans une
          décision d'achat, à savoir qu'il y a une personne nommée, joignable,
          à une adresse réelle. C'est le procédé de réassurance de la
          référence, et il ne coûte rien.
          ------------------------------------------------------------------ */}
      <Section id="a-propos" tone="creuse" className="section-emboitee-simple">
        {/* Colonnes inégales et coordonnées alignées en bas. À colonnes
            égales, le titre se cassait sur six lignes pendant que les quatre
            coordonnées flottaient en haut d'un vide : deux blocs côte à côte
            qui ne se regardaient pas. */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="À propos"
              title="Une agence proche, disponible quand il faut avancer"
              subtitle="Elan Marketing accompagne les entreprises et les porteurs de projet du Québec. Les rencontres peuvent se faire en personne, avec une équipe qui connaît votre dossier."
            />
            <Ancrage
              ville={entreprise.adresse.ville}
              rue={entreprise.adresse.rue}
              className="mt-14"
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

        <Link
          href="/a-propos"
          className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand"
        >
          Notre histoire et nos valeurs
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Section>

      <Section id="equipe" grille className="section-emboitee-simple">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="L'équipe Élan"
              title={
                <>
                  Des personnes impliquées, pas une{" "}
                  <em className="text-brand italic">boîte noire</em>
                </>
              }
              subtitle="Derrière chaque recommandation, il y a une équipe qui écoute, clarifie et reste présente lorsque les décisions doivent devenir des actions."
            />

            <ul className="mt-12 border-t border-line-strong">
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

      <Faq questions={faqCommune} />

      <div id="contact">
        <FinalCta
          titre="Vingt minutes pour savoir où ça bloque"
          texte="Réservez un diagnostic. Nous regardons votre situation et nous vous disons ce qui aurait le plus d'effet dans les trois prochains mois."
        />
      </div>
      <section aria-hidden="true" className="finale-video-space relative min-h-[42svh]" />
      </div>
    </>
  );
}
