/*
 * AccesRegles.jsx : l'accès rapide aux règles depuis n'importe quelle page.
 *
 * Responsabilités :
 *   - afficher le bouton rouge « ? Règles », en bas à droite (voir App.jsx) ;
 *   - ouvrir les règles dans une fenêtre, par-dessus la page (la partie n'est pas quittée) ;
 *   - proposer un lien vers la page complète des règles.
 * Le bouton est masqué sur la page des règles elle-même.
 */
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Bouton from '../commun/Bouton.jsx';
import FenetreModale from '../commun/FenetreModale.jsx';
import ContenuRegles from './ContenuRegles.jsx';
import MascotteRegles from './MascotteRegles.jsx';
import CHEMINS from '../../chemins.js';

function AccesRegles() {
  const [ouverte, setOuverte] = useState(false); // la fenêtre est-elle ouverte ?
  const { pathname } = useLocation(); // adresse de la page actuelle

  // Sur la page des règles, le bouton ne sert à rien.
  if (pathname === CHEMINS.regles) return null;

  return (
    <>
      {/* Le bouton se cache pendant que la fenêtre est ouverte : la fenêtre semble sortir de lui. */}
      <BoutonFlottant
        variante="principal"
        onClick={() => setOuverte(true)}
        aria-haspopup="dialog"
        style={{ opacity: ouverte ? 0 : 1 }}
      >
        <span aria-hidden="true">?</span> Règles
      </BoutonFlottant>

      <FenetreModale ouverte={ouverte} onFermer={() => setOuverte(false)} titre="Règles du jeu">
        <ContenuRegles>
          <EmplacementMascotte>
            <MascotteModale />
          </EmplacementMascotte>
        </ContenuRegles>
        <LienPage to={CHEMINS.regles} viewTransition onClick={() => setOuverte(false)}>
          Ouvrir les règles dans une page
        </LienPage>
      </FenetreModale>
    </>
  );
}

// Bouton rouge en forme de pilule, avec un petit rond blanc pour le « ? ».
const BoutonFlottant = styled(Bouton)`
  border-radius: ${({ theme }) => theme.rayons.rond};
  box-shadow: ${({ theme }) => theme.ombres.blocPetit};

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${({ theme }) => theme.espace(1)};
    border-radius: ${({ theme }) => theme.rayons.rond};
    background: ${({ theme }) => theme.couleurs.surface};
    color: ${({ theme }) => theme.couleurs.encre};
    font-size: ${({ theme }) => theme.texte.xs};
  }
`;

// Dernière case de la grille des règles : la mascotte, en bas à droite.
const EmplacementMascotte = styled.div`
  justify-self: end;
  align-self: end;
  width: 100%;
  min-width: 0;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-column: 2;
  }
`;

// Dans la fenêtre, la mascotte prend toute la largeur de sa case.
const MascotteModale = styled(MascotteRegles)`
  width: 100%;
`;

// Lien blanc souligné, sous les règles.
const LienPage = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.espace(6)};
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;

export default AccesRegles;
