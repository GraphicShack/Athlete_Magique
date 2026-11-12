/*
 * CartePersonnage.jsx : la carte d'un personnage, avec son image, son nom et son pouvoir.
 *
 * Responsabilité : afficher un personnage de la même façon partout, en deux formats :
 *   - 'ligne'    : petite image à côté du nom (page des règles) ;
 *   - 'portrait' : grande image au-dessus du nom (carrousel de sélection).
 *
 * Props :
 *   personnage : { id, nom, pouvoir } (voir services/personnages.js)
 *   format     : 'ligne' (par défaut) ou 'portrait'
 *   children   : contenu ajouté sous le pouvoir, ex. une étiquette « Choisi » (optionnel)
 *   className  : ajoutée par styled(CartePersonnage), pour compléter le style de la carte
 *                depuis l'extérieur (ex. la faire flotter dans la page Sélection)
 */
import { imagePersonnage } from '@/services/personnages.js';
import { Carte, EnTete, Portrait, Nom, Pouvoir } from './CartePersonnage.styles.js';

function CartePersonnage({ personnage, format = 'ligne', children, className }) {
  return (
    <Carte className={className}>
      <EnTete $format={format}>
        {/* alt vide : l'image est décorative, le nom est écrit juste à côté. */}
        <Portrait $format={format} src={imagePersonnage(personnage.id)} alt="" aria-hidden="true" />
        <Nom>{personnage.nom}</Nom>
      </EnTete>
      <Pouvoir>{personnage.pouvoir}</Pouvoir>
      {children}
    </Carte>
  );
}

export default CartePersonnage;
