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
import Panneau from '@/components/commun/ui/Panneau.jsx';
import { obtenirPersonnages, imagePersonnage } from '@/services/personnages.js';
import { Grille, Personnage, Portrait, Nom, Bulle, NomPouvoir, Pouvoir } from './ApercuPersonnages.styles.js';

// Les personnages, fournis par le service (plus tard : par le serveur).
const PERSONNAGES = obtenirPersonnages();

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
              <Portrait src={imagePersonnage(personnage.id)} alt="" />
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

export default ApercuPersonnages;
