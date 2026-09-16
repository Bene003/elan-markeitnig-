"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ancreLinks, parcoursLinks } from "./nav-links";

/**
 * Les deux parcours d'abord, puis les sections de l'accueil. C'est l'ordre de
 * l'art. 3 : le choix de clientèle passe avant le reste de la navigation.
 */
const liens = [...parcoursLinks, ...ancreLinks];

/**
 * Le seul composant client réellement nécessaire dans l'en-tête.
 *
 * Le menu se ferme au clic sur un lien, et non dans un effet qui observerait
 * la route : fermer depuis un effet déclenche un rendu en cascade après la
 * navigation, alors que la fermeture est simplement la conséquence du clic.
 */
export function MobileNav() {
  const [ouvert, setOuvert] = useState(false);
  const pathname = usePathname();
  const panneauId = useId();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-controls={panneauId}
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        className="inline-flex size-11 items-center justify-center rounded-full text-ink-invert"
      >
        {ouvert ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {ouvert ? (
        <div
          id={panneauId}
          className="absolute inset-x-0 top-full rounded-b-[1.35rem] border-b border-invert-line bg-surface-invert px-5 pb-6 shadow-[0_1.25rem_2.5rem_-1.6rem_rgba(5,23,14,0.9)]"
        >
          <ul className="flex flex-col">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  onClick={() => setOuvert(false)}
                  aria-current={pathname === lien.href ? "page" : undefined}
                  className="flex min-h-12 items-center border-b border-invert-line text-sm text-ink-invert-muted transition-colors duration-300 aria-[current=page]:text-accent hover:text-ink-invert"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
