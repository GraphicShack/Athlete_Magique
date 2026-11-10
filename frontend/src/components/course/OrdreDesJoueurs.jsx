import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import AvatarPersonnage from '../commun/AvatarPersonnage.jsx';
import Liste from '../commun/Liste.jsx';
import MessageVide from '../commun/MessageVide.jsx';
import { NOMBRE_CASES } from './piste/dispositionPiste.js';

const ETATS = { tombe: 'tombé', elimine: 'éliminé' };

const textePosition = (position) => {
  if (position === 0) return 'Départ';
  if (position > NOMBRE_CASES) return 'Arrivé';
  return `Case ${position}`;
};

const textePoints = (points) => `${points} ${points > 1 ? 'pts' : 'pt'}`;

/**
 * Les joueurs dans leur ordre de jeu, avec leur personnage, leur case et leurs points.
 *
 * joueurs : [{ id, nom, bot, personnage: { id, nom, initiales }, position, etat, points }]
 *           etat : 'debout' | 'tombe' | 'elimine'
 * idActif : id du joueur dont c'est le tour (mis en évidence)
 */
function OrdreDesJoueurs({ joueurs = [], idActif = null }) {
  return (
    <Panneau titre="Joueurs">
      {joueurs.length === 0 ? (
        <MessageVide>Aucun joueur pour l'instant.</MessageVide>
      ) : (
        <ListeJoueurs $defilante>
          {joueurs.map(({ id, nom, bot, personnage, position, etat, points }) => (
            <Ligne key={id} $actif={id === idActif} aria-current={id === idActif ? 'true' : undefined}>
              <AvatarPersonnage id={personnage.id} initiales={personnage.initiales} />
              <Identite>
                <Nom>
                  {nom}
                  {bot && ' (bot)'} · {personnage.nom}
                </Nom>
                <Detail>
                  {textePosition(position)}
                  {ETATS[etat] && ` · ${ETATS[etat]}`}
                </Detail>
              </Identite>
              <Points>{textePoints(points)}</Points>
            </Ligne>
          ))}
        </ListeJoueurs>
      )}
    </Panneau>
  );
}

const ListeJoueurs = styled(Liste)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(1)};
`;

const Ligne = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  padding: ${({ theme }) => theme.espace(1.5)} ${({ theme }) => theme.espace(2)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme, $actif }) => ($actif ? theme.couleurs.gris100 : 'transparent')};
`;

const Identite = styled.div`
  min-width: 0;
`;

const Nom = styled.div`
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;

const Detail = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

const Points = styled.div`
  font-size: ${({ theme }) => theme.texte.lg};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
`;

export default OrdreDesJoueurs;
