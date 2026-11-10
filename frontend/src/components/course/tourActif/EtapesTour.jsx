import styled from 'styled-components';
import Liste from '../../commun/Liste.jsx';
import { rondCentre } from '../../../styles/utilitaires.js';

export const ETAPES_TOUR = ['Début du tour', 'Lancer du dé', 'Déplacement principal', 'Fin du déplacement'];

/** Les 4 étapes d'un tour ; l'étape en cours (1 à 4) est mise en évidence. */
function EtapesTour({ etapeCourante }) {
  return (
    <ListeEtapes>
      {ETAPES_TOUR.map((libelle, i) => {
        const numero = i + 1;
        const statut = numero === etapeCourante ? 'courante' : numero < etapeCourante ? 'passee' : 'avenir';
        return (
          <Etape key={libelle} $statut={statut} aria-current={statut === 'courante' ? 'step' : undefined}>
            <Pastille $statut={statut}>{numero}</Pastille>
            {libelle}
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

const ListeEtapes = styled(Liste)`
  display: grid;
  gap: ${({ theme }) => theme.espace(1.5)};
`;

const Etape = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  color: ${({ theme, $statut }) => ($statut === 'courante' ? theme.couleurs.encre : theme.couleurs.gris500)};
  font-weight: ${({ theme, $statut }) => ($statut === 'courante' ? theme.graisses.tresForte : theme.graisses.normale)};
`;

const Pastille = styled.span`
  ${rondCentre}
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ theme, $statut }) => ($statut === 'avenir' ? theme.couleurs.gris300 : $statut === 'courante' ? theme.couleurs.encre : theme.couleurs.gris700)};
  color: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

export default EtapesTour;
