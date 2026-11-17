/*
 * salonExemple.js : une salle d'attente inventée, pour essayer la page Configuration
 * avant que le serveur existe.
 *
 * Responsabilité : fournir des valeurs d'exemple. Rien n'est calculé ici.
 * Seul le service salon.js lit ce fichier.
 *
 *   placesMax  : le nombre de joueurs maximum (2, 3 ou 4)
 *   idHote     : le joueur qui a créé la partie (lui seul peut la lancer)
 *   joueurs    : dans l'ordre d'arrivée ; bot : true pour un bot ; pret : true s'il est prêt
 */
const SALON_EXEMPLE = {
  placesMax: 4,
  idHote: 'j1',
  joueurs: [
    { id: 'j1', nom: 'Félix', bot: false, pret: true },
    { id: 'j2', nom: 'Angie', bot: false, pret: false },
    { id: 'j3', nom: 'Bot 1', bot: true, pret: true },
  ],
};

export default SALON_EXEMPLE;
