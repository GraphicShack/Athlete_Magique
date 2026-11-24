// Responsabilité : le bouton roue dentée qui ouvre la fenêtre des paramètres.

import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import useFenetre from '@/hooks/useFenetre.js';
import ContenuParametres from './ContenuParametres.jsx';
import IconeRoueDentee from './IconeRoueDentee.jsx';
import { BoutonRond } from './AccesParametres.styles.js';

// Affiche le bouton pis la fenêtre des paramètres.
function AccesParametres({ son, affichage }) {
  const fenetre = useFenetre();

  return (
    <>
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
        <ContenuParametres son={son} affichage={affichage} />
      </FenetreModale>
    </>
  );
}

export default AccesParametres;
