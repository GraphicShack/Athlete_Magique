/*
 * JournalEvenements.jsx : l'historique de la course (lancers, déplacements, pouvoirs déclenchés).
 *
 * Responsabilité : afficher les événements reçus, du plus récent au plus ancien,
 * le plus récent un peu plus coloré. Affichage seulement : il ne crée aucun événement.
 *
 * Props :
 *   evenements : [{ id, tour, texte }]
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import { ListeEvenements, Ligne, Tour } from './JournalEvenements.styles.js';

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

export default JournalEvenements;
