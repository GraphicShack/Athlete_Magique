import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import Liste from '../commun/Liste.jsx';
import MessageVide from '../commun/MessageVide.jsx';

/**
 * Historique textuel de la course : lancers, déplacements, pouvoirs déclenchés.
 * Composant d'affichage uniquement : il montre les événements reçus, du plus récent au plus ancien.
 *
 * evenements : [{ id, tour, texte }]
 */
function JournalEvenements({ evenements = [] }) {
  return (
    <Panneau titre="Journal d'événements">
      {evenements.length === 0 ? (
        <MessageVide>Aucun événement pour l'instant.</MessageVide>
      ) : (
        <ListeEvenements $defilante aria-live="polite">
          {evenements.map(({ id, tour, texte }, i) => (
            <Ligne key={id} $recent={i === 0}>
              <Tour>Tour {tour}</Tour>
              <span>{texte}</span>
            </Ligne>
          ))}
        </ListeEvenements>
      )}
    </Panneau>
  );
}

// Défilante : prend la hauteur disponible dans une mise en page fixe, et au plus 22rem ailleurs.
const ListeEvenements = styled(Liste)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
  max-height: 22rem;
`;

const Ligne = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.espace(5)};
  align-items: baseline;
  padding: ${({ theme }) => theme.espace(2.5)} ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme, $recent }) => ($recent ? theme.couleurs.gris200 : theme.couleurs.gris100)};
  font-size: ${({ theme }) => theme.texte.sm};
`;

const Tour = styled.span`
  font-weight: ${({ theme }) => theme.graisses.forte};
  white-space: nowrap;
`;

export default JournalEvenements;
