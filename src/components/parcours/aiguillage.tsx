import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Container, Display, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { contenuParcours } from "@/content/parcours";
import { servicesParParcours } from "@/content/services";
import { parcoursHref, type Parcours } from "@/lib/parcours";

/**
 * L'AIGUILLAGE DE L'ACCUEIL.
 *
 * Le récit de la page est commun jusqu'ici : le constat, puis la méthode. À ce
 * point seulement, le visiteur en sait assez pour se ranger d'un côté ou de
 * l'autre, et le tunnel se joue dans le parcours qu'il a choisi, sans quitter
 * la page.
 *
 * COMPOSANT SERVEUR, ZÉRO JAVASCRIPT. Le choix est un vrai groupe de boutons
 * radio, masqué visuellement mais focusable, et le CSS de globals.css montre le
 * panneau correspondant. Le raisonnement complet est écrit là-bas ; l'essentiel
 * ici est la CONTRAINTE DE STRUCTURE qu'il impose : les sélecteurs utilisent le
 * combinateur `~`, donc les deux `<input>` doivent rester des FRÈRES de
 * `.aiguillage-bascule` et de `.aiguillage-panneaux`. Insérer un div
 * enveloppant entre les trois casse le basculement sans casser le build.
 *
 * Ce n'est pas le mécanisme de l'article 3. L'art. 3 demande deux boutons
 * visibles sans défilement, un choix mémorisé et changeable depuis la
 * navigation : ce sont les deux boutons du hero, le sélecteur de l'en-tête et
 * le cookie. Cet aiguillage-ci est un confort de lecture qui s'ajoute, et
 * chaque panneau se termine par un lien vers la page complète du parcours,
 * pour que rien ne dépende de lui.
 */
export function Aiguillage() {
  return (
    <section
      id="services"
      /* `overflow-clip` ET SURTOUT PAS `overflow-hidden`. En CSS, `hidden` fait
         de l'élément un CONTENEUR DE DÉFILEMENT, et une chronologie `view()`
         se rattache toujours au conteneur de défilement le plus proche. Toutes
         les animations de défilement de la section se seraient donc mesurées
         contre cette section, qui ne défile jamais : chronologies figées,
         aucune animation. `clip` coupe exactement pareil sans créer de
         conteneur, et la chronologie remonte au document. */
      className="sur-sombre relative isolate overflow-clip bg-surface-invert py-20 text-ink-invert sm:py-28"
    >
      <div
        aria-hidden="true"
        className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-10"
      />

      <Container>
        {/* Le bloc de titre porte sa propre chronologie de défilement, et ses
            trois lignes se posent l'une après l'autre. Voir `.aiguillage-tete`
            dans globals.css. */}
        <div className="aiguillage-tete max-w-3xl">
          <div className="tete-ligne" style={{ "--rang": 0 } as CSSProperties}>
            <Eyebrow tone="sombre">Services</Eyebrow>
          </div>
          <div className="tete-ligne" style={{ "--rang": 1 } as CSSProperties}>
            <Display as="h2" taille="grand" className="mt-6 text-ink-invert">
              À partir d&apos;ici,{" "}
              <em className="text-accent italic">ça dépend de vous</em>
            </Display>
          </div>
          <p
            className="tete-ligne mt-6 max-w-xl text-[1.05rem] leading-[1.8] text-ink-invert-muted"
            style={{ "--rang": 2 } as CSSProperties}
          >
            Les besoins d&apos;une entreprise et ceux d&apos;un particulier ne
            se ressemblent pas, et nous ne les traitons pas de la même façon.
            Choisissez votre côté, et la suite de la page s&apos;adapte.
          </p>
        </div>

        <fieldset className="mt-12">
          <legend className="sr-only">Choisissez votre parcours</legend>

          {/* Les deux radios, la bascule et les panneaux sont FRÈRES. Voir le
              bloc `.aiguillage-*` de globals.css : c'est ce qui permet au CSS
              seul de faire le travail d'un composant client. */}
          <input
            type="radio"
            name="aiguillage"
            id="aiguillage-entreprise"
            className="aiguillage-e sr-only"
            defaultChecked
          />
          <input
            type="radio"
            name="aiguillage"
            id="aiguillage-particulier"
            className="aiguillage-p sr-only"
          />

          {/* La bascule. Le curseur est un calque sous les deux étiquettes qui
              glisse d'une moitié à l'autre : c'est un `transform`, donc une
              composition, jamais un repeint. */}
          <div className="aiguillage-bascule relative grid w-full max-w-lg grid-cols-2 border border-invert-line bg-invert-raised p-1">
            <span
              aria-hidden="true"
              className="aiguillage-curseur pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] bg-accent"
            />
            {/* Les deux étiquettes arrivent de bords opposés et se rejoignent
                dans le cadre : c'est le seul geste convergent de la page, et
                c'est le seul endroit où l'on demande de choisir entre deux
                directions au lieu d'avancer dans une. */}
            <label
              htmlFor="aiguillage-entreprise"
              className="aiguillage-onglet aiguillage-onglet-e bascule-onglet-e relative z-10 flex min-h-11 cursor-pointer items-center justify-center px-4 text-center text-[0.85rem] font-semibold text-ink-invert-muted transition-colors duration-300"
            >
              Je suis une entreprise
            </label>
            <label
              htmlFor="aiguillage-particulier"
              className="aiguillage-onglet aiguillage-onglet-p bascule-onglet-p relative z-10 flex min-h-11 cursor-pointer items-center justify-center px-4 text-center text-[0.85rem] font-semibold text-ink-invert-muted transition-colors duration-300"
            >
              Je suis un particulier
            </label>
          </div>

          <div className="aiguillage-panneaux mt-14">
            <div className="aiguillage-panneau aiguillage-panneau-e">
              <AnimationParcours parcours="entreprise" />
            </div>
            <div className="aiguillage-panneau aiguillage-panneau-p">
              <AnimationParcours parcours="particulier" />
            </div>
          </div>
        </fieldset>
      </Container>
    </section>
  );
}

