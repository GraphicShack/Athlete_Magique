// Responsabilité : la page affichée quand une autre page plante (à la place de l'écran du routeur).

import Bouton from '@/components/commun/ui/Bouton.jsx';
import EcranErreur from '@/components/erreur/EcranErreur.jsx';

// L'erreur elle-même est dans la console, pour nous.
function PlantagePage() {
  return (
    <EcranErreur
      titre="Oups !"
      sousTitre="Le jeu a trébuché"
      message="Quelque chose a planté. Recharge la page pour te relever ; si ça recommence, retourne à l'accueil."
    >
      <Bouton onClick={() => window.location.reload()}>Recharger la page</Bouton>
    </EcranErreur>
  );
}

export default PlantagePage;
