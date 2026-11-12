/*
 * FormulaireCompte.jsx : se connecter avec un compte (courriel et mot de passe).
 *
 * Responsabilité : afficher les champs et les boutons de connexion.
 * Provisoire : visuel seulement, les boutons ne font rien. La connexion sera branchée
 * plus tard sur le serveur, à travers un service dans src/services/.
 */
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { Bloc, LienCreer } from './FormulaireCompte.styles.js';

function FormulaireCompte() {
  return (
    <Bloc>
      <ChampTexte etiquette="Courriel" type="email" placeholder="nom@exemple.com" autoComplete="email" />
      <ChampTexte etiquette="Mot de passe" type="password" autoComplete="current-password" />
      <Bouton variante="secondaire">Se connecter</Bouton>
      <LienCreer type="button">Créer un compte</LienCreer>
    </Bloc>
  );
}

export default FormulaireCompte;
