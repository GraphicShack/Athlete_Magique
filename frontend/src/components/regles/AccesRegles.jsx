// Responsabilité : le bouton « ? Règles » qui ouvre les règles dans une fenêtre (caché sur la page Règles).

import { useLocation } from 'react-router-dom';
import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import useFenetre from '@/hooks/useFenetre.js';
import ContenuRegles from './ContenuRegles.jsx';
import CHEMINS from '@/chemins.js';
import { BoutonFlottant, EmplacementMascotte, MascotteModale, LienPage } from './AccesRegles.styles.js';

// Affiche le bouton pis la fenêtre des règles (rien sur la page Règles).
function AccesRegles() {
  const fenetre = useFenetre();
  const { pathname } = useLocation(); // adresse de la page actuelle

  // Sur la page des règles, le bouton sert à rien.
  if (pathname === CHEMINS.regles) return null;

  return (
    <>
      <BoutonFlottant
        variante="principal"
        onClick={fenetre.ouvrir}
        aria-haspopup="dialog"
        style={{ opacity: fenetre.ouverte ? 0 : 1 }}
      >
        <span aria-hidden="true">?</span> Règles
      </BoutonFlottant>

      <FenetreModale ouverte={fenetre.ouverte} onFermer={fenetre.fermer} titre="Règles du jeu">
        <ContenuRegles>
          <EmplacementMascotte>
            <MascotteModale />
          </EmplacementMascotte>
        </ContenuRegles>
        <LienPage to={CHEMINS.regles} viewTransition onClick={fenetre.fermer}>
          Ouvrir les règles dans une page
        </LienPage>
      </FenetreModale>
    </>
  );
}

export default AccesRegles;
