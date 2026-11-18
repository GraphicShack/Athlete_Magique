// Responsabilité : le panneau des joueurs du salon (affiche seulement, tout lui est donné).
// Utilisé dans : ConfigurationPage

import { useId } from 'react';
import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import BarreChoix from '@/components/commun/ui/reglages/BarreChoix.jsx';
import LigneJoueur from './LigneJoueur.jsx';
import PlaceLibre from './PlaceLibre.jsx';
import { Aide, SousTitre, ListePlaces, Actions } from './PanneauJoueurs.styles.js';

// Affiche le nb de places, les joueurs pis les places libres ; chaque clic est renvoyé au parent.
function PanneauJoueurs({
  joueurs,
  placesMax,
  libres,
  nombres,
  impossibles,
  estHote,
  onChoisirPlaces,
  onRetirer,
  onAjouterBot,
  children,
}) {
  const theme = useTheme();
  const idNombre = useId(); // relie la barre 2 · 3 · 4 à son titre

  return (
    <Panneau titre="Les joueurs" teinte="joueurs" aside={`${joueurs.length} sur ${placesMax}`} enEvidence>
      <SousTitre id={idNombre}>Nombre de joueurs</SousTitre>
      {estHote ? (
        <BarreChoix
          options={nombres}
          valeurParDefaut={placesMax}
          onChange={onChoisirPlaces}
          inactifs={impossibles}
          aria-labelledby={idNombre}
        />
      ) : (
        <Aide>{placesMax} joueurs. C’est l’hôte qui choisit.</Aide>
      )}
      {estHote && <Aide>Complète avec des bots si des joueurs manquent.</Aide>}

      <SousTitre>Qui joue ?</SousTitre>
      <ListePlaces>
        {joueurs.map((joueur, rang) => (
          // Chaque joueur prend la couleur de pion du thème selon son rang.
          <LigneJoueur
            key={joueur.id}
            numero={rang + 1}
            couleur={theme.joueurs[rang]}
            {...joueur}
            peutRetirer={estHote && !joueur.hote}
            onRetirer={() => onRetirer(joueur.id)}
          />
        ))}
        {libres.map((numero) => (
          <PlaceLibre key={numero} numero={numero} peutAjouter={estHote} onAjouter={onAjouterBot} />
        ))}
      </ListePlaces>

      <Actions>{children}</Actions>
    </Panneau>
  );
}

export default PanneauJoueurs;
