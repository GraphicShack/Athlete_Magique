/*
 * EnTetePage.jsx : bandeau en haut des pages, avec le logo à gauche et un lien à droite.
 *
 * Responsabilité : donner le même en-tête à toutes les pages ; chaque page choisit seulement
 * son lien et ce qu'elle ajoute à côté du logo.
 *
 * Props :
 *   lien     : { libelle, to }, ex. « Retour à l'accueil », « Quitter la partie »
 *   actions  : éléments libres affichés à droite, avant le lien (optionnel)
 *   children : éléments affichés à côté du logo, ex. « Course 1 sur 3 » (optionnel)
 */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function EnTetePage({ lien, actions, children }) {
  return (
    <Bandeau>
      <Marque>
        <Logo>Athlète Magique</Logo>
        {children}
      </Marque>
      <Droite>
        {actions}
        {/* viewTransition : le rideau de couleur passe pendant le changement de page. */}
        {lien && (
          <Lien to={lien.to} viewTransition>
            {lien.libelle}
          </Lien>
        )}
      </Droite>
    </Bandeau>
  );
}

// Logo à gauche, lien à droite ; le lien passe dessous si la place manque.
const Bandeau = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Le logo et ce qui l'accompagne.
const Marque = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Les actions et le lien.
const Droite = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
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

// Lien blanc souligné, posé sur le fond noir de la page.
const Lien = styled(Link)`
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;

export default EnTetePage;
