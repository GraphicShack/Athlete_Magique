/*
 * ApercuPersonnages.jsx : les 10 personnages du jeu sur l'accueil, avec leur image et leur nom.
 *
 * Responsabilités :
 *   - afficher la grille des personnages ;
 *   - au survol (ou avec Tab, ou au toucher sur téléphone), ouvrir une bulle avec le pouvoir
 *     du personnage, juste au-dessus de lui ; la fermer dès qu'on le quitte.
 *
 * La bulle utilise l'attribut HTML « popover » : le navigateur l'affiche par-dessus toute la page,
 * elle n'est donc pas coupée par le cadre du panneau. En mode « manual », c'est nous qui
 * l'ouvrons et la fermons (survol, focus), et non le navigateur.
 */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import IMAGES_PERSONNAGES from '../../donnees/imagesPersonnages.js';
import PERSONNAGES from '../../donnees/personnages.js';
import { COURBE, grandir } from '../../styles/animations/animations.js';

const MARGE = 12; // px : écart entre la bulle et le bord de l'écran ou le personnage

function ApercuPersonnages() {
  const bulle = useRef(null); // l'élément de la bulle, pour l'ouvrir et la mesurer
  const [montre, setMontre] = useState(PERSONNAGES[0]); // personnage affiché dans la bulle
  const [position, setPosition] = useState({ haut: 0, gauche: 0, pointe: 0 }); // en pixels, dans la page

  // Ouvre la bulle au-dessus du personnage survolé, et y met son pouvoir.
  function ouvrir(personnage, evenement) {
    const element = bulle.current;
    const bouton = evenement.currentTarget.getBoundingClientRect(); // position du personnage à l'écran

    if (!element.matches(':popover-open')) element.showPopover();

    // Centrer la bulle sur le personnage, sans dépasser des bords de l'écran.
    const largeur = element.offsetWidth;
    const centre = bouton.left + bouton.width / 2;
    const gauche = Math.min(Math.max(centre - largeur / 2, MARGE), window.innerWidth - largeur - MARGE);

    setMontre(personnage);
    // scrollX / scrollY : on passe de la position à l'écran à la position dans la page.
    setPosition({
      haut: bouton.top + window.scrollY - MARGE,
      gauche: gauche + window.scrollX,
      pointe: centre - gauche, // où placer la pointe, pour qu'elle vise le personnage
    });
  }

  // La souris quitte le personnage (ou le focus clavier passe ailleurs) : la bulle se ferme.
  function fermer() {
    const element = bulle.current;
    if (element.matches(':popover-open')) element.hidePopover();
  }

  return (
    <Panneau titre={`Les ${PERSONNAGES.length} personnages`} aside="Survole pour voir son pouvoir" teinte="personnages">
      <Grille>
        {PERSONNAGES.map((personnage) => (
          <li key={personnage.id}>
            <Personnage
              type="button"
              onMouseEnter={(evenement) => ouvrir(personnage, evenement)}
              onFocus={(evenement) => ouvrir(personnage, evenement)}
              onMouseLeave={fermer}
              onBlur={fermer}
            >
              <Portrait src={IMAGES_PERSONNAGES[personnage.id]} alt="" />
              <Nom>{personnage.nom}</Nom>
            </Personnage>
          </li>
        ))}
      </Grille>

      <Bulle
        ref={bulle}
        popover="manual"
        role="tooltip"
        style={{ top: position.haut, left: position.gauche, '--pointe': `${position.pointe}px` }}
      >
        <NomPouvoir>{montre.nom}</NomPouvoir>
        <Pouvoir>{montre.pouvoir}</Pouvoir>
      </Bulle>
    </Panneau>
  );
}

const Grille = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  /* Des rangées toujours complètes : 2 colonnes sur téléphone, 5 sur tablette, 10 sur grand écran. */
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.ecrans.sm}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-template-columns: repeat(10, 1fr);
  }
  gap: ${({ theme }) => theme.espace(4)};
`;

// Un bouton sans apparence de bouton : il rend le personnage cliquable et accessible au clavier.
const Personnage = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  width: 100%;
  padding: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(1)};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.rayons.md};
  background: transparent;
  color: inherit;
  text-align: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  img {
    transition: transform ${({ theme }) => theme.transition};
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.couleurs.encre};
    background: color-mix(in srgb, var(--teinte) 22%, white);
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.12) rotate(-4deg);
  }
`;

const Portrait = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;
`;

const Nom = styled.span`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

/*
 * Bulle de bande dessinée posée au-dessus du personnage.
 * « translate » la remonte de sa propre hauteur ; « transform » reste libre pour l'animation.
 * Elle s'ouvre avec la même animation que la fenêtre des règles (« grandir »),
 * en partant de la pointe, donc du personnage cliqué.
 */
const Bulle = styled.div`
  --couleur-bouton: ${({ theme }) => theme.teintes.personnages};

  /* On remplace la position par défaut d'un popover (centré à l'écran). */
  position: absolute;
  inset: auto;
  margin: 0;
  translate: 0 -100%;
  transform-origin: var(--pointe) 100%;
  overflow: visible;

  width: min(20rem, calc(100vw - 2rem));
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  box-shadow: ${({ theme }) => theme.ombres.bloc};

  &:popover-open {
    animation: ${grandir} 450ms ${COURBE};
  }

  /* La pointe : un petit carré tourné, dont on ne voit que le coin du bas. */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: var(--pointe);
    width: 14px;
    height: 14px;
    translate: -50% -50%;
    rotate: 45deg;
    border-right: ${({ theme }) => theme.bordures.contour};
    border-bottom: ${({ theme }) => theme.bordures.contour};
    background: ${({ theme }) => theme.couleurs.surface};
  }

  /* Le popover n'a pas de fond assombri derrière lui. */
  &::backdrop {
    background: transparent;
  }
`;

// Même style que les titres des bandeaux : italique très gras, dans la teinte des personnages.
const NomPouvoir = styled.strong`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.espace(2)};
  padding: 0 ${({ theme }) => theme.espace(2)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.teintes.personnages};
  font-family: ${({ theme }) => theme.polices.titre};
  font-style: italic;
  font-weight: 900;
`;

const Pouvoir = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.sm};
`;

export default ApercuPersonnages;
