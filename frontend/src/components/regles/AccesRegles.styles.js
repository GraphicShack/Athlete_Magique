/*
 * AccesRegles.styles.js : l'apparence de AccesRegles (AccesRegles.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * AccesRegles.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import MascotteRegles from './MascotteRegles.jsx';

// Bouton rouge en forme de pilule, avec un petit rond blanc pour le « ? ».
export const BoutonFlottant = styled(Bouton)`
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
export const EmplacementMascotte = styled.div`
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
export const MascotteModale = styled(MascotteRegles)`
  width: 100%;
`;

// Lien blanc souligné, sous les règles.
export const LienPage = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.espace(6)};
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;
