import styled from 'styled-components';

/**
 * Bloc blanc encadré, utilisé par toutes les sections d'écran.
 * titre      : optionnel.
 * aside      : texte discret affiché à droite du titre (optionnel).
 * enEvidence : contour noir épais (ex. le tour actif).
 *
 * Le panneau est une colonne flexible : s'il reçoit plus de hauteur que son contenu
 * (dans une mise en page fixe), son dernier enfant peut s'étirer pour la remplir.
 */
function Panneau({ titre, aside, enEvidence = false, children, ...props }) {
  return (
    <Cadre $enEvidence={enEvidence} {...props}>
      {titre && (
        <EnTete>
          <Titre>{titre}</Titre>
          {aside && <Aside>{aside}</Aside>}
        </EnTete>
      )}
      {children}
    </Cadre>
  );
}

const Cadre = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: ${({ theme }) => theme.couleurs.surface};
  border: ${({ theme, $enEvidence }) => ($enEvidence ? theme.bordures.contour : theme.bordures.fine)};
  border-radius: ${({ theme }) => theme.rayons.md};
  box-shadow: ${({ theme }) => theme.ombres.douce};
  padding: ${({ theme }) => theme.espace(6)};
`;

const EnTete = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(4)};
  margin-bottom: ${({ theme }) => theme.espace(4)};
`;

const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.lg};
`;

const Aside = styled.span`
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export default Panneau;
