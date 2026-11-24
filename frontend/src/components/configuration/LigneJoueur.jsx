// Responsabilité : un joueur dans le salon (numéro, nom, hôte/bot, prêt ou pas, bouton Retirer).

import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import PetitBouton from '@/components/commun/ui/PetitBouton.jsx';
import { Carte, NomJoueur, Pastille, Statut } from './LigneJoueur.styles.js';

// Affiche la ligne du joueur ; « Retirer » appelle onRetirer.
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
