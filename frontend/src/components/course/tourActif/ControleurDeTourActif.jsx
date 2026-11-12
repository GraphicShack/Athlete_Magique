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
 *   message       : texte expliquant ce qui vient de se passer
 *   pouvoir       : { titre, description } ou null
 *   actions       : [{ id, libelle, principal }]
 *   onAction      : appelé avec l'id de l'action choisie
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import AvatarPersonnage from '@/components/commun/jeu/AvatarPersonnage.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import De from './De.jsx';
import EtapesTour from './EtapesTour.jsx';
import { EnTete, SurTitre, NomPersonnage, Resultat, Pouvoir, TitrePouvoir, Actions } from './ControleurDeTourActif.styles.js';

function ControleurDeTourActif({
  joueur,
  personnage,
  etapeCourante = 1,
  resultatDe = null,
  message,
  pouvoir = null,
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

  // Un bouton par action possible (rien s'il n'y en a aucune).
  const boutons = actions.length > 0 && (
    <Actions>
      {actions.map(({ id, libelle, principal }) => (
        <Bouton key={id} variante={principal ? 'principal' : 'secondaire'} onClick={() => onAction(id)}>
          {libelle}
        </Bouton>
      ))}
    </Actions>
  );

  return (
    <Panneau
      enEvidence
      teinte="tour"
      aria-label="Tour en cours"
      entete={
        <EnTete>
          <AvatarPersonnage initiales={personnage.initiales} taille="lg" />
          <div>
            <SurTitre>À toi de jouer, {joueur}</SurTitre>
            <NomPersonnage>{personnage.nom}</NomPersonnage>
          </div>
        </EnTete>
      }
    >
      <EtapesTour etapeCourante={etapeCourante} />

      {(resultatDe || message) && (
        <Resultat>
          {resultatDe && <De valeur={resultatDe} />}
          {message && <p>{message}</p>}
        </Resultat>
      )}

      {/* Avec un pouvoir à utiliser, les boutons vont dans son encadré ; sinon, ils sont seuls. */}
      {pouvoir ? (
        <Pouvoir>
          <TitrePouvoir>{pouvoir.titre}</TitrePouvoir>
          <p>{pouvoir.description}</p>
          {boutons}
        </Pouvoir>
      ) : (
        boutons
      )}
    </Panneau>
  );
}

export default ControleurDeTourActif;
