// Responsabilité : le panneau « Joueurs » de la course, dans l'ordre de jeu.
// Utilisé dans : CoursePage

import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import CarteJoueur from './CarteJoueur.jsx';
import { Joueurs, PlaceVide } from './ListeJoueurs.styles.js';

const PLACES = 4; // nombre de places affichées quand la partie n'a pas encore commencé

// Affiche une carte par joueur (ou des places vides avant la course).
function ListeJoueurs({ joueurs = [], idActif = null }) {
  const theme = useTheme();

  return (
    <Panneau titre="Joueurs" teinte="joueurs">
      {joueurs.length === 0 ? (
        // Avant le début de la course : des places vides.
        <Joueurs aria-label="Joueurs">
          {Array.from({ length: PLACES }, (_, rang) => (
            <PlaceVide key={rang}>En attente d'un joueur…</PlaceVide>
          ))}
        </Joueurs>
      ) : (
        <Joueurs aria-label="Joueurs, dans l'ordre de jeu">
          {joueurs.map((joueur, rang) => (
            <CarteJoueur
              key={joueur.id}
              joueur={{ ...joueur, couleur: joueur.couleur ?? theme.joueurs[rang] }}
              actif={joueur.id === idActif}
            />
          ))}
        </Joueurs>
      )}
    </Panneau>
  );
}

export default ListeJoueurs;
