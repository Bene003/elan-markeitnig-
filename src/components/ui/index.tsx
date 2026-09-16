import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * Rythme vertical unique du site. Toutes les sections passent par ici, ce qui
 * évite que la densité dérive d'une page à l'autre.
 *
 * `tone` est le mécanisme d'alternance des fonds. Une page entière sur un seul
 * fond blanc se lit comme un document, pas comme un site : c'est exactement le
 * défaut « site par défaut ». On alterne donc clair, creusé et sombre, et la
 * bande sombre est le repère qui découpe la page en actes.
 */
export function Section({
  children,
  className,
  id,
  tone = "clair",
  grille = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "clair" | "creuse" | "sombre";
  /** Pose le fond gravé, fondu sur les bords. Décoratif, coût nul. */
  grille?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-20 sm:py-28",
        sectionTones[tone],
        tone === "sombre" && "sur-sombre",
        className,
      )}
    >
      {grille ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 grille-fondue",
            tone === "sombre" ? "grille-invert" : "grille",
          )}
        />
      ) : null}
      <Container className="scroll-reveal-contenu">{children}</Container>
    </section>
  );
}

const sectionTones = {
  clair: "bg-surface text-ink",
  creuse: "bg-surface-raised text-ink",
  sombre: "bg-surface-invert text-ink-invert",
} as const;

/**
 * Surtitre en capitales espacées, précédé d'un filet. Le filet n'est pas un
 * ornement : c'est lui qui rattache le surtitre au bord gauche de la colonne
 * et empêche qu'il flotte comme une étiquette collée.
 */
export function Eyebrow({
  children,
  tone = "clair",
  align = "left",
}: {
  children: ReactNode;
  tone?: "clair" | "sombre";
  /** Centré, le surtitre porte un filet DES DEUX CÔTÉS. Un filet à gauche
   *  seulement sur un bloc centré tire l'œil hors de l'axe. */
  align?: "left" | "center";
}) {
  const filet = cn("h-px w-7", tone === "sombre" ? "bg-accent/60" : "bg-brand/50");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.24em] uppercase",
        tone === "sombre" ? "text-accent" : "text-brand",
      )}
    >
      <span className={filet} />
      {children}
      {align === "center" ? <span className={filet} /> : null}
    </span>
  );
}

/**
 * Mise en relief d'un fragment de phrase dans un paragraphe.
 *
 * Ce n'est pas de la décoration : c'est ce qui rend un texte long balayable.
 * Un prospect ne lit pas un paragraphe de six lignes, il en attrape trois
 * mots. Autant décider lesquels.
 *
 * Le `<strong>` est délibéré, pas un `<span>` coloré : la mise en relief est
 * une information, pas un effet, et elle doit donc exister aussi pour qui
 * n'a pas accès à la couleur.
 */
export function Fort({
  children,
  tone = "clair",
}: {
  children: ReactNode;
  tone?: "clair" | "sombre";
}) {
  return (
    <strong
      className={cn(
        "font-semibold",
        tone === "sombre" ? "text-accent" : "text-brand",
      )}
    >
      {children}
    </strong>
  );
}

/**
 * Titre d'affichage.
 *
 * Trois choses font la différence entre un titre dessiné et un titre par
 * défaut, et aucune des trois n'est la couleur :
 *   1. la TAILLE en `clamp`, qui suit la largeur du viewport en continu au
 *      lieu de sauter à chaque point de rupture ;
 *   2. l'INTERLIGNE sous 1, qui ne devient lisible qu'à partir de ces
 *      tailles-là et qui referme le bloc sur lui-même ;
 *   3. le CRÉNAGE négatif, qui est ce qui distingue une composition d'un
 *      réglage par défaut du navigateur.
 * Les trois ne tiennent qu'ensemble : un crénage serré sur un interligne
 * lâche donne une bouillie.
 */
