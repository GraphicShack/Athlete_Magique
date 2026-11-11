/*
 * EtapesPartie.jsx : le fil des étapes avant une partie
 * (1 Configuration → 2 Personnages → 3 Course), affiché en haut des pages.
 *
 * Responsabilité : montrer au joueur où il en est ; l'étape en cours est blanche et en gras,
 * les autres sont en gris, entourées.
 *
 * Props :
 *   etapeCourante : 1 à 3
 */
import styled from 'styled-components';
import Liste from './Liste.jsx';
import { rondCentre } from '../../styles/base/utilitaires.js';

const ETAPES = ['Configuration', 'Personnages', 'Course'];

function EtapesPartie({ etapeCourante }) {
  return (
    <ListeEtapes aria-label="Étapes de la partie">
      {ETAPES.map((libelle, i) => {
        const numero = i + 1;
        const courante = numero === etapeCourante;
        return (
          // aria-current : les lecteurs d'écran annoncent l'étape en cours.
          <Etape key={libelle} $courante={courante} aria-current={courante ? 'step' : undefined}>
            <Pastille $courante={courante}>{numero}</Pastille>
            {libelle}
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

// Les étapes côte à côte ; elles passent à la ligne sur un écran étroit.
const ListeEtapes = styled(Liste)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(6)};
`;

// Une étape : sa pastille et son nom, posés sur le fond noir de la page.
const Etape = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  color: ${({ theme, $courante }) => ($courante ? theme.couleurs.texteSurPage : theme.couleurs.texteSurPageDoux)};
  font-weight: ${({ theme, $courante }) => ($courante ? theme.graisses.tresForte : theme.graisses.normale)};
`;

// Rond numéroté : plein et blanc pour l'étape en cours, simplement entouré pour les autres.
const Pastille = styled.span`
  ${rondCentre}
  width: 2rem;
  height: 2rem;
  border: 2px solid currentColor;
  background: ${({ theme, $courante }) => ($courante ? theme.couleurs.texteSurPage : 'transparent')};
  color: ${({ theme, $courante }) => ($courante ? theme.couleurs.encre : 'inherit')};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;

export default EtapesPartie;
