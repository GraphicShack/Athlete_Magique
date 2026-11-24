// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Bouton rond jaune à contour noir pis ombre « carton ».
export const BoutonRond = styled.button`
  --fond-bouton: ${({ theme }) => theme.teintes.parametres};
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

  &:hover svg {
    rotate: 68deg;
  }
`;
