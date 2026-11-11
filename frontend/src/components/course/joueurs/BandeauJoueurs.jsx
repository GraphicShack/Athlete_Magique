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
import styled, { useTheme } from 'styled-components';
import CarteJoueur from './CarteJoueur.jsx';

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

// Les cartes en ligne, qui défilent de côté si elles ne tiennent pas.
const Bandeau = styled.ol`
  list-style: none;
  margin: 0;
  /* Marge intérieure : laisse la place au cadre rétro de la carte active. */
  padding: ${({ theme }) => theme.espace(3)};
  display: flex;
  gap: ${({ theme }) => theme.espace(5)};
  overflow-x: auto; /* défile de côté si les cartes ne tiennent pas */

  & > * {
    flex: 1 0 14rem; /* chaque carte fait au moins 14rem et partage la place restante */
  }
`;

// Place vide : cadre en pointillés.
const PlaceVide = styled.li`
  padding: ${({ theme }) => theme.espace(4)};
  border: 2px dashed ${({ theme }) => theme.couleurs.texteSurPageDoux};
  border-radius: ${({ theme }) => theme.rayons.md};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
  font-size: ${({ theme }) => theme.texte.sm};
  text-align: center;
`;

export default BandeauJoueurs;