function AnimationParcours({ parcours }: { parcours: Parcours }) {
  const entreprise = parcours === "entreprise";

  return (
    <div className="parcours-animation grid items-center gap-12 border-y border-invert-line py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1.1fr)] lg:gap-20 lg:py-14">
      <div
        aria-hidden="true"
        className={cn(
          "parcours-animation-figure relative mx-auto aspect-square w-full max-w-[28rem] overflow-hidden border border-invert-line bg-invert-raised",
          entreprise ? "parcours-animation-entreprise" : "parcours-animation-particulier",
        )}
      >
        {entreprise ? (
          <SceneEntrepriseClair />
        ) : (
          <SceneParticulierClair />
        )}
      </div>

      <div className="max-w-xl">
        <p className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
          {entreprise ? "Pour les entreprises" : "Pour les particuliers"}
        </p>
        <Display as="h3" taille="moyen" className="mt-5 text-ink-invert">
          {entreprise
            ? "Passer d'actions dispersées à une croissance qui tient."
            : "Trouver un cap clair et transformer l'élan en action."}
        </Display>
        <p className="mt-6 text-[1rem] leading-[1.8] text-ink-invert-muted">
          {entreprise
            ? "Nous relions votre positionnement, votre acquisition et vos opérations dans une même structure."
            : "Nous clarifions votre direction, vos priorités et la prochaine décision qui vous fait avancer."}
        </p>
        <ButtonLink href={parcoursHref[parcours]} variant="invert" withArrow className="mt-8">
          {entreprise ? "Découvrir le parcours entreprise" : "Découvrir le parcours particulier"}
        </ButtonLink>
      </div>
    </div>
  );
}

