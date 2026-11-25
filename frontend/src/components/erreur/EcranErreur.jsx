// Responsabilité : l'écran commun des erreurs (gros titre, perso tombé, message pis boutons).

import Bouton from '@/components/commun/ui/Bouton.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { obtenirPersonnage } from '@/services/personnages.js';
import CHEMINS from '@/chemins.js';
import { Ecran, Tombe, SousTitre, Message, Actions } from './EcranErreur.styles.js';

// C'est toujours Banana qui fait trébucher.
const BANANA = obtenirPersonnage('banana');

// Props : titre (ex. « 404 »), sousTitre, message, children (un bouton de plus, optionnel).
function EcranErreur({ titre, sousTitre, message, children }) {
  return (
    <Ecran>
      <TitreArcEnCiel>{titre}</TitreArcEnCiel>
      <Tombe src={BANANA.image} alt="" />
      <SousTitre>{sousTitre}</SousTitre>
      <Message>{message}</Message>
      <Actions>
        {children}
        <Bouton to={CHEMINS.accueil} variante={children ? 'secondaire' : 'principal'}>
          Retour à l'accueil
        </Bouton>
      </Actions>
    </Ecran>
  );
}

export default EcranErreur;
