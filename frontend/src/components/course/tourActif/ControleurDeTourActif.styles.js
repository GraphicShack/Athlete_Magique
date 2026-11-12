/*
 * ControleurDeTourActif.styles.js : l'apparence de ControleurDeTourActif (ControleurDeTourActif.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * ControleurDeTourActif.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Bandeau du panneau : avatar du personnage, puis « À toi de jouer » et son nom.
export const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
`;

export const SurTitre = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

export const NomPersonnage = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
`;

// Le dé et le message, côte à côte.
export const Resultat = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.espace(4)};
  margin-top: ${({ theme }) => theme.espace(4)};

  p {
    margin: 0;
  }
`;

// Encadré du pouvoir à utiliser.
export const Pouvoir = styled.div`
  margin-top: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: color-mix(in srgb, var(--teinte) 25%, white); /* teinte du panneau, très diluée */

  p {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.texte.sm};
  }
`;

export const TitrePouvoir = styled.h3`
  font-family: ${({ theme }) => theme.polices.texte};
  font-size: ${({ theme }) => theme.texte.md};
  margin-bottom: ${({ theme }) => theme.espace(2)};
`;

// Les boutons d'action, en colonnes d'au moins 8rem.
export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.espace(2)};
  margin-top: ${({ theme }) => theme.espace(3)};
`;
