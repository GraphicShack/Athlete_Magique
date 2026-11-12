/*
 * JournalEvenements.styles.js : l'apparence de JournalEvenements (JournalEvenements.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * JournalEvenements.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// La liste défile : elle prend la hauteur disponible dans une mise en page fixe, et au plus 22rem ailleurs.
export const ListeEvenements = styled(Liste)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
  max-height: 22rem;
`;

// Un événement : « Tour N » à gauche, le texte à droite.
export const Ligne = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.espace(5)};
  align-items: baseline;
  padding: ${({ theme }) => theme.espace(2.5)} ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  /* Teinte du panneau diluée ; l'événement le plus récent est un peu plus marqué. */
  background: ${({ $recent }) => ($recent ? 'color-mix(in srgb, var(--teinte) 40%, white)' : 'color-mix(in srgb, var(--teinte) 16%, white)')};
  font-size: ${({ theme }) => theme.texte.sm};
`;

// « Tour N », en gras, sans retour à la ligne.
export const Tour = styled.span`
  font-weight: ${({ theme }) => theme.graisses.forte};
  white-space: nowrap;
`;
