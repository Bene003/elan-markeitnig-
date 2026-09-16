"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import {
  PARCOURS,
  PARCOURS_COOKIE,
  parcoursHref,
  parcoursLabel,
  type Parcours,
} from "@/lib/parcours";

/**
 * Le sélecteur exigé par l'art. 3 : le parcours doit être changeable à tout
 * moment depuis la navigation.
 *
 * Ce sont DEUX VRAIES BALISES <a>, pas un widget `tablist` maison. Conséquence
 * directe : zéro piège d'accessibilité, ça fonctionne sans JavaScript, et les
 * deux parcours restent explorables par un moteur de recherche.
 *
 * POURQUOI LE COOKIE N'EST PAS LU CÔTÉ SERVEUR. Un `cookies()` dans le layout
 * racine ne rend pas seulement le layout dynamique : il bascule les 11 routes
 * en rendu à la demande, donc une invocation de fonction par visiteur sur la
 * page la plus visitée. C'est vérifié à la sortie de `next build`, et c'est
 * exactement le mécanisme par lequel la capacité de charge se dégrade sans
 * qu'on le voie.
 *
 * Le compromis retenu, et il n'affiche jamais un mauvais état :
 *  - sur /entreprises et /particuliers, l'état actif vient du CHEMIN. Il est
 *    donc juste dès le premier octet, sans JavaScript et sans clignotement ;
 *  - sur les pages neutres, la pastille part éteinte et s'allume après
 *    hydratation si un choix est mémorisé. C'est un ajout, pas une correction :
 *    le visiteur ne voit jamais le mauvais parcours mis en avant.
 *
 * IL DISPARAÎT SUR L'ACCUEIL, et c'est une exigence de lisibilité, pas un
 * abandon de l'art. 3. L'en-tête est sombre et le hero aussi : les deux se
 * lisent comme une seule bande, où le même choix apparaissait deux fois à
 * quinze centimètres d'écart, une fois en pastille et une fois en deux gros
 * boutons. Le visiteur se demande alors si ce sont deux choses différentes.
 * L'art. 3 demande deux choses, et les deux restent tenues : les boutons du
 * hero sont visibles sans défilement, et le choix est changeable depuis la
 * navigation sur toutes les pages où le hero ne l'offre pas déjà. Sur
 * l'accueil, la navigation n'a rien à rattraper.
 *
 * Le test se fait sur `usePathname` et non sur une prop passée par le layout :
 * l'accueil est statique, donc son chemin est connu au build, la pastille est
 * absente du HTML servi et il n'y a ni clignotement ni décalage de mise en
 * page. Une prop, elle, obligerait l'en-tête à connaître sa route, donc à
 * devenir client ou à être passé depuis chacune des onze pages.
 */
export function ParcoursSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const parcoursDuChemin = PARCOURS.find(
    (parcours) => pathname === parcoursHref[parcours],
  );

  const memorise = useParcoursMemorise();
  const actif = parcoursDuChemin ?? memorise;

  if (pathname === "/") return null;

  return (
    <div
      className={cn(
        "inline-flex rounded-xs border border-invert-line bg-invert-raised p-1",
        className,
      )}
    >
      {PARCOURS.map((parcours) => (
        <Link
          key={parcours}
          href={parcoursHref[parcours]}
          aria-current={actif === parcours ? "page" : undefined}
          className={cn(
            "rounded-xs px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300",
            actif === parcours
              ? "bg-accent text-surface-invert"
              : "text-ink-invert-muted hover:text-ink-invert",
          )}
        >
          {parcours === "entreprise" ? "Entreprises" : "Particuliers"}
        </Link>
      ))}
      <span className="sr-only">
        Parcours actuel : {actif ? parcoursLabel[actif] : "aucun choix mémorisé"}
      </span>
    </div>
  );
}

/**
 * Lecture du cookie de session écrit par <ParcoursSetter>.
 *
 * `useSyncExternalStore` plutôt qu'un effet : le cookie est une source de
 * vérité extérieure à React, et cette forme donne explicitement un instantané
 * de rendu serveur (`null`). Le HTML servi est donc identique pour tout le
 * monde, ce qui est la condition pour qu'il reste en cache sur le CDN, et il
 * n'y a ni erreur d'hydratation ni rendu en cascade.
 */
function useParcoursMemorise() {
  return useSyncExternalStore(sabonner, lireCookie, () => null);
}

/** Le cookie ne change pas de lui-même pendant une visite : rien à écouter. */
const sabonner = () => () => {};

function lireCookie(): Parcours | null {
  const valeur = document.cookie
    .split("; ")
    .find((morceau) => morceau.startsWith(`${PARCOURS_COOKIE}=`))
    ?.slice(PARCOURS_COOKIE.length + 1);

  return PARCOURS.includes(valeur as Parcours) ? (valeur as Parcours) : null;
}
