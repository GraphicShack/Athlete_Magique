// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : TableauHonneur

import styled from 'styled-components';

// Le filtre : choix coché en jaune, pour ressortir sur le bandeau orange du panneau.
export const Filtre = styled.span`
  --teinte: ${({ theme }) => theme.palette.jaune};
`;

// La zone du tableau (ou du message) : toujours la même hauteur, celle de 8 scores.
// S'il y en a plus, elle défile à l'intérieur ; scrollbar-gutter garde la place de la barre de défilement.
export const Zone = styled.div`
  height: 31rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;
