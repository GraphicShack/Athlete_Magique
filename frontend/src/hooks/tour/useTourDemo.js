/*
 * useTourDemo.js : hook qui fait vivre le tour en cours pour la démo.
 *
 * C'est un fichier qui connecte : il ne fait rien lui-même, il relie
 *   - useLancerDe    : le dé ;
 *   - useChoixTour   : les choix du joueur ;
 *   - phaseTour      : où en est le tour ;
 *   - messageTour    : le message affiché ;
 *   - boutonsTour    : les boutons affichés ;
 *   - evenementsTour + journal : chaque action du joueur est ajoutée au journal.
 *
 * Les phases, par exemple pour le Magicien :
 *   1. « Lancer le dé »
 *   2. « Relancer le dé (1 sur 2) » et « Garder le N »
 *   3. « Avancer de N » (commun à tous)
 *
 * Utilisation :
 *   const tourDemo = useTourDemo(tour);
 *   <ControleurDeTourActif etapeCourante={tourDemo.etape} message={tourDemo.message}
 *     actions={tourDemo.actions} onAction={tourDemo.surAction} resultatDe={tourDemo.lancer.valeur} … />
 */
import useLancerDe from '@/hooks/tour/useLancerDe.js';
import useChoixTour from '@/hooks/tour/useChoixTour.js';
import { phaseDuTour } from '@/utils/tour/phaseTour.js';
import { messageDuTour } from '@/utils/tour/messageTour.js';
import { boutonsDuTour } from '@/utils/tour/boutonsTour.js';
import { journaliser } from '@/services/journal/journal.js';
import {
  evenementLancer,
  evenementRelance,
  evenementGarder,
  evenementDoubler,
  evenementEchanger,
  evenementAvancer,
} from '@/utils/tour/evenementsTour.js';

function useTourDemo(tour) {
  const lancer = useLancerDe(null);
  const choix = useChoixTour();

  // Le premier lancer ne compte pas comme une relance.
  const relances = Math.max(lancer.lancers - 1, 0);
  // Le nombre de relances permises (ex. 2 pour le Magicien), s'il y en a.
  const maximum = tour.apresLancer.find((bouton) => bouton.maximum)?.maximum;

  const phase = phaseDuTour({
    fini: choix.fini,
    lancers: lancer.lancers,
    obtenu: lancer.obtenu,
    choixFait: choix.deplacement !== null,
    aUnPouvoir: tour.apresLancer.length > 0,
    plusDeRelance: maximum !== undefined && relances >= maximum,
  });

  // Le nombre de cases à avancer : celui choisi, sinon la valeur du dé.
  const cases = choix.deplacement ?? lancer.obtenu;

  // Le dé s'est arrêté : on retient sa valeur et on l'ajoute au journal.
  const surArret = (valeur) => {
    lancer.surArret(valeur);
    journaliser(
      lancer.lancers > 1
        ? evenementRelance(tour, { valeur, relance: lancer.lancers - 1, maximum })
        : evenementLancer(tour, valeur)
    );
  };

  // Ce que fait chaque bouton, selon son id. Chaque choix est aussi ajouté au journal.
  const reactions = {
    lancer: lancer.relancer,
    relancer: lancer.relancer,
    garder: () => {
      choix.choisirDeplacement(lancer.obtenu);
      journaliser(evenementGarder(tour, lancer.obtenu));
    },
    doubler: () => {
      choix.choisirDeplacement(lancer.obtenu * 2);
      journaliser(evenementDoubler(tour, lancer.obtenu * 2));
    },
    avancer: () => {
      choix.terminer();
      journaliser(evenementAvancer(tour, cases));
    },
    echanger: () => {
      choix.terminer(`${tour.joueur} choisit avec qui échanger sa place.`);
      journaliser(evenementEchanger(tour));
    },
  };
  const surAction = (id) => reactions[id]?.();

  const etat = { tour, obtenu: lancer.obtenu, relances, deplacement: cases };

  return {
    lancer: { ...lancer, surArret },
    etape: phase === 'fini' ? tour.etape + 1 : tour.etape,
    message: choix.messageFin ?? messageDuTour(phase, etat),
    actions: boutonsDuTour(phase, etat),
    surAction,
  };
}

export default useTourDemo;
