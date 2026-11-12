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
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import BarreChoix from '@/components/commun/ui/reglages/BarreChoix.jsx';
import { Carte, NomJoueur, Pseudo, Pastille } from './LigneJoueur.styles.js';

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

export default LigneJoueur;
