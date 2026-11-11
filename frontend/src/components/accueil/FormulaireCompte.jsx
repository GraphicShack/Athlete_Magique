/*
 * FormulaireCompte.jsx : se connecter avec un compte (courriel et mot de passe).
 *
 * Responsabilité : afficher les champs et les boutons de connexion.
 * Provisoire : visuel seulement, les boutons ne font rien. La connexion sera branchée
 * plus tard sur le serveur, à travers un service dans src/services/.
 */
import styled from 'styled-components';
import ChampTexte from '../commun/ChampTexte.jsx';
import Bouton from '../commun/Bouton.jsx';

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

// Les éléments l'un sous l'autre.
const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Bouton qui ressemble à un lien (pas encore de page de création de compte).
const LienCreer = styled.button`
  align-self: center;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.couleurs.encre};
  font-size: ${({ theme }) => theme.texte.sm};
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export default FormulaireCompte;
