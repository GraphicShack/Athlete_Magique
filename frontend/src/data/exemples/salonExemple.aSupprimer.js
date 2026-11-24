// Responsabilité : un salon inventé pour tester la salle d'attente.

const SALON_EXEMPLE = {
  placesMax: 4,
  idHote: 'j1',
  statut: 'attente', // 'attente' | 'selection' | 'course' | 'fin'
  joueurs: [
    { id: 'j1', nom: 'Félix', hote: true, bot: false, pret: true },
    { id: 'j2', nom: 'Angie', bot: false, pret: false },
    { id: 'j3', nom: 'Bot 1', bot: true, pret: true },
  ],
};

export default SALON_EXEMPLE;
