import styled from 'styled-components';
import Panneau from '../../commun/Panneau.jsx';
import AvatarPersonnage from '../../commun/AvatarPersonnage.jsx';
import Bouton from '../../commun/Bouton.jsx';
import MessageVide from '../../commun/MessageVide.jsx';
import De from './De.jsx';
import EtapesTour from './EtapesTour.jsx';

/**
 * Panneau du tour en cours : qui joue, à quelle étape, le dernier lancer,
 * et les choix proposés au joueur (pouvoir, duel…).
 *
 * Composant d'affichage : il ne décide d'aucune règle. Les choix possibles lui sont
 * donnés dans `actions`, et un clic est simplement transmis par `onAction(id)`.
 *
 * joueur        : 'Joueur 1'
 * personnage    : { id, nom, initiales } (id optionnel : affiche son icône)
 * etapeCourante : 1 à 4
 * resultatDe    : 1 à 6, ou null si le dé n'a pas encore été lancé
 * message       : texte expliquant ce qui vient de se passer
 * pouvoir       : { titre, description } ou null
 * actions       : [{ id, libelle, principal }]
 */
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
  if (!personnage) {
    return (
      <Panneau enEvidence>
        <MessageVide>En attente du début de la course.</MessageVide>
      </Panneau>
    );
  }

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
    <Panneau enEvidence aria-label="Tour en cours">
      <EnTete>
        <AvatarPersonnage id={personnage.id} initiales={personnage.initiales} taille="lg" />
        <div>
          <SurTitre>À toi de jouer, {joueur}</SurTitre>
          <NomPersonnage>{personnage.nom}</NomPersonnage>
        </div>
      </EnTete>

      <EtapesTour etapeCourante={etapeCourante} />

      {(resultatDe || message) && (
        <Resultat>
          {resultatDe && <De valeur={resultatDe} />}
          {message && <p>{message}</p>}
        </Resultat>
      )}

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

const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
  margin-bottom: ${({ theme }) => theme.espace(4)};
`;

const SurTitre = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

const NomPersonnage = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
`;

const Resultat = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.espace(4)};
  margin-top: ${({ theme }) => theme.espace(4)};

  p {
    margin: 0;
  }
`;

const Pouvoir = styled.div`
  margin-top: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.gris100};

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

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.espace(2)};
  margin-top: ${({ theme }) => theme.espace(3)};
`;

export default ControleurDeTourActif;
