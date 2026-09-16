import { services } from "@/content/services";

type BandeauProps = {
  variant?: "standard" | "hero";
};

/**
 * Bandeau défilant, en CSS pur : une seule piste dupliquée une fois, translatée
 * de -50 % en boucle. Comme la seconde moitié est la copie exacte de la
 * première, le raccord est invisible et il n'y a ni JavaScript, ni mesure, ni
 * `requestAnimationFrame`. On n'anime que `transform`, donc le navigateur
 * compose sans repeindre : le coût est nul même sur un téléphone d'entrée de
 * gamme, ce qui est la raison pour laquelle ce composant peut vivre sur
 * l'accueil.
 *
 * Il est `aria-hidden` : il n'apporte aucune information que la page ne donne
 * pas déjà en texte lisible, et un lecteur d'écran qui énumère huit services
 * deux fois de suite est une nuisance, pas un service.
 *
 * Composant serveur. Il ne contient aucun état.
 */
export function Bandeau({ variant = "standard" }: BandeauProps) {
  const piste = services.map((service) => service.nom);
  const surHero = variant === "hero";

  return (
    <div
      aria-hidden="true"
      className={
        surHero
          ? "relative flex overflow-hidden border-y border-on-brand/18 bg-surface-invert py-4 shadow-[0_-0.8rem_1.8rem_-1.4rem_rgba(5,23,14,0.34)] select-none"
          : "relative flex overflow-hidden border-y border-line bg-surface-raised py-5 select-none"
      }
    >
      {/* Les deux dégradés latéraux évitent que les mots apparaissent et
          disparaissent net sur l'arête de l'écran. */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-28 ${
          surHero ? "from-surface-invert" : "from-surface-raised"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-28 ${
          surHero ? "from-surface-invert" : "from-surface-raised"
        }`}
      />

      <div className="flex w-max motion-safe:animate-[defile_38s_linear_infinite]">
        {[0, 1].map((moitie) => (
          <ul key={moitie} className="flex items-center">
            {piste.map((nom) => (
              <li
                key={nom}
                className={`flex items-center gap-8 px-8 text-[0.68rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase ${
                  surHero ? "text-ink-invert" : "text-ink-muted"
                }`}
              >
                <span className="size-1 shrink-0 rounded-full bg-accent" />
                {nom}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
