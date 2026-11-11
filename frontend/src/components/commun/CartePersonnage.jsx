/*
 * CartePersonnage.jsx : la carte d'un personnage, avec son image, son nom et son pouvoir.
 *
 * Responsabilité : afficher un personnage de la même façon partout, en deux formats :
 *   - 'ligne'    : petite image à côté du nom (page des règles) ;
 *   - 'portrait' : grande image au-dessus du nom (carrousel de sélection).
 *
 * Props :
 *   personnage : { id, nom, pouvoir } (voir donnees/personnages.js)
 *   format     : 'ligne' (par défaut) ou 'portrait'
 *   children   : contenu ajouté sous le pouvoir, ex. une étiquette « Choisi » (optionnel)
 *   className  : ajoutée par styled(CartePersonnage), pour compléter le style de la carte
 *                depuis l'extérieur (ex. la faire flotter dans la page Sélection)
 */
import styled, { css } from 'styled-components';
import IMAGES_PERSONNAGES from '../../donnees/imagesPersonnages.js';

function CartePersonnage({ personnage, format = 'ligne', children, className }) {
  return (
    <Carte className={className}>
      <EnTete $format={format}>
        {/* alt vide : l'image est décorative, le nom est écrit juste à côté. */}
        <Portrait $format={format} src={IMAGES_PERSONNAGES[personnage.id]} alt="" aria-hidden="true" />
        <Nom>{personnage.nom}</Nom>
      </EnTete>
      <Pouvoir>{personnage.pouvoir}</Pouvoir>
      {children}
    </Carte>
  );
}

// Carte blanche à fine bordure grise.
const Carte = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
  padding: ${({ theme }) => theme.espace(4)};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  border: ${({ theme }) => theme.bordures.fine};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

// Image et nom : côte à côte (ligne) ou l'un au-dessus de l'autre (portrait).
const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};

  ${({ $format }) =>
    $format === 'portrait' &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
`;

// Image ronde de 4rem (ligne), ou carrée sur toute la largeur de la carte (portrait).
const Portrait = styled.img`
  display: block;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;

  ${({ $format }) =>
    $format === 'portrait' &&
    css`
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.rayons.sm};
    `}
`;

const Nom = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.md};
`;

// Texte du pouvoir, plus petit et gris.
const Pouvoir = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export default CartePersonnage;
