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
      {lien && <Lien to={lien.to}>{lien.libelle}</Lien>}
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

const Logo = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.xl};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  line-height: 1;
`;

const Lien = styled(Link)`
  color: ${({ theme }) => theme.couleurs.encre};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;

export default EnTetePage;
