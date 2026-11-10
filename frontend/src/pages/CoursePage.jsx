import styled from 'styled-components';
import PanneauPiste from '../components/course/piste/PanneauPiste.jsx';
import EnTeteCourse from '../components/course/EnTeteCourse.jsx';
import JournalEvenements from '../components/course/JournalEvenements.jsx';
import ControleurDeTourActif from '../components/course/tourActif/ControleurDeTourActif.jsx';
import OrdreDesJoueurs from '../components/course/OrdreDesJoueurs.jsx';

/**
 * Écran de course. Sur grand écran, la mise en page est fixe et remplit la fenêtre,
 * sur deux rangées alignées :
 *
 *   ┌──────────────── en-tête ────────────────┐
 *   │ piste + légende     │ tour actif         │  ← même hauteur
 *   │ journal             │ joueurs            │  ← même hauteur, remplit le bas
 *   └─────────────────────┴────────────────────┘
 *
 * Sur petit écran, les blocs s'empilent dans l'ordre du code.
 */
function CoursePage() {
  return (
    <Ecran>
      <Zone $zone="entete">
        <EnTeteCourse />
      </Zone>

      <Zone $zone="piste">
        <PanneauPiste />
      </Zone>

      <Zone $zone="journal">
        <JournalEvenements />
      </Zone>

      <Zone $zone="tour">
        <ControleurDeTourActif />
      </Zone>

      <Zone $zone="joueurs">
        <OrdreDesJoueurs />
      </Zone>
    </Ecran>
  );
}

const Ecran = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    /* flex-basis 0 : la hauteur vient de la fenêtre, pas du contenu.
       En dessous de 40rem de haut, la page défile normalement. */
    flex: 1 1 0;
    min-height: 40rem;
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(20rem, 1fr);
    grid-template-rows: auto auto minmax(0, 1fr);
    grid-template-areas:
      'entete  entete'
      'piste   tour'
      'journal joueurs';
  }
`;

// Chaque zone occupe sa case de la grille ; le panneau qu'elle contient l'emplit en hauteur.
const Zone = styled.div`
  grid-area: ${({ $zone }) => $zone};
  display: flex;
  flex-direction: column;
  min-height: 0;

  & > * {
    flex: 1;
  }
`;

export default CoursePage;
