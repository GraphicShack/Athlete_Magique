// Responsabilité : affiche les points gagnés en gros (« +1 »).

import { Pile, Gain } from './Gains.styles.js';

// Props : gains ([{ id, points }]).
// aria-hidden : le journal dit déjà la même chose aux lecteurs d'écran.
function Gains({ gains }) {
  return (
    <Pile aria-hidden="true">
      {gains.map(({ id, points }) => (
        <Gain key={id}>+{points}</Gain>
      ))}
    </Pile>
  );
}

export default Gains;
