// Responsabilité : la question à poser pour choisir une cible.

const CONSIGNES = {
  HYPNOTISER: 'Qui veux-tu téléporter sur ta case ?',
  ECHANGER: 'Avec qui veux-tu échanger de place ?',
};

// Une action inconnue a une question générale.
export function consigneCible(type) {
  return CONSIGNES[type] ?? 'Choisis un personnage.';
}
