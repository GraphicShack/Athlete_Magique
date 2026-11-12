/*
 * Accroche.jsx : la présentation du jeu en haut de l'accueil.
 *
 * Responsabilité : afficher une étiquette, le grand slogan coloré, un court texte
 * et le bouton « Lire les règles ». Affichage seulement : aucun état, aucune logique.
 */
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc, Slogan, Ligne, Texte } from './Accroche.styles.js';

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

export default Accroche;
