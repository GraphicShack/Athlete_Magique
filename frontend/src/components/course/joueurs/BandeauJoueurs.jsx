/*
 * BandeauJoueurs.jsx : les joueurs côte à côte, dans leur ordre de jeu, comme un tableau des scores.
 *
 * Responsabilités :
 *   - afficher une CarteJoueur par joueur, et mettre en évidence celui dont c'est le tour ;
 *   - donner à chaque joueur la couleur de son pion (celle du thème selon son rang, par défaut) ;
 *   - avant le début de la course, afficher des places vides pour que la page garde sa forme.
 * Sur un petit écran, le bandeau défile de côté.
 *
 * Props :
 *   joueurs : [{ id, nom, bot, couleur, personnage, position, etat, points }]
 *   idActif : id du joueur dont c'est le tour
 */
import { useTheme } from 'styled-components';
import CarteJoueur from './CarteJoueur.jsx';
import { Bandeau, PlaceVide } from './BandeauJoueurs.styles.js';

const PLACES = 4; // nombre de places affichées quand la partie n'a pas encore commencé

function BandeauJoueurs({ joueurs = [], idActif = null }) {
  const theme = useTheme();

  // Avant le début de la course : des places vides, pour que la page garde sa forme.
  if (joueurs.length === 0) {
    return (
      <Bandeau aria-label="Joueurs">
        {Array.from({ length: PLACES }, (_, rang) => (
          <PlaceVide key={rang}>En attente d'un joueur…</PlaceVide>
        ))}
      </Bandeau>
    );
  }

  return (
    <Bandeau aria-label="Joueurs, dans l'ordre de jeu">
      {joueurs.map((joueur, rang) => (
        <CarteJoueur
          key={joueur.id}
          joueur={{ ...joueur, couleur: joueur.couleur ?? theme.joueurs[rang] }}
          actif={joueur.id === idActif}
        />
      ))}
    </Bandeau>
  );
}

export default BandeauJoueurs;
