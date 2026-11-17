/*
 * ControleurDeTourActif.jsx : le panneau du tour en cours.
 *
 * Responsabilités :
 *   - montrer qui joue et avec quel personnage ;
 *   - montrer l'étape du tour, le dernier lancer de dé et ce qui vient de se passer ;
 *   - proposer les choix possibles (pouvoir, duel…) et transmettre le choix du joueur.
 * Il ne décide d'aucune règle : les choix possibles lui sont donnés dans « actions »,
 * et un clic est simplement transmis par onAction(id).
 *
 * Props :
 *   joueur        : ex. « Joueur 1 »
 *   personnage    : { id, nom, initiales } ; sans personnage, le panneau attend le début de la course
 *   etapeCourante : 1 à 4
 *   resultatDe    : 1 à 6, ou null si le dé n'a pas encore été lancé
 *   lancerDe      : augmente à chaque lancer, pour faire rouler le dé (0 : pas d'animation)
 *   onArretDe     : appelé avec la valeur quand le dé a fini de rouler (optionnel)
 *   message       : texte expliquant ce qui vient de se passer
 *   pouvoir       : { titre, description } si le pouvoir s'utilise à cette étape, sinon null
 *   titreEtape    : le nom de l'étape, affiché quand il n'y a pas de pouvoir (ex. « Début du tour »)
 *   actions       : [{ id, libelle, principal }]
 *   onAction      : appelé avec l'id de l'action choisie
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import De from '@/components/commun/jeu/de/De.jsx';
import EtapesTour from './EtapesTour.jsx';
import CasePouvoir from './CasePouvoir.jsx';
import CaseSansPouvoir from './CaseSansPouvoir.jsx';
import { EnTete, SurTitre, NomPersonnage, Colonnes, Resultat, PlaceDe } from './ControleurDeTourActif.styles.js';

function ControleurDeTourActif({
  joueur,
  personnage,
  etapeCourante = 1,
  resultatDe = null,
  lancerDe = 0,
  onArretDe,
  message,
  pouvoir = null,
  titreEtape,
  actions = [],
  onAction = () => {},
}) {
  // Avant le début de la course : un panneau vide qui garde sa place.
  if (!personnage) {
    return (
      <Panneau enEvidence teinte="tour" titre="Tour en cours">
        <MessageVide>En attente du début de la course.</MessageVide>
      </Panneau>
    );
  }

  // La case du bas : celle du pouvoir s'il s'utilise à cette étape, sinon la case de l'étape.
  // Les deux cases ont les mêmes props, donc on peut prendre l'une ou l'autre.
  const CaseDuTour = pouvoir ? CasePouvoir : CaseSansPouvoir;

  return (
    <Panneau
      enEvidence
      teinte="tour"
      aria-label="Tour en cours"
      entete={
        <EnTete>
          <AvatarPersonnage initiales={personnage.initiales} image={personnage.image} />
          <div>
            <SurTitre>À toi de jouer, {joueur}</SurTitre>
            <NomPersonnage>{personnage.nom}</NomPersonnage>
          </div>
        </EnTete>
      }
    >
      {/* Deux colonnes s'il y a la place (étapes et dé à gauche, pouvoir et boutons à droite),
          sinon l'une sous l'autre. */}
      <Colonnes>
        <div>
          <EtapesTour etapeCourante={etapeCourante} />

          {/* Toujours affiché, même avant le lancer (place vide pour le dé) :
              le panneau garde ainsi la même hauteur pendant tout le tour. */}
          <Resultat>
            {resultatDe ? (
              <De valeur={resultatDe} lancer={lancerDe} onArret={onArretDe} />
            ) : (
              <PlaceDe aria-hidden="true" />
            )}
            {message && <p>{message}</p>}
          </Resultat>
        </div>

        <CaseDuTour pouvoir={pouvoir} titre={titreEtape} actions={actions} onAction={onAction} />
      </Colonnes>
    </Panneau>
  );
}

export default ControleurDeTourActif;
