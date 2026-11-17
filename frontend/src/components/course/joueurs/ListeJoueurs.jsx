/*
 * ListeJoueurs.jsx : le panneau « Joueurs » de l'écran de course, avec les joueurs côte à côte,
 * dans leur ordre de jeu, comme un tableau des scores.
 *
 * Responsabilités :
 *   - afficher une CarteJoueur par joueur, et mettre en évidence celui dont c'est le tour ;
 *   - donner à chaque joueur la couleur de son pion (celle du thème selon son rang, par défaut) ;
 *   - avant le début de la course, afficher des places vides pour que le panneau garde sa forme.
 *
 * Props :
 *   joueurs : [{ id, nom, bot, couleur, personnage, position, etat, points }]
 *   idActif : id du joueur dont c'est le tour
 */
import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import CarteJoueur from './CarteJoueur.jsx';
import { Joueurs, PlaceVide } from './ListeJoueurs.styles.js';

const PLACES = 4; // nombre de places affichées quand la partie n'a pas encore commencé

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
