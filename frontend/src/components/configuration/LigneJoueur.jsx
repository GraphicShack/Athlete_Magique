/*
 * LigneJoueur.jsx : un joueur dans la salle d'attente, sur une seule ligne :
 *   (1) Félix  [Hôte]                       ● Prêt      [Retirer]
 *
 * Responsabilité : afficher le numéro (à la couleur de son pion), le nom, s'il est l'hôte
 * ou un bot, s'il est prêt, et le bouton « Retirer » si on peut le retirer.
 *
 * Props :
 *   numero      : 1 à 4
 *   couleur     : couleur du pion de ce joueur (theme.joueurs)
 *   nom         : son pseudo
 *   hote        : true si c'est l'hôte
 *   bot         : true si c'est un bot
 *   pret        : true s'il est prêt
 *   peutRetirer : true pour afficher « Retirer » (seul l'hôte peut retirer les autres)
 *   onRetirer   : appelé au clic sur « Retirer »
 */
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import PetitBouton from '@/components/commun/ui/PetitBouton.jsx';
import { Carte, NomJoueur, Pastille, Statut } from './LigneJoueur.styles.js';

function LigneJoueur({ numero, couleur, nom, hote = false, bot = false, pret = false, peutRetirer = false, onRetirer }) {
  return (
    <Carte $couleur={couleur}>
      <NomJoueur>
        <Pastille $couleur={couleur} aria-hidden="true">
          {numero}
        </Pastille>
        {nom}
      </NomJoueur>

      {hote && <Etiquette>Hôte</Etiquette>}
      {bot && <Etiquette>Bot</Etiquette>}

      <Statut $pret={pret}>{pret ? 'Prêt' : 'En attente'}</Statut>

      {peutRetirer && (
        <PetitBouton onClick={onRetirer} aria-label={`Retirer ${nom}`}>
          Retirer
        </PetitBouton>
      )}
    </Carte>
  );
}

export default LigneJoueur;
