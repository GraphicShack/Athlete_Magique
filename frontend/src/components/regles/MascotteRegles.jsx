/*
 * MascotteRegles.jsx : l'image de la mascotte des règles.
 *
 * Responsabilité : afficher l'image à une taille qui suit l'écran, sans dépasser sa colonne.
 *
 * Props :
 *   className : permet à un parent de l'agrandir ou de la placer (styled(MascotteRegles))
 */
import styled from 'styled-components';
import imageMascotte from '../../assets/images/Mascotte.png';

function MascotteRegles({ className }) {
  return <Image className={className} src={imageMascotte} alt="Mascotte de la page des règles" />;
}

// Arrondie en haut seulement : elle « sort » du bas de la page.
const Image = styled.img`
  display: block;
  width: clamp(36rem, 66vw, 54rem);
  max-width: 100%; /* ne dépasse jamais la colonne qui la contient */
  height: auto;
  border-radius: ${({ theme }) => theme.rayons.md} ${({ theme }) => theme.rayons.md} 0 0;
`;

export default MascotteRegles;
