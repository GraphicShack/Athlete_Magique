// Responsabilité : le contenu de la fenêtre des paramètres (son, affichage, partie, compte).
// Utilisé dans : AccesParametres

import Panneau from '@/components/commun/ui/Panneau.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Interrupteur from '@/components/commun/ui/reglages/Interrupteur.jsx';
import Curseur from '@/components/commun/ui/reglages/Curseur.jsx';
import ChoixSegmente from '@/components/commun/ui/reglages/ChoixSegmente.jsx';
import { Grille, ChampsCompte, Actions } from './ContenuParametres.styles.js';

// Affiche les panneaux de réglages (seul le son est branché pour l'instant).
function ContenuParametres({ son }) {
  return (
    <>
      <Grille>
        <Panneau titre="Son" teinte="son">
          <Curseur
            etiquette="Volume général"
            min="0"
            max="100"
            value={son.volume}
            onChange={(evenement) => son.setVolume(Number(evenement.target.value))}
          />
          <Interrupteur
            etiquette="Musique"
            checked={son.musiqueActive}
            onChange={(evenement) => son.setMusiqueActive(evenement.target.checked)}
          />
          <Interrupteur etiquette="Effets sonores" description="Dé, chutes et pouvoirs" defaultChecked />
        </Panneau>

        <Panneau titre="Affichage" teinte="affichage">
          <ChoixSegmente etiquette="Taille du texte" options={['Petite', 'Normale', 'Grande']} valeurParDefaut="Normale" />
          <Interrupteur
            etiquette="Réduire les animations"
            description="Coupe le rideau entre les pages et les effets"
          />
          <Interrupteur etiquette="Numéros des cases" description="Affichés sur la piste" defaultChecked />
        </Panneau>

        <Panneau titre="Partie" teinte="partie">
          <ChoixSegmente etiquette="Vitesse des bots" options={['Lente', 'Normale', 'Rapide']} valeurParDefaut="Normale" />
          <Interrupteur etiquette="Conseils pendant le tour" description="Rappels des règles au bon moment" defaultChecked />
          <Interrupteur etiquette="Confirmer avant de quitter" description="Pendant une course" defaultChecked />
        </Panneau>

        <Panneau titre="Compte" teinte="compte">
          <ChampsCompte>
            <ChampTexte etiquette="Pseudo" placeholder="Ex. Coureur rapide" autoComplete="nickname" />
            <ChoixSegmente etiquette="Langue" options={['Français', 'English']} valeurParDefaut="Français" />
          </ChampsCompte>
        </Panneau>
      </Grille>

      <Actions>
        <Bouton variante="secondaire">Rétablir par défaut</Bouton>
        <Bouton variante="principal">Enregistrer</Bouton>
      </Actions>
    </>
  );
}

export default ContenuParametres;
