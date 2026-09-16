import { NextResponse, type NextRequest } from "next/server";

/**
 * Les deux seules anciennes URL que `redirects()` ne peut pas traiter.
 *
 * L'ancien site expose /Services et /Contact avec une majuscule. Le nouveau
 * site a /services et /contact. Or Next compare les `source` de `redirects()`
 * sans tenir compte de la casse : une règle « /Services vers /services »
 * attrape aussi /services et boucle en 308 jusqu'à l'erreur du navigateur.
 * C'est un piège silencieux, et il ne se voit qu'en interrogeant les routes
 * une par une.
 *
 * Le middleware est le seul endroit où la casse réelle du chemin est lisible,
 * d'où cette exception. Le `matcher` la garde étroite : les 9 autres routes
 * n'invoquent rien du tout et restent servies depuis le CDN, ce qui est la
 * condition de la capacité de charge. Seules /services et /contact paient un
 * saut au bord, et elles ne sont pas la page la plus visitée.
 */
const CORRECTIONS: Record<string, string> = {
  "/Services": "/services",
  "/Contact": "/contact",
};

export function middleware(request: NextRequest) {
  const cible = CORRECTIONS[request.nextUrl.pathname];

  if (cible) {
    const url = request.nextUrl.clone();
    url.pathname = cible;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Services", "/services", "/Contact", "/contact"],
};
