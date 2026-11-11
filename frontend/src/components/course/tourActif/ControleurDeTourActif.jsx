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
import styled from 'styled-components';
import Panneau from '../../commun/Panneau.jsx';
import AvatarPersonnage from '../../commun/AvatarPersonnage.jsx';
import Bouton from '../../commun/Bouton.jsx';
import MessageVide from '../../commun/MessageVide.jsx';
import De from './De.jsx';
import EtapesTour from './EtapesTour.jsx';

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

// Bandeau du panneau : avatar du personnage, puis « À toi de jouer » et son nom.
const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
`;

const SurTitre = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

const NomPersonnage = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
`;

// Le dé et le message, côte à côte.
const Resultat = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.espace(4)};
  margin-top: ${({ theme }) => theme.espace(4)};

  p {
    margin: 0;
  }
`;

// Encadré du pouvoir à utiliser.
const Pouvoir = styled.div`
  margin-top: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: color-mix(in srgb, var(--teinte) 25%, white); /* teinte du panneau, très diluée */

  p {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.texte.sm};
  }
`;

const TitrePouvoir = styled.h3`
  font-family: ${({ theme }) => theme.polices.texte};
  font-size: ${({ theme }) => theme.texte.md};
  margin-bottom: ${({ theme }) => theme.espace(2)};
`;

// Les boutons d'action, en colonnes d'au moins 8rem.
const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.espace(2)};
  margin-top: ${({ theme }) => theme.espace(3)};
`;

export default ControleurDeTourActif;
