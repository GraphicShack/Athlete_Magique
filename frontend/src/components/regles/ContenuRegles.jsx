import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import CartePersonnage from '../commun/CartePersonnage.jsx';
import TableauPointage from './TableauPointage.jsx';
import PERSONNAGES from '../../donnees/personnages.js';
import POINTAGE from '../../donnees/pointage.js';

/**
 * Toutes les sections des règles du jeu, tirées de la proposition de projet.
 * Affichées par la page Règles et par la fenêtre d'accès rapide (AccesRegles).
 * children : éléments ajoutés à la fin de la grille (ex. la mascotte de la page Règles).
 */
function ContenuRegles({ children }) {
  return (
    <Grille>
      <Panneau titre="Vue d'ensemble" teinte="apercu">
        <Contenu>
          <ul>
            <li><strong>Joueurs :</strong> 1 à 4. Les places libres sont prises par des bots.</li>
            <li><strong>Durée :</strong> 3 courses.</li>
            <li><strong>But :</strong> accumuler le plus de points au fil des 3 courses.</li>
          </ul>
        </Contenu>
      </Panneau>

      <Panneau titre="La piste" teinte="piste">
        <Contenu>
          <ul>
            <li><strong>Départ :</strong> la case 0, où tous les personnages commencent.</li>
            <li><strong>Cases 1 à 30</strong>, puis la ligne d'arrivée, franchie dès qu'un déplacement dépasse la case 30.</li>
            <li><strong>Cases Étoile (10 et 20) :</strong> s'y arrêter rapporte 1 point.</li>
            <li><strong>Cases Rocher :</strong> 3 par course, placées au hasard entre les cases 5 et 25. S'y arrêter fait trébucher.</li>
          </ul>
        </Contenu>
      </Panneau>

      <Panneau titre="Avant chaque course" teinte="preparation">
        <Contenu>
          <ul>
            <li><strong>3 ou 4 joueurs :</strong> un personnage chacun. <strong>2 joueurs :</strong> deux personnages chacun.</li>
            <li><strong>Choix des personnages :</strong> on tire au hasard 2 personnages de plus qu'il n'en faut. Le joueur le moins bien classé choisit en premier.</li>
            <li><strong>Ordre de jeu :</strong> le joueur qui a le moins de points joue en premier.</li>
            <li>Avant la 1re course, et en cas d'égalité, l'ordre est tiré au hasard.</li>
          </ul>
        </Contenu>
      </Panneau>

      <Panneau titre="Déroulement d'un tour" teinte="tour">
        <Contenu>
          <ol>
            <li><strong>Début du tour :</strong> un personnage tombé se relève et saute son déplacement. Les pouvoirs « avant le déplacement » s'appliquent ici.</li>
            <li><strong>Lancer du dé :</strong> un dé à 6 faces, avec les relances du Magicien puis le doublement du Scientifique Fusé.</li>
            <li><strong>Déplacement principal :</strong> le résultat du dé, plus les bonus (Lièvre +2, Party Animal +1 par voisin).</li>
            <li><strong>Fin du déplacement :</strong> on applique les effets des cases et des pouvoirs déclenchés.</li>
          </ol>
        </Contenu>
      </Panneau>

      <PanneauLarge titre="Les personnages" teinte="personnages" aside={`${PERSONNAGES.length} pouvoirs qui changent les règles`}>
        <GrillePersonnages>
          {PERSONNAGES.map((personnage) => (
            <CartePersonnage key={personnage.id} personnage={personnage} />
          ))}
        </GrillePersonnages>
      </PanneauLarge>

      <Panneau titre="Fin de course et pointage" teinte="pointage">
        <Contenu>
          <p>
            La course se termine dès que 2 personnages ont franchi la ligne d'arrivée. Si tous les autres sont
            éliminés avant, aucun point de 2e place n'est donné.
          </p>
          <TableauPointage pointage={POINTAGE} />
          <p>
            Après 3 courses, le plus de points gagne. En cas d'égalité : le plus de 1res places, sinon la
            victoire est partagée.
          </p>
        </Contenu>
      </Panneau>

      <Panneau titre="Ordre de résolution" teinte="joueurs">
        <Contenu>
          <p>Quand plusieurs effets se déclenchent en même temps :</p>
          <ol>
            <li>les effets des cases (ex. case Étoile) ;</li>
            <li>le pouvoir du personnage actif ;</li>
            <li>les pouvoirs des autres personnages, dans l'ordre des joueurs.</li>
          </ol>
          <p>Chaque effet est résolu entièrement, y compris les déplacements qu'il provoque, avant de passer au suivant.</p>
        </Contenu>
      </Panneau>

      <Panneau titre="Définitions" teinte="definitions">
        <Contenu>
          <dl>
            <dt>Déplacement</dt>
            <dd>Tout changement de case causé par le dé, un pouvoir ou une règle qui dit « déplacer ».</dd>
            <dt>Téléportation</dt>
            <dd>Placer directement un personnage sur une case. Ce n'est pas un déplacement (Flip Flop, Hypnotiste).</dd>
            <dt>Dépasser</dt>
            <dd>Commencer un déplacement derrière un personnage et le terminer devant lui.</dd>
            <dt>Partager une case</dt>
            <dd>Être arrêtés sur la même case. Passer par une case occupée ne compte pas.</dd>
            <dt>Trébucher</dt>
            <dd>Le personnage tombe et saute son prochain déplacement principal. Ça ne se cumule pas.</dd>
            <dt>Éliminé</dt>
            <dd>Retiré de la course : il ne bouge plus, n'est plus ciblé et ne marque aucun point.</dd>
          </dl>
        </Contenu>
      </Panneau>
      {children}
    </Grille>
  );
}

const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const PanneauLarge = styled(Panneau)`
  grid-column: 1 / -1;
`;

const GrillePersonnages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: ${({ theme }) => theme.espace(3)};
`;


// Mise en forme du texte des règles : paragraphes, listes et définitions.
const Contenu = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};

  p,
  ul,
  ol,
  dl,
  table {
    margin: 0 0 ${({ theme }) => theme.espace(3)};
  }

  > :last-child {
    margin-bottom: 0;
  }

  ul,
  ol {
    padding-left: ${({ theme }) => theme.espace(5)};
  }

  li + li {
    margin-top: ${({ theme }) => theme.espace(1.5)};
  }

  dt {
    font-weight: ${({ theme }) => theme.graisses.forte};
  }

  dd {
    margin: 0 0 ${({ theme }) => theme.espace(2)};
    color: ${({ theme }) => theme.couleurs.gris700};
  }
`;


export default ContenuRegles;
