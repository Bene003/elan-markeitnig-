"use client";

import { useEffect } from "react";

/**
 * L'en-tête prend la couleur de ce qui passe sous lui.
 *
 * CE COMPOSANT NE REND RIEN, et c'est tout l'intérêt. L'en-tête reste un
 * composant serveur : il n'est jamais re-rendu, ni au chargement ni au
 * défilement. Ce module ne fait que poser trois choses sur le noeud existant,
 * un attribut `data-colle`, un attribut `data-ton` et une variable `--fond`,
 * que le CSS traduit ensuite en couleurs. Aucun état React ne traverse le
 * défilement, donc aucune image perdue à reconstruire un arbre.
 *
 * ON LIT LE RENDU, PAS LE BALISAGE. La barre ne connaît pas les sections :
 * elle regarde ce qui est réellement peint deux pixels sous elle, et prend
 * cette couleur. La solution habituelle consiste à marquer chaque section d'un
 * attribut puis à les observer ; il faut alors penser à poser l'attribut sur
 * chaque section ajoutée, et l'oubli ne se voit pas tout de suite. Ici rien à
 * tenir à jour, et les intercalaires vidéo, les grilles fondues et les voiles
 * en dégradé sont traversés exactement comme l'oeil le ferait.
 *
 * `elementsFromPoint` rend la pile d'éléments sous un point, du plus haut au
 * plus bas. On descend jusqu'au premier fond franc ; ce qui est transparent
 * est traversé.
 */
export function EnteteCameleon() {
  useEffect(() => {
    const entete = document.querySelector<HTMLElement>("[data-entete]");
    const barre = entete?.querySelector<HTMLElement>("[data-entete-barre]");
    if (!entete || !barre) return;

    let fondPose = "";
    let enAttente = false;

    function couleurSousLaBarre() {
      const boite = barre!.getBoundingClientRect();
      const pile = document.elementsFromPoint(
        (boite.left + boite.right) / 2,
        boite.bottom + 2,
      );

      for (const element of pile) {
        // L'en-tête est forcément dans la pile : il se lirait lui-même.
        if (entete!.contains(element)) continue;

        const teinte = lireFond(getComputedStyle(element).backgroundColor);
        // Un fond à peine teinté ne dit rien de la couleur de la section : on
        // continue à descendre jusqu'à en trouver un franc.
        if (teinte && teinte.a > 0.55) return teinte;
      }
      return null;
    }

    function accorder() {
      const colle = window.scrollY > DECOLLAGE;
      entete!.dataset.colle = colle ? "true" : "false";

      // Au repos, la barre garde le vert profond de la marque et se confond
      // avec le hero : il n'y a rien à emprunter, et lire la couleur coûterait
      // un calcul de style pour rien.
      if (!colle) return;

      const teinte = couleurSousLaBarre();
      if (!teinte) return;

      const fond = `rgb(${teinte.r} ${teinte.g} ${teinte.b})`;
      if (fond !== fondPose) {
        barre!.style.setProperty("--fond", fond);
        fondPose = fond;
      }
      entete!.dataset.ton = estSombre(teinte) ? "sombre" : "clair";
    }

    /* Une seule lecture par image affichée. Sans cette garde, un défilement à
       la molette déclenche des dizaines de `elementsFromPoint` par image, et
       chacun force un recalcul de mise en page. */
    function auDefilement() {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => {
        enAttente = false;
        accorder();
      });
    }

    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement, { passive: true });
    accorder();

    return () => {
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, []);

  return null;
}

/** Le seuil au-delà duquel on considère avoir quitté le premier écran. */
const DECOLLAGE = 24;

type Teinte = { r: number; g: number; b: number; a: number };

function lireFond(valeur: string): Teinte | null {
  const nombres = valeur.match(/[\d.]+/g);
  if (!nombres || nombres.length < 3) return null;

  return {
    r: +nombres[0],
    g: +nombres[1],
    b: +nombres[2],
    a: nombres.length > 3 ? +nombres[3] : 1,
  };
}

/**
 * Luminance perçue, et non moyenne des trois canaux : l'oeil est bien plus
 * sensible au vert qu'au bleu, et une moyenne simple ferait passer le vert
 * profond de la marque pour une couleur claire.
 */
function estSombre(teinte: Teinte) {
  return (
    (0.2126 * teinte.r + 0.7152 * teinte.g + 0.0722 * teinte.b) / 255 < 0.5
  );
}
