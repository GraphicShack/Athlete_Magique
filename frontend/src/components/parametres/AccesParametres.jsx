/*
 * AccesParametres.jsx : l'accès aux paramètres depuis n'importe quelle page.
 *
 * Responsabilités :
 *   - afficher le bouton rond en roue dentée, tout en bas à droite (voir App.jsx) ;
 *   - ouvrir et fermer la fenêtre des paramètres (FenetreModale + ContenuParametres).
 *
 * Props :
 *   son : réglages du son venus d'App.jsx, transmis tels quels à ContenuParametres
 */
import { useState } from 'react';
import styled from 'styled-components';
import FenetreModale from '../commun/FenetreModale.jsx';
import ContenuParametres from './ContenuParametres.jsx';

function AccesParametres({ son }) {
  const [ouverte, setOuverte] = useState(false); // la fenêtre est-elle ouverte ?

  return (
    <>
      {/* Comme pour les règles, le bouton se cache pendant que la fenêtre est ouverte. */}
      <BoutonRond
        type="button"
        onClick={() => setOuverte(true)}
        aria-label="Paramètres"
        aria-haspopup="dialog"
        style={{ opacity: ouverte ? 0 : 1 }}
      >
        <RoueDentee />
      </BoutonRond>

      <FenetreModale ouverte={ouverte} onFermer={() => setOuverte(false)} titre="Paramètres" teinte="parametres">
        <ContenuParametres son={son} />
      </FenetreModale>
    </>
  );
}

// Roue dentée dessinée en SVG : un cercle en pointillés épais forme les dents,
// un disque plein le corps, et un petit disque de la couleur du bouton fait le trou.
function RoueDentee() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="3.34 3.34" />
      <circle cx="12" cy="12" r="7" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="var(--fond-bouton)" />
    </svg>
  );
}

// Bouton rond jaune à contour noir et ombre « carton ».
const BoutonRond = styled.button`
  --fond-bouton: ${({ theme }) => theme.teintes.parametres};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Aussi haut que le bouton « Règles », et parfaitement rond. */
  width: 3.25rem;
  height: 3.25rem;
  padding: 0;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: var(--fond-bouton);
  color: ${({ theme }) => theme.couleurs.encre};
  box-shadow: ${({ theme }) => theme.ombres.blocPetit};

  svg {
    transition: rotate 400ms ease;
  }

  /* Au survol, la roue tourne d'une dent et demie. */
  &:hover svg {
    rotate: 68deg;
  }
`;

export default AccesParametres;
