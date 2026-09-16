import Image from "next/image";
import Link from "next/link";
import elanFavicon from "@/app/icon.png";
import { Container, ButtonLink } from "@/components/ui";
import { ParcoursSwitcher } from "@/components/parcours/parcours-switcher";
import { MobileNav } from "./mobile-nav";
import { ancreLinks } from "./nav-links";
import { entreprise } from "@/content/entreprise";

/**
 * Composant serveur. Aucun cookie n'est lu ici : le sélecteur de parcours est
 * le seul élément qui dépend du choix mémorisé, et il s'en charge lui-même,
 * côté client, pour que les 11 routes restent statiques.
 *
 * La barre pointe vers les SECTIONS DE L'ACCUEIL et non vers les pages
 * internes (voir nav-links.ts). Les deux liens de parcours restent des liens
 * de page, parce que l'art. 3 demande un choix mémorisé et changeable, ce
 * qu'une ancre ne fait pas.
 *
 * L'EN-TÊTE EST SOMBRE SUR TOUTES LES PAGES, et c'est un choix de cohérence
 * plutôt qu'un choix esthétique. Sur l'accueil, il se fond dans le hero sombre
 * et la page s'ouvre d'un seul tenant. Sur les pages claires, il devient une
 * barre pleine qui pose le haut de page. L'alternative aurait été un en-tête
 * transparent au-dessus du hero et opaque ailleurs : cela demande de connaître
 * la route courante dans un composant serveur partagé, donc soit d'y remonter
 * un `usePathname` client, soit de passer un drapeau depuis chaque page. Deux
 * complications pour un gain nul.
 */
export function SiteHeader() {
  return (
    <header className="site-header site-header-volume sur-sombre relative z-50 bg-surface-invert text-ink-invert">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink-invert"
        >
          <span aria-hidden="true" className="header-logo-marque relative size-7 shrink-0">
            <Image
              src={elanFavicon}
              alt=""
              fill
              sizes="28px"
              className="object-contain"
              priority
            />
          </span>
          {entreprise.nom}
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {ancreLinks.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="text-[0.82rem] whitespace-nowrap text-ink-invert-muted transition-colors duration-300 hover:text-ink-invert"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ParcoursSwitcher className="hidden sm:inline-flex" />
          <ButtonLink
            href="/contact"
            variant="invert"
            className="hidden min-h-10 px-5 py-2 text-[0.82rem] whitespace-nowrap md:inline-flex"
          >
            Réserver un diagnostic
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
