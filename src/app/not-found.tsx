import Link from "next/link";
import { Anneaux, ButtonLink, Container, Display } from "@/components/ui";
import { navLinks } from "@/components/layout/nav-links";

/**
 * Une 404 utile plutôt qu'un cul-de-sac : le critère « aucun lien mort » de
 * l'art. 20 se joue sur les liens du site, mais un visiteur qui arrive ici par
 * un vieux signet doit repartir vers une page réelle, pas vers rien.
 *
 * Elle est sombre comme les en-têtes de page : arriver sur une 404 blanche
 * après un site sombre donne l'impression d'avoir quitté le site.
 */
export default function NotFound() {
  return (
    <section className="sur-sombre relative isolate flex flex-1 items-center overflow-hidden bg-surface-invert text-ink-invert">
      <div
        aria-hidden="true"
        className="grille-invert grille-fondue pointer-events-none absolute inset-0 -z-10"
      />
      <Anneaux className="top-[-20%] right-[-18%] hidden size-[34rem] lg:block" />

      <Container className="py-24 sm:py-32">
        <p className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-accent">
          ERREUR 404
        </p>
        <Display as="h1" taille="grand" className="mt-6 max-w-2xl text-ink-invert">
          Cette page <em className="text-accent italic">n&apos;existe pas</em>
        </Display>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.8] text-ink-invert-muted">
          Le lien est peut-être ancien, ou l&apos;adresse comporte une faute.
          Voici les pages du site.
        </p>

        <ul className="mt-10 max-w-xl border-t border-invert-line">
          {navLinks.map((lien) => (
            <li key={lien.href}>
              <Link
                href={lien.href}
                className="group flex min-h-12 items-center border-b border-invert-line text-[0.95rem] text-ink-invert-muted transition-[padding-left,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3 hover:text-accent"
              >
                {lien.label}
              </Link>
            </li>
          ))}
        </ul>

        <ButtonLink href="/" variant="invert" className="mt-10" withArrow>
          Retour à l&apos;accueil
        </ButtonLink>
      </Container>
    </section>
  );
}
