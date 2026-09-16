import type { Metadata } from "next";
import { ParcoursPage } from "@/components/parcours/parcours-page";
import { contenuParcours } from "@/content/parcours";

export const metadata: Metadata = {
  title: contenuParcours.particulier.titreMeta,
  description: contenuParcours.particulier.descriptionMeta,
  alternates: { canonical: "/particuliers" },
};

export default function ParticuliersPage() {
  return <ParcoursPage parcours="particulier" />;
}
