/*
 * PanneauJoueurs.jsx : le panneau « Les joueurs » de la salle d'attente.
 *
 * Responsabilité : afficher. Il ne calcule et ne retient rien : tout lui est donné.
 *   - le nombre de joueurs : l'hôte le choisit (2, 3 ou 4), les autres le voient ;
 *   - une LigneJoueur par joueur arrivé, puis une PlaceLibre par place vide.
 * Chaque clic est transmis au parent (onChoisirPlaces, onRetirer, onAjouterBot).
 * En bas : le bouton donné par le parent (children), ex. <BoutonLancer />.
 *
 * Props :
 *   joueurs         : [{ id, nom, bot, pret, hote }], dans l'ordre d'arrivée
 *   placesMax       : nombre de places choisi
 *   libres          : numéros des places vides, ex. [4]
 *   nombres         : choix possibles du nombre de places, ex. ['2', '3', '4']
 *   impossibles     : choix grisés, ex. ['2'] s'il y a déjà 3 joueurs
 *   estHote         : true si c'est moi l'hôte (je peux tout régler)
 *   onChoisirPlaces : appelé avec le nombre choisi (un nombre)
 *   onRetirer       : appelé avec l'id du joueur à retirer
 *   onAjouterBot    : appelé au clic sur « Ajouter un bot »
 */
import { useId } from 'react';
import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import BarreChoix from '@/components/commun/ui/reglages/BarreChoix.jsx';
import LigneJoueur from './LigneJoueur.jsx';
import PlaceLibre from './PlaceLibre.jsx';
import { Aide, SousTitre, ListePlaces, Actions } from './PanneauJoueurs.styles.js';

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
          valeurParDefaut={String(placesMax)}
          onChange={(n) => onChoisirPlaces(Number(n))}
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
