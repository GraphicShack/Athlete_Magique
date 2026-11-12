/*
 * AccesParametres.styles.js : l'apparence de AccesParametres (AccesParametres.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * AccesParametres.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Bouton rond jaune à contour noir et ombre « carton ».
export const BoutonRond = styled.button`
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
