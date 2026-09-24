import Link from "next/link";
import { Container } from "@/components/ui";
import { navLinks } from "./nav-links";
import { entreprise } from "@/content/entreprise";

/**
 * Le pied de page est sombre, comme le hero et comme l'appel final.
 *
 * Ce n'est pas une préférence : l'appel final est sur fond sombre et le pied
 * de page le suit immédiatement. Un pied clair y couperait la page en deux au
 * pire endroit, juste après le bouton qu'on veut faire cliquer. Sombre, les
 * deux blocs se lisent comme un seul bas de page, et le site se referme sur la
 * même couleur qu'il a ouverte.
 */
export function SiteFooter() {
  const annee = new Date().getFullYear();

  return (
    <footer className="sur-sombre relative isolate overflow-hidden border-t border-invert-line bg-surface-invert text-ink-invert">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl font-extrabold tracking-[-0.03em] text-ink-invert">
              {entreprise.nom}
            </div>
            <p className="mt-4 max-w-xs text-[0.92rem] leading-[1.8] text-ink-invert-muted">
              Agence commerciale et de croissance.
            </p>
          </div>

          {/* Le pied de page liste les HUIT PAGES, en liens de page et non en
              ancres. C'est ce qui rend la bascule vers une navigation par
              ancres sans conséquence contractuelle : les huit pages de
              l'art. 4 restent atteignables depuis n'importe quel écran du
              site, et le critère « aucun lien mort » de l'art. 20 porte sur
              des liens qui existent réellement. */}
          <nav aria-label="Pied de page">
            <h2 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
              Toutes les pages
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="text-sm text-ink-invert-muted transition-colors duration-300 hover:text-ink-invert"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
              Nous joindre
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-invert-muted">
              <li>
                <a
                  href={`tel:${entreprise.telephone.replace(/\s/g, "")}`}
                  className="transition-colors duration-300 hover:text-ink-invert"
                >
                  {entreprise.telephoneAffiche}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${entreprise.courriel}`}
                  className="transition-colors duration-300 hover:text-ink-invert"
                >
                  {entreprise.courriel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.68rem] font-medium tracking-[0.24em] text-accent uppercase">
              Adresse
            </h2>
            <address className="mt-5 text-sm leading-[1.8] text-ink-invert-muted not-italic">
              {entreprise.adresse.rue}
              <br />
              {entreprise.adresse.ville}, {entreprise.adresse.region}{" "}
              {entreprise.adresse.codePostal}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-invert-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-invert-muted">
            © {annee} {entreprise.raisonSociale}, exerçant sous le nom{" "}
            {entreprise.nom}.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/mentions-legales"
                className="text-xs text-ink-invert-muted transition-colors duration-300 hover:text-ink-invert"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/confidentialite"
                className="text-xs text-ink-invert-muted transition-colors duration-300 hover:text-ink-invert"
              >
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      {/* Le nom de la marque en très grand et très pâle, coupé par le bas de la
          page. Il n'est lu par personne : c'est une texture qui donne au pied
          de page une masse au lieu d'un simple bloc de liens. `aria-hidden`,
          puisque le nom figure déjà en clair juste au-dessus. */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] overflow-hidden px-5 select-none sm:px-8"
      >
        <span className="block text-center font-display text-[clamp(4rem,17vw,13rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-ink-invert/[0.05]">
          {entreprise.nom}
        </span>
      </div>
    </footer>
  );
}
