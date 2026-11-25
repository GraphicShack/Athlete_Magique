// Responsabilité : la fenêtre du duel (2 joueurs, 2 dés, le message pis les boutons).

import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import De from '@/components/commun/jeu/de/De.jsx';
import CartesJoueurs from '@/components/course/joueurs/CartesJoueurs.jsx';
import BoutonsAction from '@/components/course/tourActif/BoutonsAction.jsx';
import useDuel from '@/hooks/duel/useDuel.js';
import { messageDuel, boutonsDuel } from '@/utils/duel/textesDuel.js';
import { Message } from './FenetreDuel.styles.js';

// Props : duel (reçu du serveur, voir README), joueurs, idMoi.
function FenetreDuel({ duel, joueurs, idMoi }) {
  const { etape, ouverte, enCours, erreur, accepter, fermer, surArretDes } = useDuel(duel, duel.idDuelliste === idMoi);

  const duelliste = joueurs.find(({ id }) => id === duel.idDuelliste);
  const cible = joueurs.find(({ id }) => id === duel.idCible);

  const message = erreur ?? messageDuel(etape, { ...duel, duelliste, cible });
  const boutons = boutonsDuel(etape).map((bouton) => ({ ...bouton, inactif: enCours }));

  return (
    <FenetreModale ouverte={ouverte} onFermer={fermer} titre="Duel" teinte="tour" largeur="38rem">
      {(fermerAvecAnim) => {
        const gestes = { accepter, fermer: fermerAvecAnim };
        return (
          <>
            <CartesJoueurs joueurs={[duelliste, cible]} idEnEvidence={etape === 'resultat' ? duel.gagnant : null}>
              {({ id }) => <De valeur={duel.valeurs?.[id]} roule={etape === 'des'} onArret={surArretDes} />}
            </CartesJoueurs>
            <Message role="status">{message}</Message>
            <BoutonsAction actions={boutons} onAction={({ id }) => gestes[id]()} />
          </>
        );
      }}
    </FenetreModale>
  );
}

export default FenetreDuel;