function SceneEntrepriseClair() {
  return (
    <svg aria-hidden="true" className="scene-entreprise-clair size-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="entre-systeme-clair" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#B6D8A9" stopOpacity="0.95" />
          <stop offset="1" stopColor="#6AA05C" stopOpacity="0.7" />
        </linearGradient>
        <filter id="entre-lueur-clair" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <path className="scene-entreprise-clair-grille" d="M40 90H460M40 170H460M40 250H460M40 330H460M40 410H460M72 54V446M164 54V446M256 54V446M348 54V446M440 54V446" />
      <text className="scene-entreprise-clair-titre" x="58" y="78">LES LEVIERS</text>
      <text className="scene-entreprise-clair-titre" x="326" y="78">LA CROISSANCE</text>
      <g className="scene-entreprise-clair-source source-positionnement"><rect x="56" y="118" width="110" height="46" rx="8" /><text x="72" y="146">POSITIONNEMENT</text></g>
      <g className="scene-entreprise-clair-source source-acquisition"><rect x="56" y="218" width="110" height="46" rx="8" /><text x="72" y="246">ACQUISITION</text></g>
      <g className="scene-entreprise-clair-source source-operations"><rect x="56" y="318" width="110" height="46" rx="8" /><text x="72" y="346">OPÉRATIONS</text></g>
      <path className="scene-entreprise-clair-route route-positionnement" d="M166 141H204L220 196" />
      <path className="scene-entreprise-clair-route route-acquisition" d="M166 241H220" />
      <path className="scene-entreprise-clair-route route-operations" d="M166 341H204L220 286" />
      <path className="scene-entreprise-clair-route route-sortie" d="M280 241H326" />
      <circle className="scene-entreprise-clair-halo" cx="250" cy="241" r="70" fill="#B6D8A9" filter="url(#entre-lueur-clair)" />
      <g className="scene-entreprise-clair-systeme"><rect x="220" y="191" width="60" height="100" rx="12" fill="url(#entre-systeme-clair)" /><path d="M236 222H264M236 241H264M236 260H254" /><text x="250" y="309">SYSTÈME</text></g>
      <circle className="scene-entreprise-clair-coeur" cx="250" cy="241" r="6" />
      <g className="scene-entreprise-clair-barres"><rect className="barre-un" x="336" y="318" width="23" height="68" rx="3" /><rect className="barre-deux" x="372" y="275" width="23" height="111" rx="3" /><rect className="barre-trois" x="408" y="220" width="23" height="166" rx="3" /><path d="M326 386H442" /><path className="scene-entreprise-clair-fleche" d="M335 306L380 262L419 207M405 207H419V221" /></g>
    </svg>
  );
}

function SceneParticulierClair() {
  return (
    <svg aria-hidden="true" className="scene-particulier-clair size-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="particuliers-lueur-clair" cx="50%" cy="50%"><stop stopColor="#B6D8A9" stopOpacity="0.5" /><stop offset="1" stopColor="#6AA05C" stopOpacity="0" /></radialGradient></defs>
      <circle className="scene-particulier-clair-halo" cx="252" cy="250" r="186" fill="url(#particuliers-lueur-clair)" />
      <path className="scene-particulier-clair-route route-secondaire" d="M65 352C120 352 120 228 208 228C298 228 310 126 441 126" />
      <path className="scene-particulier-clair-route route-principale" d="M65 352C120 352 120 278 188 278C252 278 266 200 334 200C372 200 393 151 441 126" />
      <text className="scene-particulier-clair-titre" x="60" y="84">UN CAP, TROIS DÉCISIONS</text>
      <g className="scene-particulier-clair-etape etape-un"><circle cx="116" cy="325" r="24" /><text x="116" y="330">01</text><text className="scene-particulier-clair-label" x="70" y="380">CLARIFIER</text></g>
      <g className="scene-particulier-clair-etape etape-deux"><circle cx="250" cy="238" r="24" /><text x="250" y="243">02</text><text className="scene-particulier-clair-label" x="196" y="292">POSITIONNER</text></g>
      <g className="scene-particulier-clair-etape etape-trois"><circle cx="370" cy="172" r="24" /><text x="370" y="177">03</text><text className="scene-particulier-clair-label" x="336" y="226">AGIR</text></g>
      <g className="scene-particulier-clair-cap"><circle cx="441" cy="126" r="27" /><path d="M441 107L452 126L441 145L430 126L441 107Z" /><text x="390" y="92">VOTRE CAP</text></g>
    </svg>
  );
}

/**
 * Un panneau. Les deux ont exactement la même structure, ce qui n'est pas
 * seulement une économie de code : à structures différentes, le passage d'un
 * onglet à l'autre ferait sauter la page d'une hauteur à l'autre, et le
 * visiteur perdrait sa place au moment précis où on lui demande de choisir.
 */
