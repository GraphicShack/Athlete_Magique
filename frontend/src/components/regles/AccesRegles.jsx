/*
 * AccesRegles.jsx : l'accès rapide aux règles depuis n'importe quelle page.
 *
 * Responsabilités :
 *   - afficher le bouton rouge « ? Règles », en bas à droite (voir App.jsx) ;
 *   - ouvrir les règles dans une fenêtre, par-dessus la page (la partie n'est pas quittée) ;
 *   - proposer un lien vers la page complète des règles.
 * Le bouton est masqué sur la page des règles elle-même.
 */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import ContenuRegles from './ContenuRegles.jsx';
import CHEMINS from '@/chemins.js';
import { BoutonFlottant, EmplacementMascotte, MascotteModale, LienPage } from './AccesRegles.styles.js';

function AccesRegles() {
  const [ouverte, setOuverte] = useState(false); // la fenêtre est-elle ouverte ?
  const { pathname } = useLocation(); // adresse de la page actuelle

  // Sur la page des règles, le bouton ne sert à rien.
  if (pathname === CHEMINS.regles) return null;

  return (
    <>
      {/* Le bouton se cache pendant que la fenêtre est ouverte : la fenêtre semble sortir de lui. */}
      <BoutonFlottant
        variante="principal"
        onClick={() => setOuverte(true)}
        aria-haspopup="dialog"
        style={{ opacity: ouverte ? 0 : 1 }}
      >
        <span aria-hidden="true">?</span> Règles
      </BoutonFlottant>

      <FenetreModale ouverte={ouverte} onFermer={() => setOuverte(false)} titre="Règles du jeu">
        <ContenuRegles>
          <EmplacementMascotte>
            <MascotteModale />
          </EmplacementMascotte>
        </ContenuRegles>
        <LienPage to={CHEMINS.regles} viewTransition onClick={() => setOuverte(false)}>
          Ouvrir les règles dans une page
        </LienPage>
      </FenetreModale>
    </>
  );
}

export default AccesRegles;
