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
import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import Bouton from '../commun/Bouton.jsx';
import ChampTexte from '../commun/ChampTexte.jsx';
import Interrupteur from '../commun/reglages/Interrupteur.jsx';
import Curseur from '../commun/reglages/Curseur.jsx';
import ChoixSegmente from '../commun/reglages/ChoixSegmente.jsx';

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

// Une colonne sur téléphone, deux à partir de la tablette.
// L'espace laisse la place aux liserés colorés autour des panneaux.
const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Le champ du pseudo et le choix de la langue, l'un sous l'autre.
const ChampsCompte = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};
`;

// Les deux boutons du bas, à droite.
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.espace(3)};
  margin-top: ${({ theme }) => theme.espace(8)};
`;

export default ContenuParametres;
