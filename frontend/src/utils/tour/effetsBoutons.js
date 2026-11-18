/*
 * effetsBoutons.js : ce que fait chaque sorte de bouton du tour (patron Stratégie).
 *
 * Une seule chose : une petite fonction par effet ('commencer', 'lancer', 'fixer', 'allerALaFin',
 * 'avancer', 'terminer'). Chaque bouton des données dit quel effet il utilise
 * (voir data/exemples/deroulementTour.js) : ce fichier ne connaît aucun personnage.
 * Pour ajouter un pouvoir, on ajoute des données ; ce fichier ne change pas.
 *
 * Chaque effet reçoit :
 *   ctx    : { tour, lancer, choix, cases, journaliser } (fourni par hooks/tour/useTourDemo.js)
 *   bouton : le bouton cliqué, avec ses options (multiplicateur, bonus, journal, parPouvoir)
 */
import { evenementBouton, evenementDebutTour, evenementFinTour } from '@/utils/tour/evenementsTour.js';

// Ajoute au journal l'événement du bouton, s'il en a un (option « journal »).
function journaliserBouton(ctx, bouton, etape, details) {
  if (!bouton.journal) return;
  ctx.journaliser(
    evenementBouton(ctx.tour, { etape, type: bouton.journal, parPouvoir: bouton.parPouvoir, details })
  );
}

export const EFFETS = {
  // Début du tour (avec ou sans pouvoir), puis lancer du dé.
  commencer: (ctx, bouton) => {
    ctx.journaliser(evenementDebutTour(ctx.tour));
    journaliserBouton(ctx, bouton, 'debut');
    ctx.choix.passerA(2);
  },

  // Lancer ou relancer le dé (le résultat est journalisé quand le dé s'arrête).
  lancer: (ctx) => ctx.lancer.relancer(),

  // Garder le résultat du dé, multiplié (×1 pour garder, ×2 pour doubler).
  fixer: (ctx, bouton) => {
    const valeur = ctx.lancer.obtenu;
    const cases = valeur * (bouton.multiplicateur ?? 1);
    ctx.choix.choisirDeplacement(cases);
    journaliserBouton(ctx, bouton, 'lancer', { valeur, cases });
  },

  // Sauter le lancer et le déplacement (ex. échange du Flip Flop).
  allerALaFin: (ctx, bouton) => {
    journaliserBouton(ctx, bouton, 'lancer');
    ctx.choix.passerA(4);
  },

  // Avancer du résultat (plus le bonus éventuel), puis fin du tour.
  avancer: (ctx, bouton) => {
    const cases = ctx.cases + (bouton.bonus ?? 0);
    ctx.choix.avancer(cases);
    journaliserBouton(ctx, bouton, 'deplacement', { de: ctx.tour.position, a: ctx.tour.position + cases, cases });
    ctx.choix.passerA(4);
  },

  // Terminer le tour.
  terminer: (ctx) => {
    ctx.journaliser(evenementFinTour(ctx.tour));
    ctx.choix.terminer();
  },
};
