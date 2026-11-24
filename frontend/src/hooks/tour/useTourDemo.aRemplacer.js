// Responsabilité : fait vivre le tour pour la démo (garde l'état, applique les actions, prépare l'affichage).

import { useState } from 'react';
import useDeplacementAnime from '@/hooks/tour/useDeplacementAnime.js';
import { ETAT_DEPART, ACTIONS, arreterDe } from '@/utils/tour/actionsTour.aRemplacer.js';
import { ETAPES } from '@/utils/tour/etapesTour.js';
import { journaliser } from '@/services/journal/journal.js';
import { finirTour } from '@/services/serveur/finCourse.js';
import { lancerDe } from '@/services/de.aSupprimer.js';

// Renvoie tout ce que le panneau du tour a besoin (étape, message, boutons, dé, pion).
function useTourDemo(tour) {
  const [etat, setEtat] = useState(ETAT_DEPART);
  // Le pion avance case par case jusqu'à sa case de départ + les cases avancées.
  const pion = useDeplacementAnime(tour.position + etat.avance);

  // Applique le résultat d'une action : le nouvel état d'un coup, puis ses événements au journal.
  const appliquer = ({ etat: nouvelEtat, evenements }) => {
    setEtat(nouvelEtat);
    evenements.forEach(journaliser);
  };

  // Un clic sur un bouton : on fait son action (son « effet » dans les données).
  // On tire un dé à chaque clic ; seule l'action « lancer » s'en sert.
  const surAction = (bouton) => {
    appliquer(ACTIONS[bouton.effet](etat, { tour, bouton, nouveauDe: lancerDe() }));
    if (bouton.effet === 'terminer') finirTour();
  };

  // Le dé a fini de rouler.
  const surArretDe = () => appliquer(arreterDe(etat, tour));

  // L'étape actuelle (numéro, titre, boutons, message) : voir utils/tour/etapesTour.js.
  const etape = ETAPES[etat.etape];

  // Les infos du moment, pour les libellés qui sont des fonctions (voir data/exemples/deroulementTour.aRemplacer.js).
  // Pendant que le dé roule, on cache sa valeur pis la relance en cours compte pas encore.
  const infos = {
    valeurDe: etat.roule ? '…' : etat.valeurDe,
    relances: Math.max(etat.lancers - (etat.roule ? 2 : 1), 0),
    relancesMax: tour.etapes.lancer.relancesMax,
  };

  // Les boutons avec leur libellé final ; tous grisés pendant que le dé roule ou que le pion avance.
  const actions = etape.boutons(tour, etat).map((bouton) => {
    const cases = etat.cases + (bouton.bonus ?? 0); // ce que le pion avancera avec ce bouton
    const libelle = typeof bouton.libelle === 'function' ? bouton.libelle({ ...infos, cases }) : bouton.libelle;
    return { ...bouton, libelle, inactif: etat.roule || pion.enMouvement };
  });

  return {
    etape: etape.numero,
    titreEtape: etape.titre,
    // Le pouvoir est montré seulement à l'étape où il sert.
    pouvoir: tour.etapes[etat.etape]?.pouvoir ? tour.pouvoir : null,
    message: etape.message(tour, etat),
    actions,
    surAction,
    de: { valeur: etat.valeurDe, lancers: etat.lancers, surArret: surArretDe },
    pion,
  };
}

export default useTourDemo;
