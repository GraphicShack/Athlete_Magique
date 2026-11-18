// Responsabilité : le champ pour entrer un code pis le bouton Rejoindre.
// Utilisé dans : ConfigurationPage

import Panneau from '@/components/commun/ui/Panneau.jsx';
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useRejoindre from '@/hooks/salon/useRejoindre.js';
import { Formulaire, Aide, Message } from './PanneauRejoindre.styles.js';

// Affiche le formulaire ; Rejoindre est grisé tant que le code a pas 6 caractères.
function PanneauRejoindre() {
  const { code, changer, complet, message, rejoindre } = useRejoindre();

  // « Entrée » dans le champ ou clic sur le bouton : on rejoint (sans recharger la page).
  const surEnvoi = (evenement) => {
    evenement.preventDefault();
    if (complet) rejoindre();
  };

  return (
    <Panneau titre="Rejoindre une partie" teinte="apercu">
      <Aide>Un ami t’a donné un code ? Entre-le ici.</Aide>

      <Formulaire onSubmit={surEnvoi}>
        <ChampTexte
          etiquette="Code de la partie"
          placeholder="Ex. KZ4P7Q"
          value={code}
          onChange={(evenement) => changer(evenement.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <Bouton type="submit" disabled={!complet}>
          Rejoindre
        </Bouton>
      </Formulaire>

      {message && <Message role="status">{message}</Message>}
    </Panneau>
  );
}

export default PanneauRejoindre;
