// Responsabilité : des scores inventés, écrits comme le serveur les enverra.

// Du meilleur score au moins bon. type : 'compte' ou 'invite' ; vous : true pour mon score. Le faux serveur ajoute le rang.
const SCORES_EXEMPLE = [
  { id: 1, pseudo: 'Capucine', type: 'compte', score: 12, date: '2026-10-09T18:00:00Z' },
  { id: 2, pseudo: 'Zeppelin', type: 'invite', score: 11, date: '2026-10-11T18:00:00Z' },
  { id: 3, pseudo: 'Pseudo 1', type: 'invite', score: 10, date: new Date().toISOString(), vous: true },
  { id: 4, pseudo: 'Gaspard', type: 'compte', score: 10, date: '2026-10-02T18:00:00Z' },
  { id: 5, pseudo: 'Mirabelle', type: 'compte', score: 9, date: '2026-09-30T18:00:00Z' },
  { id: 6, pseudo: 'PixelLou', type: 'invite', score: 8, date: '2026-10-07T18:00:00Z' },
  { id: 7, pseudo: 'TurboTom', type: 'invite', score: 8, date: '2026-10-05T18:00:00Z' },
  { id: 8, pseudo: 'Josée', type: 'compte', score: 7, date: '2026-09-28T18:00:00Z' },
];

export default SCORES_EXEMPLE;
