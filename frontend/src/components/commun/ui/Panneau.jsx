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
import { Cadre, Bandeau, Titre, Aside, Contenu } from './Panneau.styles.js';

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

export default Panneau;