export function Display({
  children,
  className,
  as: Tag = "h2",
  taille = "moyen",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  taille?: "geant" | "grand" | "moyen";
}) {
  return (
    <Tag
      className={cn(
        "font-display font-extrabold text-balance",
        displayTailles[taille],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

const displayTailles = {
  geant: "text-[clamp(2.15rem,7.2vw,5.2rem)] leading-[0.94] tracking-[-0.04em]",
  grand: "text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[0.98] tracking-[-0.035em]",
  moyen: "text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.04] tracking-[-0.03em]",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  tone = "clair",
  taille = "grand",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Un seul <h1> par page : les sections restent en h2 sauf indication. */
  as?: "h1" | "h2";
  tone?: "clair" | "sombre";
  taille?: "geant" | "grand" | "moyen";
}) {
  const centered = align === "center";
  const sombre = tone === "sombre";
  return (
    <div
      className={
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
      }
    >
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow tone={tone} align={align}>
            {eyebrow}
          </Eyebrow>
        </div>
      ) : null}
      <Display
        as={Tag}
        taille={taille}
        className={cn("mt-6", sombre ? "text-ink-invert" : "text-ink")}
      >
        {title}
      </Display>
      {subtitle ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[1.05rem] leading-[1.75]",
            centered && "mx-auto",
            sombre ? "text-ink-invert-muted" : "text-ink-muted",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/**
 * L'en-tête des pages internes.
 *
 * Il existe pour une raison précise : sans lui, chaque page interne
 * recommençait par un `<h1>` noir sur blanc, et c'est exactement ce qui
 * faisait ressembler le site à un gabarit. Une bande sombre en tête de page
 * fait trois choses d'un coup : elle soude la page à l'en-tête, qui est sombre
 * lui aussi ; elle donne à `main` un point de départ franc ; et elle place la
 * marque avant le contenu.
 *
 * `titreAccent` est la seconde moitié du titre, en italique et en vert clair.
 * Le découpage est une donnée passée par l'appelant, jamais une coupure de
 * chaîne : c'est une décision de rédaction.
 */
export function PageHero({
  eyebrow,
  titre,
  titreAccent,
  intro,
  children,
}: {
  eyebrow: string;
  titre: ReactNode;
  titreAccent?: string;
  intro?: ReactNode;
  /** Boutons ou compléments, sous l'introduction. */
  children?: ReactNode;
}) {
  return (
    <section className="sur-sombre relative isolate overflow-hidden bg-surface-invert text-ink-invert">
      <div
        aria-hidden="true"
        className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-10"
      />
      <Anneaux className="top-[-30%] right-[-14%] hidden size-[32rem] lg:block" />
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow tone="sombre">{eyebrow}</Eyebrow>
          <Display as="h1" taille="grand" className="mt-6 text-ink-invert">
            {titre}
            {titreAccent ? (
              <>
                {" "}
                <em className="text-accent italic">{titreAccent}</em>
              </>
            ) : null}
          </Display>
          {intro ? (
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.8] text-ink-invert-muted">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost" | "invert";
  withArrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonBase, buttonVariants[variant], className)}
      {...props}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

/* min-h-12 : cible tactile confortable, au-delà du minimum de 44 px.
   Les boutons reprennent maintenant un arrondi franc, plus doux et plus
   cohérent avec les panneaux qui se déploient au défilement.
   `border` sur les quatre variantes, même transparente : sans elle, un bouton
   bordé mesure 2 px de plus qu'un bouton plein, et les deux boutons de
   l'art. 3 sont côte à côte. */
const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 text-[0.9rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5";

const buttonVariants = {
  primary: "border-transparent bg-brand text-on-brand hover:bg-brand-strong",
  secondary:
    "border-line-strong bg-surface text-ink hover:border-brand hover:text-brand",
  ghost: "border-transparent text-ink-muted hover:text-brand",
  /* Sur une bande sombre, le vert de marque disparaît dans le fond. Le bouton
     principal y devient donc clair, et c'est le fond qui porte la marque. */
  invert:
    "border-transparent bg-accent text-surface-invert hover:bg-ink-invert",
} as const;

export function Card({
  children,
  className,
  tone = "clair",
}: {
  children: ReactNode;
  className?: string;
  tone?: "clair" | "sombre";
}) {
  return (
    <div
      className={cn(
        "carte overflow-hidden p-7",
        tone === "sombre"
          ? "border border-invert-line bg-invert-raised hover:border-accent/40"
          : "border border-line bg-surface hover:border-line-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * L'anneau du logo, abstrait en décor de fond. Deux contours concentriques qui
 * tournent à des vitesses différentes : le mouvement n'est perceptible qu'au
 * bout de plusieurs secondes, ce qui est l'intention. On n'anime que
 * `transform`, donc le navigateur compose sans jamais repeindre.
 *
 * `aria-hidden` et `pointer-events-none` : c'est du décor, il ne doit ni être
 * annoncé, ni intercepter un clic.
 */
export function Anneaux({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10", className)}
    >
      <div className="absolute inset-0 rounded-full border border-accent/15 motion-safe:animate-[anneau-tourne_44s_linear_infinite]" />
      <div className="absolute inset-[18%] rounded-full border border-accent/10 motion-safe:animate-[anneau-tourne_30s_linear_infinite_reverse]" />
      <div className="absolute inset-[36%] rounded-full border border-dashed border-accent/10" />
    </div>
  );
}

/**
 * LE SYMBOLE D'ÉLAN EN FILIGRANE, coupé par le bord de la page.
 *
 * CE N'EST PAS UNE IMAGE, C'EST UN MASQUE. Le fichier ne porte que la
 * silhouette du symbole dans sa couche alpha ; la couleur vient du jeton
 * `--color-accent`, comme tout le reste du site. Trois raisons, dans l'ordre
 * d'importance :
 *
 *   1. LE DÉGRADÉ D'ORIGINE NE SURVIT PAS AU FOND SOMBRE. Le symbole va d'un
 *      vert très foncé à un vert clair. Posé à faible opacité sur le hero, qui
 *      est déjà vert très foncé, la moitié basse disparaît et il ne reste
 *      qu'un demi-logo. Une silhouette d'une seule teinte se lit entière.
 *   2. Le poids : 26 ko pour le masque contre 87 ko pour le symbole en
 *      couleurs, à qualité de forme identique.
 *   3. Le jour où Yliès livre son SVG (art. 18.2), le filigrane change de
 *      fichier sans changer de code, et il restera à la couleur du site.
 *
 * LE FICHIER N'EST PAS TÉLÉCHARGÉ EN MOBILE, ET C'EST LE PRÉFIXE `lg:` QUI
 * L'OBTIENT, PAS LE `hidden`. Le réflexe est de croire qu'un élément en
 * `display: none` ne charge pas son image. C'est vrai pour `background-image`,
 * et FAUX pour `mask-image` : mesuré ici, Chrome allait chercher les 26 ko à
 * 375 px de large alors que l'élément était invisible. Le masque n'est donc pas
 * déclaré sur l'élément mais dans `lg:`, c'est-à-dire à l'intérieur d'un
 * `@media (min-width: 64rem)`. Une règle qui ne s'applique pas ne déclenche
 * aucune requête, et le fichier n'existe pas sous 1024 px.
 *
 * Ça compte parce que le seuil de performance de l'art. 20 porte sur l'accueil
 * MOBILE : cette décoration doit y coûter zéro octet. En `<img>`, elle aurait
 * été chargée partout, y compris là où elle ne s'affiche pas.
 *
 * Il ne tourne pas, contrairement aux anneaux qu'il remplace : un logo qui
 * pivote lentement devient un indicateur de chargement.
 */
export function Filigrane({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 bg-accent/[0.13]",
        "lg:[mask-image:url(/logo-symbole.webp)] lg:[mask-position:center] lg:[mask-repeat:no-repeat] lg:[mask-size:contain]",
        className,
      )}
    />
  );
}

/**
 * Un chiffre et son contexte. Le contexte n'est pas décoratif : un chiffre nu
 * ne prouve rien, et l'audit client posait qu'un résultat doit venir avec sa
 * période et sa situation de départ.
 */
export function Stat({
  value,
  label,
  tone = "clair",
}: {
  value: string;
  label: string;
  tone?: "clair" | "sombre";
}) {
  return (
    <div>
      <div
        className={cn(
          "font-display text-[clamp(2.2rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em]",
          tone === "sombre" ? "text-accent" : "text-brand",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-3 text-sm leading-snug",
          tone === "sombre" ? "text-ink-invert-muted" : "text-ink-muted",
        )}
      >
        {label}
      </div>
    </div>
  );
}
