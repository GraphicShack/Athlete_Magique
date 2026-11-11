/*
 * Panneau.jsx : la carte encadrée utilisée par toutes les sections d'écran,
 * au style du livret : carte blanche, bandeau de titre coloré, cadre rétro (liserés orange et rose).
 *
 * Responsabilités :
 *   - dessiner la carte, son bandeau et son cadre ;
 *   - choisir la couleur du bandeau selon le sujet (theme.teintes) ;
 *   - partager cette couleur avec son contenu dans la variable CSS --teinte
 *     (une liste peut s'en servir pour colorer légèrement ses lignes).
 *
 * Le panneau est une colonne flexible : s'il reçoit plus de hauteur que son contenu
 * (dans une mise en page fixe), son contenu peut s'étirer pour la remplir.
 *
 * Props :
 *   titre      : texte du bandeau (optionnel)
 *   aside      : petit texte à droite du titre (optionnel)
 *   entete     : contenu libre du bandeau, à la place du titre, ex. avatar + nom (optionnel)
 *   teinte     : sujet du panneau, ex. 'journal', 'tour'… (sans teinte, le bandeau est blanc)
 *   enEvidence : un liseré jaune de plus, pour la carte la plus importante de l'écran
 *   children   : le contenu de la carte
 *   autres     : transmises à la balise <section> (ex. aria-label)
 */
import styled from 'styled-components';

function Panneau({ titre, aside, entete, teinte, enEvidence = false, children, ...props }) {
  return (
    <Cadre $teinte={teinte} $enEvidence={enEvidence} {...props}>
      {/* Pas de bandeau si le panneau n'a ni titre ni en-tête. */}
      {(titre || entete) && (
        <Bandeau $teinte={teinte}>
          {entete ?? <Titre>{titre}</Titre>}
          {aside && <Aside>{aside}</Aside>}
        </Bandeau>
      )}
      <Contenu>{children}</Contenu>
    </Cadre>
  );
}

// Couleur de la teinte, ou blanc si le panneau n'en a pas.
const couleurTeinte = ({ theme, $teinte }) => theme.teintes[$teinte] ?? theme.couleurs.surface;

// La carte : fond blanc, contour noir, coins arrondis et cadre rétro.
const Cadre = styled.section`
  --teinte: ${couleurTeinte};
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden; /* le bandeau suit les coins arrondis */
  color: ${({ theme }) => theme.couleurs.encre}; /* texte noir sur la carte blanche */
  background: ${({ theme }) => theme.couleurs.surface};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.lg};
  box-shadow: ${({ theme, $enEvidence }) => ($enEvidence ? theme.ombres.cadreFort : theme.ombres.cadre)};
`;

// Bandeau de titre, de la couleur du sujet ; le petit texte passe dessous s'il manque de place.
const Bandeau = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(5)};
  background: ${couleurTeinte};
  border-bottom: ${({ theme }) => theme.bordures.contour};
`;

// Titre en italique très gras, comme les accroches du livret.
const Titre = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
`;

// Petit texte à droite du titre.
const Aside = styled.span`
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
`;

// Le contenu remplit le reste de la carte.
const Contenu = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.espace(5)};
`;

export default Panneau;
