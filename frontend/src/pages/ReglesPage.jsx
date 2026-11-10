import styled from 'styled-components';
import EnTetePage from '../components/commun/EnTetePage.jsx';
import ContenuRegles from '../components/regles/ContenuRegles.jsx';
import MascotteRegles from '../components/regles/MascotteRegles.jsx';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

/** Règles du jeu, tirées de la proposition de projet. */
function ReglesPage() {
  return (
    <Page>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />

      <Introduction>
        <TitreArcEnCiel>Règles du jeu</TitreArcEnCiel>
        <p>
          À son tour, chaque joueur lance un dé et fait avancer son personnage. Chaque personnage a un pouvoir
          qui change les règles. Celui qui a le plus de points après 3 courses gagne la partie.
        </p>
      </Introduction>

      <ContenuRegles>
        <EmplacementMascotte>
          <Mascotte>
            <MascotteRegles />
          </Mascotte>
        </EmplacementMascotte>
      </ContenuRegles>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

const Introduction = styled.div`
  max-width: 48rem;

  p {
    margin: 0;
    margin-top: ${({ theme }) => theme.espace(3)};
    color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
  }
`;

// La colonne réserve la place de la mascotte et limite son déplacement sticky.
const EmplacementMascotte = styled.div`
  margin-bottom: -1.5rem; /* compense l’espace inférieur du conteneur principal (py-4) */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-column: 2;
  }
`;

const Mascotte = styled.div`
  position: sticky;
  bottom: 0;
  align-self: flex-end;
  max-width: 100%;
`;

export default ReglesPage;
