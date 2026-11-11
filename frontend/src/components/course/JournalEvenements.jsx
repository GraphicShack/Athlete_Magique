/*
 * JournalEvenements.jsx : l'historique de la course (lancers, déplacements, pouvoirs déclenchés).
 *
 * Responsabilité : afficher les événements reçus, du plus récent au plus ancien,
 * le plus récent un peu plus coloré. Affichage seulement : il ne crée aucun événement.
 *
 * Props :
 *   evenements : [{ id, tour, texte }]
 */
import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import Liste from '../commun/Liste.jsx';
import MessageVide from '../commun/MessageVide.jsx';

function JournalEvenements({ evenements = [] }) {
  return (
    <Panneau titre="Journal d'événements" teinte="journal">
      {evenements.length === 0 ? (
        <MessageVide>Aucun événement pour l'instant.</MessageVide>
      ) : (
        // aria-live : les lecteurs d'écran annoncent les nouveaux événements.
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

// La liste défile : elle prend la hauteur disponible dans une mise en page fixe, et au plus 22rem ailleurs.
const ListeEvenements = styled(Liste)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
  max-height: 22rem;
`;

// Un événement : « Tour N » à gauche, le texte à droite.
const Ligne = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.espace(5)};
  align-items: baseline;
  padding: ${({ theme }) => theme.espace(2.5)} ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  /* Teinte du panneau diluée ; l'événement le plus récent est un peu plus marqué. */
  background: ${({ $recent }) => ($recent ? 'color-mix(in srgb, var(--teinte) 40%, white)' : 'color-mix(in srgb, var(--teinte) 16%, white)')};
  font-size: ${({ theme }) => theme.texte.sm};
`;

// « Tour N », en gras, sans retour à la ligne.
const Tour = styled.span`
  font-weight: ${({ theme }) => theme.graisses.forte};
  white-space: nowrap;
`;

export default JournalEvenements;
