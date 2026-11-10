import { useState } from 'react';
import styled from 'styled-components';
import EnTetePage from '../components/commun/EnTetePage.jsx';
import Carrousel from '../components/commun/carrousel/Carrousel.jsx';
import CartePersonnage from '../components/commun/CartePersonnage.jsx';
import Etiquette from '../components/commun/Etiquette.jsx';
import Bouton from '../components/commun/Bouton.jsx';
import PERSONNAGES from '../donnees/personnages.js';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

/**
 * Sélection du personnage, entre la configuration et la course.
 *
 * Provisoire : on propose ici les 10 personnages et le choix reste dans la page.
 * Plus tard, le serveur fournira les personnages tirés au hasard (joueurs + 2)
 * et l'ordre de choix, et recevra le personnage choisi.
 */
function SelectionPage() {
  const [indexActif, setIndexActif] = useState(0);
  const [idChoisi, setIdChoisi] = useState(null);

  const personnageActif = PERSONNAGES[indexActif];
  const choisi = PERSONNAGES.find((personnage) => personnage.id === idChoisi);
  const actifEstChoisi = personnageActif.id === idChoisi;

  return (
    <Page>
      <EnTetePage lien={{ libelle: 'Retour à la configuration', to: CHEMINS.configuration }} />

      <div>
        <TitreArcEnCiel>Choisissez votre personnage</TitreArcEnCiel>
        <Consigne>Glissez, cliquez sur une carte ou utilisez les flèches pour parcourir les personnages.</Consigne>
      </div>

      <Carrousel
        elements={PERSONNAGES}
        indexActif={indexActif}
        onChange={setIndexActif}
        libelle={(personnage) => personnage.nom}
        rendu={(personnage) => (
          <CartePersonnage personnage={personnage} format="portrait">
            {personnage.id === idChoisi && (
              <div>
                <Etiquette>Choisi</Etiquette>
              </div>
            )}
          </CartePersonnage>
        )}
      />

      <Barre>
        <Resume aria-live="polite">
          {choisi ? (
            <>
              Votre personnage : <strong>{choisi.nom}</strong>
            </>
          ) : (
            'Aucun personnage choisi.'
          )}
        </Resume>

        <Actions>
          <Bouton
            variante={actifEstChoisi ? 'secondaire' : 'principal'}
            onClick={() => setIdChoisi(personnageActif.id)}
            disabled={actifEstChoisi}
          >
            {actifEstChoisi ? `${personnageActif.nom} choisi` : `Choisir ${personnageActif.nom}`}
          </Bouton>

          {choisi ? (
            <Bouton to={CHEMINS.course}>Lancer la course</Bouton>
          ) : (
            <Bouton variante="secondaire" disabled>
              Lancer la course
            </Bouton>
          )}
        </Actions>
      </Barre>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

const Consigne = styled.p`
  margin: 0;
  margin-top: ${({ theme }) => theme.espace(3)};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

const Barre = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(5)};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  border: ${({ theme }) => theme.bordures.contour};
  box-shadow: ${({ theme }) => theme.ombres.cadre};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

const Resume = styled.p`
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(2)};
`;

export default SelectionPage;
