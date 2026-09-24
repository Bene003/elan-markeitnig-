import Image from "next/image";
import Link from "next/link";
import elanFavicon from "@/app/icon.png";
import { cn } from "@/lib/utils";
import { Container, ButtonLink } from "@/components/ui";
import { ParcoursSwitcher } from "@/components/parcours/parcours-switcher";
import { pageLinks } from "./nav-links";
import { entreprise } from "@/content/entreprise";

/**
 * Composant serveur. Aucun cookie n'est lu ici : le sélecteur de parcours est
 * le seul élément qui dépend du choix mémorisé, et il s'en charge lui-même,
 * côté client, pour que les 11 routes restent statiques.
 *
 * Chaque libellé de la barre mène à une PAGE (voir nav-links.ts). L'accueil
 * n'est plus un récit complet que la barre parcourait par ancres : il pose le
 * problème et aiguille, et chaque page porte ensuite son sujet.
 *
 * L'EN-TÊTE SUIT LE LECTEUR ET PREND LA COULEUR DE CE QU'IL SURVOLE. Au repos
 * il garde le vert profond de la marque et se confond avec le hero : la page
 * s'ouvre d'un seul tenant. Dès qu'on défile, il se détache en carte flottante
 * et emprunte la couleur réellement peinte sous lui, avec un voile de
 * transparence pour se fondre au lieu de se poser par-dessus.
 *
 * Aucune de ces trois bascules ne passe par React. <EnteteCameleon> pose
 * `data-colle`, `data-ton` et `--fond` sur les noeuds ci-dessous, et tout le
 * reste est du CSS. L'en-tête demeure donc un composant serveur, jamais
 * re-rendu, et les 11 routes restent statiques.
 *
 * L'alternative aurait été un en-tête transparent au-dessus du hero et opaque
 * ailleurs : cela demande de connaître la route courante dans un composant
 * serveur partagé, donc soit d'y remonter un `usePathname` client, soit de
 * passer un drapeau depuis chaque page. Deux complications, et cela n'aurait
 * réglé que le hero, pas les quinze sections qui suivent.
 *
 * SOUS 1024PX, IL TIENT SUR DEUX RANGS, ET LES DEUX RESTENT VISIBLES. La barre
 * posée en bas de l'écran a été retirée : tout est remonté ici. Un seul rang ne
 * tient pas, le nom, trois libellés, le sélecteur de parcours et le bouton
 * demandent une bonne centaine de pixels de plus qu'un téléphone n'en offre, et
 * les serrer donnerait des cibles sous les 44px. L'identité et le rendez-vous
 * restent donc en haut, les sections et le sélecteur descendent d'un cran.
 *
 * Un premier essai refermait le second rang pendant qu'on descendait : il ne
 * restait alors que le nom et le bouton, et la navigation semblait avoir
 * disparu. La hauteur rendue à la lecture ne vaut pas les options retirées.
 *
 * Les trois enfants directs de <Container> sont posés dans l'ordre du
 * TÉLÉPHONE, et c'est `order` qui rétablit l'ordre de l'ordinateur. Ainsi le
 * sélecteur de parcours n'existe qu'une fois dans le document : le dupliquer
 * pour le placer aux deux endroits aurait doublé sa mention `sr-only` et donné
 * deux fois le même choix à un lecteur d'écran.
 */
export function SiteHeader() {
  return (
    <header
      data-entete
      data-colle="false"
      data-ton="sombre"
      className="entete sticky top-0 z-50"
    >
      <div
        data-entete-barre
        className="entete-barre site-header site-header-volume sur-sombre"
      >
        <Container className="flex flex-wrap items-center gap-x-4 max-lg:py-2 lg:h-16 lg:flex-nowrap lg:justify-between">
          <Link
            href="/"
            className="group order-1 flex items-center font-display text-lg font-extrabold tracking-[-0.03em] whitespace-nowrap text-[color:currentColor]"
          >
            <span
              aria-hidden="true"
              className="header-logo-marque relative size-7 shrink-0"
            >
              <Image
                src={elanFavicon}
                alt=""
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </span>
            {/* Deux étages, et c'est indispensable : la grille extérieure se
                referme de 1fr à 0fr, l'étage intérieur masque le débordement.
                C'est la seule façon d'animer la disparition d'un texte dont on
                ne connaît pas la largeur, sans la mesurer en JavaScript.
                `width: auto` ne s'anime pas, et une largeur fixe casserait au
                premier changement de police. */}
            <span className="entete-nom">
              <span>{entreprise.nom}</span>
            </span>
          </Link>

          {/* Le bouton est en deuxième position dans le document, donc sur le
              premier rang au téléphone, à côté du nom. Il ne se replie jamais.
              Sur ordinateur, `order` le renvoie en bout de barre. */}
          <ButtonLink
            href="/contact"
            variant="invert"
            className="entete-cta order-2 ml-auto min-h-10 px-4 py-2 text-[0.82rem] whitespace-nowrap lg:order-3 lg:ml-0 lg:px-5"
          >
            <span className="lg:hidden">Réserver</span>
            <span className="max-lg:hidden">Réserver un diagnostic</span>
          </ButtonLink>

          {/* Le second rang. `w-full` le fait passer à la ligne au téléphone ;
              au-dessus de 1024px il reprend sa largeur propre et se replace
              entre le nom et le bouton. Il reste visible en permanence. */}
          <div className="order-3 w-full lg:order-2 lg:w-auto">
            <div className="flex items-center justify-between gap-3 lg:gap-7">
              <nav aria-label="Navigation principale">
                <ul className="flex items-center gap-3 lg:gap-7">
                  {pageLinks.map((lien) => (
                    <li
                      key={lien.href}
                      className={cn(!lien.telephone && "max-lg:hidden")}
                    >
                      <Link
                        href={lien.href}
                        /* 44px de haut sous 1024px : la cible tactile
                           minimale, et elle n'est pas négociable même quand le
                           libellé est court. */
                        className="entete-lien flex items-center text-[0.82rem] whitespace-nowrap max-lg:min-h-11 max-lg:text-[0.76rem]"
                      >
                        {lien.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <ParcoursSwitcher />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
