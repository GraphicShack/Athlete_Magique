// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { COURBE, grandir } from '@/styles/animations/animations.js';

export const Grille = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.ecrans.sm}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-template-columns: repeat(10, 1fr);
  }
  gap: ${({ theme }) => theme.espace(2)};
`;

// Un bouton sans apparence de bouton : il rend le perso cliquable pis accessible au clavier.
export const Personnage = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.espace(1)};
  width: 100%;
  padding: ${({ theme }) => theme.espace(1)};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.rayons.md};
  background: transparent;
  color: inherit;
  text-align: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  img {
    transition: transform ${({ theme }) => theme.transition};
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.couleurs.encre};
    background: color-mix(in srgb, var(--teinte) 22%, white);
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.12) rotate(-4deg);
  }
`;

export const Portrait = styled.img`
  display: block;
  width: 3.25rem;
  height: 3.25rem;
  object-fit: contain;
  border-radius: 50%;
`;

export const Nom = styled.span`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

// Bulle de bande dessinée posée au-dessus du personnage.
export const Bulle = styled.div`
  --couleur-bouton: ${({ theme }) => theme.teintes.personnages};

  position: absolute;
  inset: auto;
  margin: 0;
  translate: 0 -100%;
  transform-origin: var(--pointe) 100%;
  overflow: visible;

  width: min(20rem, calc(100vw - 2rem));
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  box-shadow: ${({ theme }) => theme.ombres.bloc};

  &:popover-open {
    animation: ${grandir} 450ms ${COURBE};
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: var(--pointe);
    width: 14px;
    height: 14px;
    translate: -50% -50%;
    rotate: 45deg;
    border-right: ${({ theme }) => theme.bordures.contour};
    border-bottom: ${({ theme }) => theme.bordures.contour};
    background: ${({ theme }) => theme.couleurs.surface};
  }

  &::backdrop {
    background: transparent;
  }
`;

// Même style que les titres des bandeaux : italique très gras, dans la teinte des personnages.
export const NomPouvoir = styled.strong`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.espace(2)};
  padding: 0 ${({ theme }) => theme.espace(2)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.teintes.personnages};
  font-family: ${({ theme }) => theme.polices.titre};
  font-style: italic;
  font-weight: 900;
`;

export const Pouvoir = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.sm};
`;
