/*
 * LigneJoueur.jsx : une place de joueur sur la page Configuration, sur une seule ligne :
 *   (1) Joueur 1   [ Pseudo 1 .............. ]   [ Humain | Bot ]
 *
 * Responsabilité : afficher le numéro de la place (à la couleur de son pion sur la piste),
 * le champ du pseudo et le choix Humain / Bot. Sur un écran étroit, la ligne passe sur deux lignes.
 * Visuel seulement : les valeurs ne sont pas encore lues ni enregistrées.
 *
 * Props :
 *   numero      : 1 à 4
 *   couleur     : couleur du pion de ce joueur (theme.joueurs)
 *   type        : 'Humain' ou 'Bot', le choix coché au départ
 *   placeholder : texte d'exemple du champ, ex. « Pseudo 1 » ou « Bot 1 »
 */
import styled from 'styled-components';
import ChampTexte from '../commun/ChampTexte.jsx';
import BarreChoix from '../commun/reglages/BarreChoix.jsx';
import { rondCentre } from '../../styles/base/utilitaires.js';

function LigneJoueur({ numero, couleur, type, placeholder }) {
  return (
    <Carte $couleur={couleur}>
      <NomJoueur>
        <Pastille $couleur={couleur} aria-hidden="true">
          {numero}
        </Pastille>
        Joueur {numero}
      </NomJoueur>

      {/* L'étiquette est cachée : la ligne montre déjà de quel joueur il s'agit. */}
      <Pseudo>
        <ChampTexte etiquette={`Pseudo du joueur ${numero}`} etiquetteCachee placeholder={placeholder} />
      </Pseudo>

      <BarreChoix options={['Humain', 'Bot']} valeurParDefaut={type} aria-label={`Joueur ${numero} : humain ou bot`} />
    </Carte>
  );
}

// Carte blanche sur une ligne, avec une bande épaisse à gauche à la couleur du pion
// (comme CarteJoueur en course). Les éléments passent à la ligne s'ils manquent de place.
const Carte = styled.li`
  flex: 1; /* les lignes se partagent la hauteur de la liste… */
  max-height: 7rem; /* … sans devenir trop hautes */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-left: 10px solid ${({ $couleur }) => $couleur};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
`;

// La pastille et « Joueur N », côte à côte.
const NomJoueur = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
`;

// Le champ prend toute la place libre au milieu (au moins 10rem).
const Pseudo = styled.div`
  flex: 1 1 10rem;
`;

// Rond numéroté, à la couleur du pion.
const Pastille = styled.span`
  ${rondCentre}
  width: 2rem;
  height: 2rem;
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ $couleur }) => $couleur};
  font-family: ${({ theme }) => theme.polices.titre};
`;

export default LigneJoueur;
