/*
 * AccesParametres.jsx : l'accès aux paramètres depuis n'importe quelle page.
 *
 * Responsabilités :
 *   - afficher le bouton rond en roue dentée, tout en bas à droite (voir App.jsx) ;
 *   - ouvrir et fermer la fenêtre des paramètres (FenetreModale + ContenuParametres).
 *
 * Props :
 *   son : réglages du son venus d'App.jsx, transmis tels quels à ContenuParametres
 */
import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import useFenetre from '@/hooks/useFenetre.js';
import ContenuParametres from './ContenuParametres.jsx';
import IconeRoueDentee from './IconeRoueDentee.jsx';
import { BoutonRond } from './AccesParametres.styles.js';

function AccesParametres({ son }) {
  const fenetre = useFenetre();

  return (
    <>
      {/* Comme pour les règles, le bouton se cache pendant que la fenêtre est ouverte. */}
      <BoutonRond
        type="button"
        onClick={fenetre.ouvrir}
        aria-label="Paramètres"
        aria-haspopup="dialog"
        style={{ opacity: fenetre.ouverte ? 0 : 1 }}
      >
        <IconeRoueDentee />
      </BoutonRond>

      <FenetreModale ouverte={fenetre.ouverte} onFermer={fenetre.fermer} titre="Paramètres" teinte="parametres">
        <ContenuParametres son={son} />
      </FenetreModale>
    </>
  );
}

export default AccesParametres;
