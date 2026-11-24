// Responsabilité : une place vide dans le salon (avec « Ajouter un bot » pour l'hôte).

import { Carte, Texte } from './PlaceLibre.styles.js';
import PetitBouton from '@/components/commun/ui/PetitBouton.jsx';

// Affiche la place vide ; « Ajouter un bot » appelle onAjouter.
function PlaceLibre({ numero, peutAjouter = false, onAjouter }) {
  return (
    <Carte>
      <Texte>Place {numero} : en attente d’un joueur…</Texte>
      {peutAjouter && (
        <PetitBouton onClick={onAjouter}>
          Ajouter un bot
        </PetitBouton>
      )}
    </Carte>
  );
}

export default PlaceLibre;