export function Panneau({ parcours }: { parcours: Parcours }) {
  const c = contenuParcours[parcours];
  const services = servicesParParcours(parcours);

  // LES DEUX PARCOURS NE BOUGENT PAS SUR LE MÊME AXE. Une entreprise cherche
  // un système qui tient : tout monte et s'empile. Un particulier cherche un
  // cap : tout vient de la gauche, derrière une flèche qui ouvre la voie. Le
  // raisonnement complet est dans globals.css.
  const estEntreprise = parcours === "entreprise";
  const anim = estEntreprise ? "colonne-e" : "colonne-p";

  return (
    <div>
      {/* La promesse ne monte pas comme les lignes qui suivent : elle se
          découvre au balayage, dans l'axe du parcours. Lui donner le geste des
          sept lignes en ferait la huitième au lieu du titre. */}
      <p
        className={cn(
          estEntreprise ? "promesse-e" : "promesse-p",
          "max-w-2xl font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.25] font-bold tracking-[-0.02em] text-ink-invert",
        )}
      >
        {c.promesse}
      </p>

      {/* Ce qui bloque à gauche, ce que ça donne à droite. Les deux colonnes
          sont volontairement en regard : c'est la lecture la plus courte du
          « avant » et du « après », et elle tient en un écran. */}
      {/* La gouttière s'ouvre sur `lg` pour loger la flèche : à `gap-x-14`,
          sa tête arrivait à quatre pixels de l'intitulé de droite. */}
      {/* La chronologie de défilement est posée ICI, sur le bloc des deux
          colonnes, et jamais sur chaque ligne : sept lignes de hauteurs
          différentes auraient chacune leur propre durée, et l'escalier se
          ferait en désordre. */}
      <div className="colonnes-bloc relative mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2 lg:gap-x-20">
        {/* LE CONNECTEUR DE GOUTTIÈRE, DIFFÉRENT D'UN PARCOURS À L'AUTRE.
            C'est le signe le plus visible du changement de monde quand on
            bascule d'un onglet à l'autre. */}
        {estEntreprise ? (
          // Une colonne vertébrale qui se trace du haut vers le bas : une
          // structure qu'on érige.
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-invert-line lg:block"
          >
            <span className="spine-e absolute inset-0 origin-top bg-accent/70" />
          </span>
        ) : (
          // Une flèche qui ouvre le passage de gauche à droite, à hauteur des
          // deux intitulés, avec le filet qui reprend dessous pour ne pas la
          // couper en croix.
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-1/2 hidden h-4 w-12 -translate-x-1/2 lg:block"
            >
              <span className="absolute inset-x-0 top-2 h-px bg-invert-line" />
              <span className="fleche-p-tige absolute inset-x-0 top-2 h-px origin-left bg-accent" />
              <span className="fleche-p-pointe absolute inset-0">
                <span className="absolute top-[5px] right-0 size-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-accent" />
              </span>
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-8 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-invert-line lg:block"
            />
          </>
        )}

        <div>
          <h3 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
            {c.douleursTitre}
          </h3>
          <ul className="mt-6 border-t border-invert-line">
            {c.douleurs.map((douleur, i) => (
              <li
                key={douleur.titre}
                style={{ "--rang": i } as CSSProperties}
                className={cn(
                  anim,
                  "group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-invert-line py-5 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-accent/60 transition-colors duration-500 group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-[1rem] leading-snug font-semibold text-ink-invert">
                    {douleur.titre}
                  </h4>
                  <p className="mt-2 text-[0.9rem] leading-[1.75] text-ink-invert-muted">
                    {douleur.texte}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
            {c.resultatsTitre}
          </h3>
          <ul className="mt-6 border-t border-invert-line">
            {c.resultats.map((resultat, i) => (
              // `--rang` REPREND OÙ LA COLONNE DE GAUCHE S'EST ARRÊTÉE, il ne
              // repart pas de zéro : ce qui bloque se pose d'abord, ce qu'on
              // obtient ensuite. Deux compteurs séparés feraient démarrer les
              // deux colonnes ensemble et l'ordre de lecture disparaîtrait.
              <li
                key={resultat.titre}
                style={{ "--rang": c.douleurs.length + i } as CSSProperties}
                className={cn(
                  anim,
                  "group flex items-start gap-3 border-b border-invert-line py-5 transition-[padding-left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-2",
                )}
              >
                {/* La puce est un anneau, le motif du logo réduit à sa plus
                    petite expression. Il se remplit au survol. */}
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-accent transition-colors duration-500 group-hover:bg-accent"
                />
                <div>
                  <h4 className="font-display text-[1rem] leading-snug font-semibold text-ink-invert">
                    {resultat.titre}
                  </h4>
                  <p className="mt-2 text-[0.9rem] leading-[1.75] text-ink-invert-muted">
                    {resultat.texte}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Les quatre services du parcours, en rangs. L'art. 4 impose qu'ils
          soient présentés séparément par clientèle : ici, la séparation est
          l'aiguillage lui-même.

          C'EST LA FLÈCHE DE LA MÉTHODE, COUCHÉE. Même geste et même moteur :
          une tige qui s'étire, une tête qui avance devant elle, des stations
          qui s'allument quand elle les dépasse et des textes qui se
          découvrent derrière. La méthode est une suite d'étapes dans le
          temps, donc verticale ; les quatre services sont une rangée, donc
          horizontale. C'est la seule différence.

          ELLE EST PILOTÉE PAR LE DÉFILEMENT, malgré le `display: none` des
          panneaux. Une plage qui SE TERMINE TÔT (52 % de la plage de
          couverture) règle l'objection : au moment où la rangée est
          confortablement dans l'écran, la flèche est déjà arrivée. Un visiteur
          qui change d'onglet en la regardant retrouve donc une scène complète,
          pas une scène gelée à mi-chemin. */}
      <div className="services-bloc mt-16">
        <h3 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
          Les quatre services de ce parcours
        </h3>

        {/* LA PISTE. Masquée sous `lg` : en dessous, les cartes s'empilent sur
            une ou deux colonnes et une flèche horizontale ne désignerait plus
            rien. */}
        <div aria-hidden="true" className="relative mt-8 hidden h-5 lg:block">
          <span className="absolute inset-x-0 top-2 h-0.5 bg-invert-line" />
          <span className="services-tige absolute inset-x-0 top-2 h-0.5 origin-left bg-accent" />

          {services.map((service, i) => (
            // Le centrage est porté par l'enveloppe et l'animation par
            // l'intérieur : une animation de `transform` écrase le
            // `-translate-x-1/2`, et la station glisserait d'un demi-jalon.
            <span
              key={service.slug}
              className="absolute top-[3px] -translate-x-1/2"
              style={{ left: `${(i + 0.5) * 25}%` }}
            >
              <span
                className="services-jalon block size-3 rounded-full border-2 border-accent bg-surface-invert"
                style={{ "--rang": i } as CSSProperties}
              />
            </span>
          ))}

          {/* Le calque de la tête fait exactement la largeur de la piste :
              `translateX(-100%)` la pose au départ et `0` à l'arrivée, sans
              avoir à connaître cette largeur. */}
          <span className="services-pointe absolute inset-0">
            <span className="absolute top-[3px] right-0 size-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-accent" />
          </span>
        </div>

        <ul className="grille-filets-invert mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="bg-surface-invert p-6 transition-colors duration-500 hover:bg-invert-raised"
            >
              {/* C'est le CONTENU qui se découvre, jamais la carte. La grille à
                  filets tire ses traits du fond du conteneur : une carte qui
                  passerait par `opacity: 0` laisserait voir un rectangle plein
                  de la couleur des filets. */}
              <div
                className="services-carte"
                style={{ "--rang": i } as CSSProperties}
              >
                <h4 className="font-display text-[1rem] leading-snug font-semibold text-ink-invert">
                  {service.nom}
                </h4>
                <p className="mt-3 text-[0.85rem] leading-[1.7] text-ink-invert-muted">
                  {service.resultat}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* La fermeture du panneau reprend LE GESTE DE SON PARCOURS, mais sur le
          défilement : elle est tout en bas, et une animation déclenchée à
          l'affichage du panneau se serait jouée bien avant qu'on y arrive.
          L'enveloppe porte l'animation, pas le bouton : `ButtonLink` se
          soulève au survol par un `transform`, qu'une animation de `transform`
          sur le même élément écraserait pour de bon. */}
      <div
        className={cn(
          "cta-rangee mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center",
          estEntreprise ? "cta-e" : "cta-p",
        )}
      >
        <span className="cta-item" style={{ "--rang": 0 } as CSSProperties}>
          <ButtonLink href="/contact" variant="invert" withArrow>
            Réserver un diagnostic de 20 minutes
          </ButtonLink>
        </span>
        <span className="cta-item" style={{ "--rang": 1 } as CSSProperties}>
          <Link
            href={parcoursHref[parcours]}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Le parcours {c.nav.toLowerCase()} en détail
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </span>
      </div>
    </div>
  );
}
