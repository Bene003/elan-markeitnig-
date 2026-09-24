import type { Metadata } from "next";
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
import { FinalCta } from "@/components/funnel";
import { Bandeau } from "@/components/scenes/bandeau";
import { FondCinema } from "@/components/scenes/fond-cinema";
import { Montee } from "@/components/scenes/montee";
import { Aiguillage } from "@/components/parcours/aiguillage";
import { constats } from "@/content/constat";

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
 * L'ACCUEIL EST UNE ENTRÉE, PAS UN SOMMAIRE DU SITE.
 *
 * Il a longtemps porté le récit complet, et la barre de navigation s'y
 * déplaçait par ancres. Ce modèle se tenait tant que l'accueil était le seul
 * endroit où le contenu existait vraiment. Il ne l'est plus : les cinq pages
 * internes sont écrites, et l'accueil redisait ce qu'elles disent déjà, en
 * plus court. Un visiteur qui cliquait « Méthode » puis « Voir la méthode en
 * détail » lisait la même chose deux fois, la seconde en mieux.
 *
 * Il ne reste donc que ce qu'aucune autre page ne peut porter :
 *
 *   1. LE HERO et les deux boutons de l'art. 3 ;
 *   2. LE CONSTAT, vrai des deux clientèles, qui est la seule chose qu'on
 *      puisse dire avant de savoir à qui l'on parle ;
 *   3. L'AIGUILLAGE, qui est le seul endroit du site où le visiteur se range
 *      d'un côté ou de l'autre, et d'où partent les deux parcours ;
 *   4. L'APPEL FINAL.
 *
 * Ce qui a été retiré n'a pas été supprimé, il a rejoint sa page : l'impact et
 * ses quatre coûts ouvrent /services, les coordonnées et le bloc équipe
 * sont sur /a-propos, la méthode, les résultats et la FAQ étaient déjà en
 * entier sur /methode, /resultats et /contact.
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
      {/* `lg:pb-[8.9rem]` = les 5,5rem dont la section suivante remonte, plus
          l'espace qui séparait déjà la bande du bas de l'écran. C'est la
          réserve dans laquelle l'emboîtement vient mordre, et c'est ce qui
          garde la bande entièrement visible. */}
      <section className="sur-sombre scene-cinema relative isolate flex flex-col overflow-hidden bg-transparent text-ink-invert lg:min-h-[calc(100svh-4rem)] lg:pb-[8.9rem]">
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
                Agence commerciale et de croissance
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

        {/* LA BANDE EST DANS LE FLUX DU HERO, PAS POSÉE DESSUS.

            Elle était en `absolute` calée sur le bas de la section. Le hero
            faisait donc sa hauteur sans elle, et la section suivante, qui
            remonte de 5,5rem pour s'emboîter dans ce bas, passait devant :
            mesuré à 1440x900, elle en recouvrait les 34 derniers pixels, et
            l'emboîtement la mangeait un peu plus à chaque pixel défilé.

            Remise dans le flux, elle fait partie de la hauteur du hero et rien
            ne peut plus la recouvrir. `mt-auto` la colle au bas de la colonne
            flex, donc la composition ne bouge pas ; la réserve sous elle est
            le `pb` de la section, dimensionné pour absorber l'emboîtement. */}
        <div className="cinema-bande relative z-10 mt-8 lg:mt-auto">
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
          ACTE 2, L'AIGUILLAGE. C'est le pivot de la page, et il est sur bande
          sombre pour ça : la même couleur que le hero et que l'appel final,
          donc les trois moments qui comptent se répondent.

          C'est aussi le seul endroit du site où le visiteur se range d'un côté
          ou de l'autre, et c'est pour ça qu'il reste sur l'accueil quand tout
          le reste est parti sur sa page : il n'appartient à aucune des cinq.

          Le visiteur choisit, et le panneau se joue dans son parcours sans
          quitter la page. Zéro JavaScript : voir aiguillage.tsx.
          ------------------------------------------------------------------ */}
      <Aiguillage />

      <FinalCta
        titre="Vingt minutes pour savoir où ça bloque"
        texte="Réservez un diagnostic. Nous regardons votre situation et nous vous disons ce qui aurait le plus d'effet dans les trois prochains mois."
      />
      <section aria-hidden="true" className="finale-video-space relative min-h-[42svh]" />
      </div>
    </>
  );
}
