import type { Metadata } from "next";
import { ParcoursPage } from "@/components/parcours/parcours-page";
import { contenuParcours } from "@/content/parcours";

export const metadata: Metadata = {
  title: contenuParcours.entreprise.titreMeta,
  description: contenuParcours.entreprise.descriptionMeta,
  alternates: { canonical: "/entreprises" },
};

export default function EntreprisesPage() {
  return <ParcoursPage parcours="entreprise" />;
}
