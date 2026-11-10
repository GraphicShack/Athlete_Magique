import styled from 'styled-components';
import imageMascotte from '../../assets/Mascotte.png';

/** Mascotte de la page des règles, affichée en bas à droite. */
function MascotteRegles() {
  return <Image src={imageMascotte} alt="Mascotte de la page des règles" />;
}

const Image = styled.img`
  display: block;
  width: clamp(36rem, 66vw, 54rem);
  max-width: 100%; /* ne dépasse jamais la colonne qui la contient */
  height: auto;
  border-radius: ${({ theme }) => theme.rayons.md} ${({ theme }) => theme.rayons.md} 0 0;
`;

export default MascotteRegles;
