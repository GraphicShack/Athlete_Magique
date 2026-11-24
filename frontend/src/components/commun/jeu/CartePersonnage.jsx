// Responsabilité : la carte d'un perso (image, nom, pouvoir), en format ligne ou portrait.

import { Carte, EnTete, Portrait, Nom, Pouvoir } from './CartePersonnage.styles.js';

// Affiche la carte du perso ; children s'ajoute en bas (ex. « Choisi »).
// Props : personnage ({ id, nom, pouvoir, image }), format ('ligne' | 'portrait'), children (ajouté en bas), className.
function CartePersonnage({ personnage, format = 'ligne', children, className }) {
  return (
    <Carte className={className}>
      <EnTete $format={format}>
        <Portrait $format={format} src={personnage.image} alt="" aria-hidden="true" />
        <Nom>{personnage.nom}</Nom>
      </EnTete>
      <Pouvoir>{personnage.pouvoir}</Pouvoir>
      {children}
    </Carte>
  );
}

export default CartePersonnage;
