/*
 * EtapesTour.jsx : la liste des 4 étapes d'un tour, avec l'étape en cours mise en évidence.
 *
 * Responsabilité : montrer où en est le tour (étapes passées en gris foncé,
 * étape en cours en noir et en gras, étapes à venir en gris clair).
 *
 * Props :
 *   etapeCourante : 1 à 4
 */
import styled from 'styled-components';
import Liste from '../../commun/Liste.jsx';
import { rondCentre } from '../../../styles/base/utilitaires.js';

const ETAPES_TOUR = ['Début du tour', 'Lancer du dé', 'Déplacement principal', 'Fin du déplacement'];

// Statut d'une étape par rapport à l'étape en cours : 'passee', 'courante' ou 'avenir'.
function statutEtape(numero, etapeCourante) {
  if (numero === etapeCourante) return 'courante';
  if (numero < etapeCourante) return 'passee';
  return 'avenir';
}

function EtapesTour({ etapeCourante }) {
  return (
    <ListeEtapes>
      {ETAPES_TOUR.map((libelle, i) => {
        const numero = i + 1;
        const statut = statutEtape(numero, etapeCourante);
        return (
          // aria-current : les lecteurs d'écran annoncent l'étape en cours.
          <Etape key={libelle} $statut={statut} aria-current={statut === 'courante' ? 'step' : undefined}>
            <Pastille $statut={statut}>{numero}</Pastille>
            {libelle}
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

// Couleur de la pastille numérotée selon le statut.
const COULEURS_PASTILLE = {
  passee: (theme) => theme.couleurs.gris700,
  courante: (theme) => theme.couleurs.encre,
  avenir: (theme) => theme.couleurs.gris300,
};

// Les étapes l'une sous l'autre.
const ListeEtapes = styled(Liste)`
  display: grid;
  gap: ${({ theme }) => theme.espace(1.5)};
`;

// Une étape : sa pastille et son nom ; l'étape en cours est en noir et en gras.
const Etape = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  color: ${({ theme, $statut }) => ($statut === 'courante' ? theme.couleurs.encre : theme.couleurs.gris500)};
  font-weight: ${({ theme, $statut }) => ($statut === 'courante' ? theme.graisses.tresForte : theme.graisses.normale)};
`;

// Petit rond avec le numéro de l'étape.
const Pastille = styled.span`
  ${rondCentre}
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ theme, $statut }) => COULEURS_PASTILLE[$statut](theme)};
  color: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

export default EtapesTour;
