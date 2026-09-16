import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/entreprise";

/**
 * Les 8 pages contractuelles, plus les deux pages légales. Pas de boucle sur
 * des locales : l'art. 18.2 met le multilingue hors périmètre, le site est
 * unilingue français.
 *
 * La priorité suit l'intention commerciale : l'accueil aiguille, les deux
 * parcours convertissent, le contact clôt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const modifiee = new Date();

  const pages: { chemin: string; priorite: number }[] = [
    { chemin: "", priorite: 1 },
    { chemin: "/entreprises", priorite: 0.9 },
    { chemin: "/particuliers", priorite: 0.9 },
    { chemin: "/contact", priorite: 0.9 },
    { chemin: "/services", priorite: 0.8 },
    { chemin: "/methode", priorite: 0.7 },
    { chemin: "/resultats", priorite: 0.7 },
    { chemin: "/a-propos", priorite: 0.6 },
    { chemin: "/confidentialite", priorite: 0.2 },
    { chemin: "/mentions-legales", priorite: 0.2 },
  ];

  return pages.map(({ chemin, priorite }) => ({
    url: `${baseUrl}${chemin}`,
    lastModified: modifiee,
    changeFrequency: "monthly",
    priority: priorite,
  }));
}
