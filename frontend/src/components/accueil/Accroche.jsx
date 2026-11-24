// Responsabilité : le gros logo, le slogan pis l'aperçu des persos sur l'accueil.

import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';
import imageLogo from '@/assets/images/logo.webp';
import { Bloc, GrandLogo, Slogan, Ligne, Texte } from './Accroche.styles.js';

// Affiche le logo, le slogan pis l'aperçu des persos.
function Accroche() {
  return (
    <Bloc>
      <GrandLogo src={imageLogo} alt="Athlète Magique" />

      <div>
        <Etiquette>1 à 4 joueurs · 3 courses · bots disponibles</Etiquette>
      </div>

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

export default Accroche;
