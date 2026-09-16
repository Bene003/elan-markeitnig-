import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { CaseStudies, GoogleReviews, FinalCta } from "@/components/funnel";
import { etudesDeCas } from "@/content/cas";

export const metadata: Metadata = {
  title: "Résultats",
  description:
    "Trois situations concrètes : le problème de départ, ce que nous avons fait, ce qui a changé, et le chiffre qui le mesure.",
  alternates: { canonical: "/resultats" },
};

export default function ResultatsPage() {
  return (
    <>
      <PageHero
        eyebrow="Résultats"
        titre="Des situations réelles,"
        titreAccent="pas des promesses"
        intro="Chaque cas est présenté avec son point de départ et sa période. Un chiffre sans contexte ne prouve rien."
      />

      <CaseStudies cas={etudesDeCas} />
      <GoogleReviews />

      <FinalCta
        titre="Votre situation ressemble à l'une d'elles ?"
        texte="Vingt minutes pour en parler, sans frais et sans suite obligatoire."
      />
    </>
  );
}
