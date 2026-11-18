// Responsabilité : fait vivre le tour pour la démo (connecte le dé, les choix, les boutons pis le journal).
// Utilisé dans : CoursePage

import useLancerDe from '@/hooks/tour/useLancerDe.js';
import useChoixTour from '@/hooks/tour/useChoixTour.js';
import useDeplacementAnime from '@/hooks/tour/useDeplacementAnime.js';
import { phaseDuTour, ETAPE_DE_PHASE, CLES_ETAPES } from '@/utils/tour/phaseTour.js';
import { messageDuTour } from '@/utils/tour/messageTour.js';
import { boutonsDuTour } from '@/utils/tour/boutonsTour.js';
import { journaliser } from '@/services/journal/journal.js';
import { evenementLancer, evenementRelance } from '@/utils/tour/evenementsTour.js';
import { EFFETS } from '@/utils/tour/effetsBoutons.js';

// Le titre de la case quand y'a pas de pouvoir à cette étape.
const TITRES_ETAPES = { 1: 'Début du tour', 2: 'Lancer de dé', 3: 'Déplacement', 4: 'Fin du tour' };

// Renvoie tout ce que le panneau du tour a besoin (étape, message, boutons, dé, pion).
function useTourDemo(tour) {
  const lancer = useLancerDe(null);
  const choix = useChoixTour();
  // La case du pion : il avance case par case jusqu'à sa case de départ + les cases avancées.
  const pion = useDeplacementAnime(tour.position + choix.avance);
  const { apresLancer } = tour.etapes.lancer;

  // Le premier lancer ne compte pas comme une relance.
  const relances = Math.max(lancer.lancers - 1, 0);
  // Le nb de relances permises (ex. 2 pour le Magicien), s'il y en a.
  const maximum = apresLancer.find((bouton) => bouton.maximum)?.maximum;

  const phase = phaseDuTour({
    etape: choix.etape,
    termine: choix.termine,
    lancers: lancer.lancers,
    obtenu: lancer.obtenu,
    choixFait: choix.deplacement !== null,
    aUnPouvoir: apresLancer.length > 0,
    plusDeRelance: maximum !== undefined && relances >= maximum,
  });
  const etape = ETAPE_DE_PHASE[phase];

  // Le nb de cases à avancer : celui choisi, sinon la valeur du dé.
  const cases = choix.deplacement ?? lancer.obtenu;

  // Le dé s'est arrêté : on retient sa valeur pis on l'ajoute au journal.
  const surArret = (valeur) => {
    if (lancer.obtenu !== null) return;
    lancer.surArret(valeur);
    journaliser(
      lancer.lancers > 1
        ? evenementRelance(tour, { valeur, relance: lancer.lancers - 1, maximum })
        : evenementLancer(tour, valeur)
    );
  };

  // Le pouvoir n'est montré qu'à l'étape où il s'utilise.
  const aUnPouvoirIci = tour.etapes[CLES_ETAPES[etape]].pouvoir === true;
  const etat = { tour, obtenu: lancer.obtenu, relances, deplacement: cases };

  // Pendant que le pion avance, les boutons sont grisés (on attend qu'il soit arrivé).
  const boutons = boutonsDuTour(phase, etat);
  const actions = pion.enMouvement ? boutons.map((b) => ({ ...b, inactif: true })) : boutons;

  // Un clic : on retrouve le bouton, pis on applique son effet (voir utils/tour/effetsBoutons.js).
  const surAction = (id) => {
    const bouton = actions.find((b) => b.id === id);
    const ctx = { tour, lancer, choix, cases, journaliser };
    EFFETS[bouton?.effet]?.(ctx, bouton);
  };

  return {
    lancer: { ...lancer, surArret },
    etape,
    pouvoir: aUnPouvoirIci && phase !== 'termine' ? tour.pouvoir : null,
    titreEtape: TITRES_ETAPES[etape],
    // La case où dessiner le pion du joueur actif, celle qu'il vient de quitter, pis s'il avance.
    position: pion.position,
    depuis: pion.depuis,
    enMouvement: pion.enMouvement,
    message: messageDuTour(phase, etat),
    actions,
    surAction,
  };
}

export default useTourDemo;
