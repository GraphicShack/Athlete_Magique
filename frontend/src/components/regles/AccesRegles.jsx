import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Bouton from '../commun/Bouton.jsx';
import FenetreModale from '../commun/FenetreModale.jsx';
import ContenuRegles from './ContenuRegles.jsx';
import MascotteRegles from './MascotteRegles.jsx';
import CHEMINS from '../../chemins.js';

/**
 * Accès rapide aux règles depuis n'importe quelle page : un bouton flottant en bas à droite
 * ouvre les règles dans une fenêtre, par-dessus la page actuelle (la partie n'est pas quittée).
 * Le bouton est masqué sur la page des règles elle-même.
 */
function AccesRegles() {
  const [ouverte, setOuverte] = useState(false);
  const { pathname } = useLocation();

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

const BoutonFlottant = styled(Bouton)`
  position: fixed;
  right: ${({ theme }) => theme.espace(4)};
  bottom: ${({ theme }) => theme.espace(4)};
  z-index: 10;
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

const MascotteModale = styled(MascotteRegles)`
  width: 100%;
`;

const LienPage = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.espace(6)};
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;

export default AccesRegles;
