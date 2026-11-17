/*
 * useTourDemo.js : hook qui fait vivre le tour en cours pour la démo, en attendant le moteur de jeu.
 *
 * Responsabilités :
 *   - lancer le dé (hook useLancerDe) quand on clique « Lancer » ou « Relancer » ;
 *   - savoir où en est le tour (sa phase) et retenir le choix du joueur ;
 *   - donner l'étape, le message et les boutons à afficher (utils/textesTour.js).
 *
 * Les phases, par exemple pour le Magicien :
 *   1. 'lancer'  : « Lancer le dé »
 *   2. 'pouvoir' : « Relancer le dé (1 sur 2) » et « Garder le N »
 *   3. 'avancer' : « Avancer de N » (commun à tous)
 *   puis 'fini'  : le tour passe à l'étape « Déplacement principal ».
 * Entre deux, 'roule' : le dé roule et les boutons sont inactifs.
 * Un personnage sans pouvoir après le lancer passe directement de 1 à 3.
 * Une fois toutes les relances utilisées (Magicien), il n'y a plus de choix : on passe aussi à 3.
 *
 * Aucune vraie règle ici : le pion ne bouge pas. Plus tard, les choix seront envoyés au serveur.
 *
 * Utilisation :
 *   const tourDemo = useTourDemo(tour);
 *   <ControleurDeTourActif etapeCourante={tourDemo.etape} message={tourDemo.message}
 *     actions={tourDemo.actions} onAction={tourDemo.surAction} resultatDe={tourDemo.lancer.valeur} … />
 */
import { useState } from 'react';
import useLancerDe from '@/hooks/useLancerDe.js';
import { messageDuTour, actionsDuTour } from '@/utils/textesTour.js';

function useTourDemo(tour) {
  const lancer = useLancerDe(null);

  // Le nombre de cases choisi (null tant que le joueur n'a pas fixé son résultat).
  const [deplacement, setDeplacement] = useState(null);
  // true une fois que le joueur a cliqué « Avancer » (ou « Échanger »).
  const [fini, setFini] = useState(false);
  // Le message de fin, s'il est différent du message habituel (ex. échange du Flip Flop).
  const [messageFin, setMessageFin] = useState(null);

  // Le premier lancer ne compte pas comme une relance.
  const relances = Math.max(lancer.lancers - 1, 0);

  // true si un bouton à maximum (ex. « Relancer » du Magicien) est épuisé : le résultat est gardé.
  const plusDeRelance = tour.apresLancer.some((action) => action.maximum && relances >= action.maximum);

  // Où en est le tour.
  const phase = (() => {
    if (fini) return 'fini';
    if (lancer.lancers === 0) return 'lancer';
    if (lancer.obtenu === null) return 'roule';
    if (deplacement !== null || tour.apresLancer.length === 0 || plusDeRelance) return 'avancer';
    return 'pouvoir';
  })();

  // Le nombre de cases à avancer : celui choisi, sinon la valeur du dé.
  const cases = deplacement ?? lancer.obtenu;

  // Ce que fait chaque bouton, selon son id.
  const reactions = {
    lancer: lancer.relancer,
    relancer: lancer.relancer,
    garder: () => setDeplacement(lancer.obtenu),
    doubler: () => setDeplacement(lancer.obtenu * 2),
    avancer: () => setFini(true),
    echanger: () => {
      setMessageFin(`${tour.joueur} choisit avec qui échanger sa place.`);
      setFini(true);
    },
  };
  const surAction = (id) => reactions[id]?.();

  const etat = { tour, obtenu: lancer.obtenu, relances, deplacement: cases };

  return {
    lancer,
    etape: phase === 'fini' ? tour.etape + 1 : tour.etape,
    message: messageFin ?? messageDuTour(phase, etat),
    actions: actionsDuTour(phase, etat),
    surAction,
  };
}

export default useTourDemo;
