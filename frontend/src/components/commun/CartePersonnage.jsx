import styled from 'styled-components';
import banane from '../../assets/banane.png';
import lievre from '../../assets/Lievre.png';
import centaure from '../../assets/centaure.png';
import flipflop from '../../assets/flip-flop.png';
import hypnotiste from '../../assets/hypnotiste.png';
import partyanimal from '../../assets/party-animal.png';
import magicien from '../../assets/magicien.png';
import scientifique from '../../assets/ScientifiqueFusee.png';
import bouche from '../../assets/BOUCHE.png';
import duelliste from '../../assets/dueliste.png';

const IMAGES = {
  banana: banane,
  lievre,
  centaure,
  flipflop,
  hypnotiste,
  partyanimal,
  magicien,
  scientifique,
  bouche,
  duelliste,
};

/**
 * Carte d'un personnage : avatar, nom et texte du pouvoir.
 * Utilisée par la page des règles ; servira aussi à la sélection des personnages.
 * personnage : { id, nom, pouvoir }
 */
function CartePersonnage({ personnage, children }) {
  return (
    <Carte>
      <EnTete>
        <Portrait src={IMAGES[personnage.id]} alt="" aria-hidden="true" />
        <Nom>{personnage.nom}</Nom>
      </EnTete>
      <Pouvoir>{personnage.pouvoir}</Pouvoir>
      {children}
    </Carte>
  );
}

const Carte = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
  padding: ${({ theme }) => theme.espace(4)};
  background: ${({ theme }) => theme.couleurs.surface};
  border: ${({ theme }) => theme.bordures.fine};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
`;

const Portrait = styled.img`
  display: block;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;
`;

const Nom = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.md};
`;

const Pouvoir = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export default CartePersonnage;
