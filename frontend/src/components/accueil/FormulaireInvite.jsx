// Responsabilité : le champ du pseudo pis le bouton « Jouer en invité ».

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useDemande from '@/hooks/useDemande.js';
import { creerSalon } from '@/services/serveur/salon.js';
import CHEMINS from '@/chemins.js';
import { Bloc, SousTitre, Aide } from './FormulaireInvite.styles.js';

// Affiche le formulaire invité ; « Jouer » crée le salon, pis va à la salle d'attente si ça a marché.
function FormulaireInvite() {
  const [pseudo, setPseudo] = useState('');
  const { enCours, erreur, faire } = useDemande();
  const naviguer = useNavigate();

  const jouer = async () => {
    const reussi = await faire(() => creerSalon(pseudo));
    if (reussi) naviguer(CHEMINS.configuration, { viewTransition: true });
  };

  return (
    <Bloc>
      <SousTitre>Jouer en invité</SousTitre>
      <ChampTexte
        etiquette="Votre pseudo"
        placeholder="Ex. Coureur rapide"
        autoComplete="nickname"
        value={pseudo}
        onChange={(evenement) => setPseudo(evenement.target.value)}
      />
      <Aide>Le pseudo sert pour la partie et le tableau d'honneur.</Aide>
      <Bouton onClick={jouer} disabled={enCours}>
        Jouer en invité
      </Bouton>
      {erreur && <Aide role="alert">{erreur}</Aide>}
    </Bloc>
  );
}

export default FormulaireInvite;
