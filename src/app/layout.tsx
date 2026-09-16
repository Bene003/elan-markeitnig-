import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { baseUrl, entreprise, siteName } from "@/content/entreprise";

/**
 * `next/font` télécharge et auto-héberge les polices AU BUILD. Il n'y a donc
 * aucune requête vers le CDN de Google au chargement, qui serait une requête
 * tierce bloquante et coûterait directement le score mobile de l'art. 20.
 *
 * Deux graisses par famille, sous-ensemble latin. Au-delà, on paie des
 * kilo-octets qui ne servent qu'à nous.
 *
 * SEULE EXCEPTION, LE 300 DE LA POLICE D'AFFICHAGE. Le titre de l'accueil se
 * lit sur trois registres (maigre clair, maigre éteint, gras), et c'est la
 * GRAISSE qui y porte la hiérarchie, pas la couleur : le titre garde donc son
 * sens en niveaux de gris, ce qu'un simple changement de teinte ne tient pas.
 * Un 600 rendu en faux-maigre par le navigateur donnerait une bouillie. Le
 * fichier coûte une quinzaine de kilo-octets, sous-ensemble latin, et il n'est
 * tiré que parce qu'une classe l'appelle réellement.
 */
const sans = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const display = Manrope({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName}, agence commerciale et de croissance à Montréal`,
    template: `%s | ${siteName}`,
  },
  description:
    "Elan Marketing structure la croissance des PME et des porteurs de projet à Montréal. Réservez un diagnostic de 20 minutes.",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName,
    url: baseUrl,
  },
  twitter: { card: "summary_large_image" },
};

/**
 * AUCUNE API DYNAMIQUE ICI. Ni `cookies()`, ni `headers()`, ni `fetch` non mis
 * en cache. Le layout racine entre dans le rendu de chaque route : une seule
 * de ces API basculerait les 11 routes en rendu à la demande, donc en une
 * invocation de fonction par visiteur. La preuve est la sortie de
 * `next build` : `○ Static` partout, `ƒ` sur /api/lead seulement.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-on-brand"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

/**
 * JSON-LD `ProfessionalService`, volontairement SANS `aggregateRating` : les
 * sept avis Google sont des avis auto-déclarés une fois recopiés sur le site,
 * et Google pénalise leur balisage. La preuve sociale reste visible à l'écran,
 * elle n'est simplement pas revendiquée dans les données structurées.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  legalName: entreprise.raisonSociale,
  url: baseUrl,
  telephone: entreprise.telephone,
  email: entreprise.courriel,
  areaServed: "Montréal, Québec, Canada",
  address: {
    "@type": "PostalAddress",
    streetAddress: entreprise.adresse.rue,
    addressLocality: entreprise.adresse.ville,
    addressRegion: entreprise.adresse.region,
    postalCode: entreprise.adresse.codePostal,
    addressCountry: entreprise.adresse.pays,
  },
};
