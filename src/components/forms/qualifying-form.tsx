"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Etat = "repos" | "envoi" | "succes" | "erreur";

/**
 * Formulaire qualifiant, second chemin de conversion derrière le rendez-vous.
 *
 * Champs NON CONTRÔLÉS, lus dans le FormData à l'envoi. C'est délibérément le
 * design le moins astucieux : pas de re-rendu par frappe, pas d'état à
 * synchroniser, et le formulaire reste rempli tel quel si l'envoi échoue.
 *
 * Accessibilité : chaque champ a un vrai <label> associé, le message d'erreur
 * est relié par aria-describedby et annoncé en role="status". Ce sont
 * exactement les points qui coûtent des points de score sur cette page.
 */
export function QualifyingForm() {
  const [etat, setEtat] = useState<Etat>("repos");
  const [message, setMessage] = useState("");
  const statusId = useId();

  async function envoyer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEtat("envoi");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const reponse = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!reponse.ok) {
        setEtat("erreur");
        setMessage(
          reponse.status === 429
            ? "Trop de demandes envoyées depuis cette connexion. Réessayez dans quelques minutes, ou appelez-nous."
            : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous directement par courriel.",
        );
        return;
      }

      setEtat("succes");
      setMessage(
        "Message reçu. Nous vous répondons rapidement, en général sous un jour ouvrable.",
      );
    } catch {
      setEtat("erreur");
      setMessage(
        "L'envoi n'a pas fonctionné. Vérifiez votre connexion, ou écrivez-nous directement par courriel.",
      );
    }
  }

  if (etat === "succes") {
    return (
      <p
        role="status"
        className="rounded-2xl border border-line bg-surface-raised p-8 text-sm leading-relaxed text-ink"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-5" noValidate={false}>
      {/* Pot de miel. Un visiteur ne le voit jamais, un robot le remplit. */}
      <div aria-hidden className="hidden">
        <label htmlFor="site-web">Site web</label>
        <input id="site-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Champ nom="name" label="Votre nom" autoComplete="name" requis />
      <Champ
        nom="email"
        label="Votre courriel"
        type="email"
        autoComplete="email"
        requis
      />
      <Champ nom="phone" label="Votre téléphone" type="tel" autoComplete="tel" />
      <Champ nom="company" label="Votre entreprise" autoComplete="organization" />

      <div>
        <label htmlFor="parcours" className="block text-sm font-medium text-ink">
          Vous êtes
        </label>
        <select
          id="parcours"
          name="parcours"
          defaultValue="entreprise"
          className={cn(champClasses, "bg-surface")}
        >
          <option value="entreprise">Une entreprise</option>
          <option value="particulier">Un particulier</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Ce que vous cherchez à régler
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className={champClasses}
        />
      </div>

      <button
        type="submit"
        disabled={etat === "envoi"}
        aria-describedby={etat === "erreur" ? statusId : undefined}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand transition-colors hover:bg-brand-strong disabled:opacity-60"
      >
        {etat === "envoi" ? "Envoi en cours" : "Envoyer"}
      </button>

      {etat === "erreur" ? (
        <p id={statusId} role="status" className="text-sm text-danger">
          {message}
        </p>
      ) : null}
    </form>
  );
}

const champClasses =
  "mt-2 block w-full rounded-xl border border-line px-4 py-3 text-sm text-ink outline-none focus:border-brand";

function Champ({
  nom,
  label,
  type = "text",
  autoComplete,
  requis = false,
}: {
  nom: string;
  label: string;
  type?: string;
  autoComplete?: string;
  requis?: boolean;
}) {
  return (
    <div>
      <label htmlFor={nom} className="block text-sm font-medium text-ink">
        {label}
        {requis ? null : (
          <span className="ml-1 font-normal text-ink-muted">(facultatif)</span>
        )}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        autoComplete={autoComplete}
        required={requis}
        className={champClasses}
      />
    </div>
  );
}
