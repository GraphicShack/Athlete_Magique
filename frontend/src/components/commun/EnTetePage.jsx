import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Bandeau en haut des pages : logo à gauche, un lien à droite.
 * lien     : { libelle, to } — ex. « Retour à l'accueil », « Quitter la partie »
 * children : éléments affichés à côté du logo (ex. « Course 1 sur 3 »)
 */
function EnTetePage({ lien, children }) {
  return (
    <Bandeau>
      <Marque>
        <Logo>Athlète Magique</Logo>
        {children}
      </Marque>
      {lien && (
        <Lien to={lien.to} viewTransition>
          {lien.libelle}
        </Lien>
      )}
    </Bandeau>
  );
}

const Bandeau = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(3)};
`;

const Marque = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Logo blanc, capitales italiques très grasses, comme la couverture du livret.
const Logo = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;

const Lien = styled(Link)`
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;

export default EnTetePage;
