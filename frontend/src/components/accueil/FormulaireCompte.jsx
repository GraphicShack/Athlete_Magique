// Responsabilité : les champs pis le bouton pour se connecter avec un compte.

import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { Bloc, Champs, LienCreer } from './FormulaireCompte.styles.js';

// Affiche le formulaire de connexion (visuel seulement).
function FormulaireCompte() {
  return (
    <Bloc>
      <Champs>
        <ChampTexte etiquette="Courriel" type="email" placeholder="nom@mail.com" autoComplete="email" />
        <ChampTexte etiquette="Mot de passe" type="password" autoComplete="current-password" />
      </Champs>
      <Bouton variante="secondaire">Se connecter</Bouton>
      <LienCreer type="button">Créer un compte</LienCreer>
    </Bloc>
  );
}

export default FormulaireCompte;
