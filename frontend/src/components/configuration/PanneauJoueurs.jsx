/*
 * PanneauJoueurs.jsx : le panneau « Les joueurs » de la page Configuration.
 *
 * Responsabilités :
 *   - proposer le nombre de joueurs (2, 3 ou 4) ;
 *   - afficher une LigneJoueur par place (humain ou bot, et son pseudo).
 *
 * Visuel seulement pour l'instant : les places affichées sont un exemple fixe
 * (2 humains et 1 bot) et ne suivent pas encore le nombre choisi.
 */
import { useId } from 'react';
import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import BarreChoix from '@/components/commun/ui/reglages/BarreChoix.jsx';
import LigneJoueur from './LigneJoueur.jsx';
import { Aide, SousTitre, ListePlaces } from './PanneauJoueurs.styles.js';

// Provisoire : places d'exemple, en attendant que le nombre de joueurs soit branché.
const PLACES_EXEMPLE = [
  { numero: 1, type: 'Humain', placeholder: 'Pseudo 1' },
  { numero: 2, type: 'Humain', placeholder: 'Pseudo 2' },
  { numero: 3, type: 'Bot', placeholder: 'Bot 1' },
];

function PanneauJoueurs() {
  const theme = useTheme();
  const idNombre = useId(); // relie la barre 2 · 3 · 4 à son titre

  return (
    <Panneau titre="Les joueurs" teinte="joueurs" enEvidence>
      <SousTitre id={idNombre}>Nombre de joueurs</SousTitre>
      <BarreChoix options={['2', '3', '4']} valeurParDefaut="3" aria-labelledby={idNombre} />
      <Aide>Complétez avec des bots si des joueurs manquent. Au moins un joueur humain.</Aide>

      <SousTitre>Qui joue ?</SousTitre>
      <ListePlaces>
        {PLACES_EXEMPLE.map((place, rang) => (
          // Chaque place prend la couleur de pion du thème selon son rang.
          <LigneJoueur key={place.numero} {...place} couleur={theme.joueurs[rang]} />
        ))}
      </ListePlaces>
    </Panneau>
  );
}

export default PanneauJoueurs;
