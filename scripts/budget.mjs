import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

/**
 * Budget de JavaScript de premier chargement.
 *
 * Next 16 n'affiche plus la colonne « First Load JS » à la sortie de
 * `next build` : sans ce script, le budget serait un vœu et non un contrôle.
 * Il lit les <script> réellement présents dans le HTML pré-rendu de chaque
 * route et somme leur taille compressée.
 *
 * Les scripts `noModule` sont EXCLUS : ils ne sont téléchargés que par les
 * navigateurs sans modules ES, qui ne sont plus le sujet. Les compter
 * gonflerait le chiffre de ~40 ko sans qu'aucun prospect ne les paie.
 *
 * Les seuils sont volontairement au-dessus du plancher du cadre lui-même
 * (~144 ko compressés pour Next 16 + React 19) : ce qu'ils surveillent, c'est
 * NOTRE dérive, pas celle du cadre. Une bibliothèque d'animation qui remonte
 * jusqu'à l'accueil se voit immédiatement.
 */
const BUDGETS_KO = {
  "/": 155,
  "/entreprises": 200,
  "/particuliers": 200,
  "/methode": 200,
  defaut: 175,
};

const dossier = ".next/server/app";

if (!existsSync(dossier)) {
  console.error("Aucune build trouvée. Lancer `npm run build` d'abord.");
  process.exit(1);
}

const resultats = readdirSync(dossier)
  .filter((f) => f.endsWith(".html") && !f.startsWith("_"))
  .map((fichier) => {
    const html = readFileSync(join(dossier, fichier), "utf8");
    const scripts = [...html.matchAll(/<script([^>]*)>/g)]
      .filter((m) => !m[1].includes("noModule"))
      .map((m) => m[1].match(/src="\/_next\/(static\/[^"]+\.js)"/)?.[1])
      .filter(Boolean);

    const poids = [...new Set(scripts)].reduce((total, chemin) => {
      const p = join(".next", chemin);
      return existsSync(p) ? total + gzipSync(readFileSync(p)).length : total;
    }, 0);

    const route = fichier === "index.html" ? "/" : `/${fichier.slice(0, -5)}`;
    return { route, ko: poids / 1024 };
  })
  .sort((a, b) => b.ko - a.ko);

let depassements = 0;

for (const { route, ko } of resultats) {
  const budget = BUDGETS_KO[route] ?? BUDGETS_KO.defaut;
  const depasse = ko > budget;
  if (depasse) depassements += 1;
  console.log(
    `${depasse ? "DÉPASSÉ" : "  ok   "}  ${ko.toFixed(1).padStart(7)} ko / ${String(budget).padStart(3)} ko   ${route}`,
  );
}

if (depassements > 0) {
  console.error(`\n${depassements} route(s) hors budget.`);
  process.exit(1);
}
console.log("\nBudget de premier chargement tenu sur toutes les routes.");
