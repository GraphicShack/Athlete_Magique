/*
 * Accroche.jsx : la présentation du jeu en haut de l'accueil.
 *
 * Responsabilité : afficher une étiquette, le grand slogan coloré, un court texte
 * et le bouton « Lire les règles ». Affichage seulement : aucun état, aucune logique.
 */
import styled from 'styled-components';
import Etiquette from '../commun/Etiquette.jsx';
import Bouton from '../commun/Bouton.jsx';
import CHEMINS from '../../chemins.js';

function Accroche() {
  return (
    <Bloc>
      <div>
        <Etiquette>1 à 4 joueurs · 3 courses · bots disponibles</Etiquette>
      </div>

      {/* Chaque phrase du slogan a sa couleur, comme les titres du livret.
          Les espaces {' '} séparent les phrases pour les lecteurs d'écran. */}
      <Slogan>
        <Ligne $couleur="jaune">Avancez.</Ligne>{' '}
        <Ligne $couleur="rose">Trébuchez.</Ligne>{' '}
        <Ligne $couleur="cyan">Faites trébucher les autres.</Ligne>
      </Slogan>

      <Texte>
        Chaque personnage a un pouvoir qui change les règles. Lancez le dé, utilisez le bon pouvoir au bon
        moment et terminez avec le plus de points.
      </Texte>

      <div>
        <Bouton to={CHEMINS.regles} variante="secondaire">
          Lire les règles
        </Bouton>
      </div>
    </Bloc>
  );
}

// Les éléments l'un sous l'autre.
const Bloc = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(5)};
`;

// Grand slogan en italique très gras ; sa taille suit la largeur de l'écran.
const Slogan = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
`;

// Une ligne du slogan, dans une couleur de la palette (ex. $couleur="jaune").
const Ligne = styled.span`
  display: block;
  color: ${({ theme, $couleur }) => theme.palette[$couleur]};
`;

// Court texte en gris clair, sur une largeur limitée pour rester lisible.
const Texte = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: ${({ theme }) => theme.texte.lg};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

export default Accroche;
