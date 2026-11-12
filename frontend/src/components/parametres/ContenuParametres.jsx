/*
 * ContenuParametres.jsx : le contenu de la fenêtre des paramètres, regroupé par sujet
 * (Son, Affichage, Partie, Compte), avec les boutons « Rétablir » et « Enregistrer ».
 *
 * Responsabilité : placer les réglages dans leurs panneaux.
 *
 * Le volume général et l'interrupteur « Musique » sont branchés : ils changent tout de suite
 * la musique du menu. Les autres réglages sont encore visuels seulement (valeur de départ
 * avec defaultChecked, defaultValue…, rien n'est appliqué). Rien n'est encore enregistré :
 * plus tard, un service (dossier services/) pourra sauvegarder les valeurs.
 *
 * Props :
 *   son : { musiqueActive, setMusiqueActive, volume, setVolume } (voir App.jsx)
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Interrupteur from '@/components/commun/ui/reglages/Interrupteur.jsx';
import Curseur from '@/components/commun/ui/reglages/Curseur.jsx';
import ChoixSegmente from '@/components/commun/ui/reglages/ChoixSegmente.jsx';
import { Grille, ChampsCompte, Actions } from './ContenuParametres.styles.js';

function ContenuParametres({ son }) {
  return (
    <>
      <Grille>
        <Panneau titre="Son" teinte="son">
          {/* Branchés : la valeur vient d'App, et chaque changement y est renvoyé. */}
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

      {/* Boutons sans action pour l'instant. */}
      <Actions>
        <Bouton variante="secondaire">Rétablir par défaut</Bouton>
        <Bouton variante="principal">Enregistrer</Bouton>
      </Actions>
    </>
  );
}

export default ContenuParametres;
