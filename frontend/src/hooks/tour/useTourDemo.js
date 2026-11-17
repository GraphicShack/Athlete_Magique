/*
 * useTourDemo.js : hook qui fait vivre le tour en cours pour la démo.
 *
 * C'est un fichier qui connecte : il ne fait rien lui-même, il relie
 *   - useLancerDe    : le dé ;
 *   - useChoixTour   : les choix du joueur ;
 *   - useDeplacementAnime : le pion qui avance case par case après la confirmation ;
 *   - phaseTour      : où en est le tour ;
 *   - messageTour    : le message affiché ;
 *   - boutonsTour    : les boutons affichés ;
 *   - evenementsTour + journal : le début et la fin du tour, et les actions qui changent la
 *     partie (pouvoirs, dé) sont ajoutés au journal. « Confirmer » (sans pouvoir) ne l'est pas.
 *
 * Les 4 étapes, chacune avec son pouvoir si le personnage en a un à ce moment :
 *   1. Début du tour  : « Commencer le tour »      (Hypnotiste, Party Animal : leur pouvoir)
 *   2. Lancer du dé   : « Lancer le dé »           (Magicien, Scientifique Fusé, Flip Flop)
 *   3. Déplacement    : « Confirmer : avancer de N » (Lièvre, Centaure)
 *   4. Fin du tour    : « Fin du tour »
 *
 * Utilisation :
 *   const tourDemo = useTourDemo(tour);
 *   <ControleurDeTourActif etapeCourante={tourDemo.etape} pouvoir={tourDemo.pouvoir} … />
 *   tourDemo.position    : la case où dessiner le pion du joueur actif (il avance case par case)
 *   tourDemo.depuis      : la case qu'il vient de quitter (pour le saut en arc), ou null
 *   tourDemo.enMouvement : true pendant que le pion avance
 */
import useLancerDe from '@/hooks/tour/useLancerDe.js';
import useChoixTour from '@/hooks/tour/useChoixTour.js';
import useDeplacementAnime from '@/hooks/tour/useDeplacementAnime.js';
import { phaseDuTour, ETAPE_DE_PHASE, CLES_ETAPES } from '@/utils/tour/phaseTour.js';
import { messageDuTour } from '@/utils/tour/messageTour.js';
import { boutonsDuTour } from '@/utils/tour/boutonsTour.js';
import { journaliser } from '@/services/journal/journal.js';
import {
  evenementDebutTour,
  evenementFinTour,
  evenementHypnose,
  evenementRassemblement,
  evenementLancer,
  evenementRelance,
  evenementGarder,
  evenementDoubler,
  evenementEchanger,
  evenementDeplacementPouvoir,
} from '@/utils/tour/evenementsTour.js';

// Le titre de la case quand il n'y a pas de pouvoir à cette étape.
const TITRES_ETAPES = { 1: 'Début du tour', 2: 'Lancer de dé', 3: 'Déplacement', 4: 'Fin du tour' };

function useTourDemo(tour) {
  const lancer = useLancerDe(null);
  const choix = useChoixTour();
  // La case du pion : il avance case par case jusqu'à sa case de départ + les cases avancées.
  const pion = useDeplacementAnime(tour.position + choix.avance);
  const { apresLancer } = tour.etapes.lancer;

  // Le premier lancer ne compte pas comme une relance.
  const relances = Math.max(lancer.lancers - 1, 0);
  // Le nombre de relances permises (ex. 2 pour le Magicien), s'il y en a.
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

  // Quitter l'étape 1 : le tour commence (journalisé), puis on passe au lancer du dé.
  const commencer = () => {
    journaliser(evenementDebutTour(tour));
    choix.passerA(2);
  };

  // Ce que fait chaque bouton, selon son id.
  const reactions = {
    // 1. Début du tour
    commencer,
    hypnotiser: () => {
      commencer();
      journaliser(evenementHypnose(tour));
    },
    rassembler: () => {
      commencer();
      journaliser(evenementRassemblement(tour));
    },
    // 2. Lancer du dé
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
    echanger: () => {
      journaliser(evenementEchanger(tour));
      choix.passerA(4); // l'échange remplace le lancer et le déplacement
    },
    // 3. Déplacement : le pion avance, puis on passe à la fin du tour.
    confirmer: () => {
      choix.avancer(cases);
      choix.passerA(4);
    },
    avancerLievre: () => {
      choix.avancer(cases + 2);
      journaliser(evenementDeplacementPouvoir(tour, cases + 2));
      choix.passerA(4);
    },
    avancerCentaure: () => {
      choix.avancer(cases);
      journaliser(evenementDeplacementPouvoir(tour, cases));
      choix.passerA(4);
    },
    // 4. Fin du tour
    finir: () => {
      journaliser(evenementFinTour(tour));
      choix.terminer();
    },
  };
  const surAction = (id) => reactions[id]?.();

  // Le pouvoir n'est montré qu'à l'étape où il s'utilise.
  const aUnPouvoirIci = tour.etapes[CLES_ETAPES[etape]].pouvoir === true;
  const etat = { tour, obtenu: lancer.obtenu, relances, deplacement: cases };

  // Pendant que le pion avance, les boutons sont grisés (on attend qu'il soit arrivé).
  const boutons = boutonsDuTour(phase, etat);
  const actions = pion.enMouvement ? boutons.map((b) => ({ ...b, inactif: true })) : boutons;

  return {
    lancer: { ...lancer, surArret },
    etape,
    pouvoir: aUnPouvoirIci && phase !== 'termine' ? tour.pouvoir : null,
    titreEtape: TITRES_ETAPES[etape],
    // La case où dessiner le pion du joueur actif, celle qu'il vient de quitter, et s'il avance.
    position: pion.position,
    depuis: pion.depuis,
    enMouvement: pion.enMouvement,
    message: messageDuTour(phase, etat),
    actions,
    surAction,
  };
}

export default useTourDemo;
