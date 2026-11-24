// Responsabilité : la carte encadrée style livret (bandeau de titre coloré + cadre rétro).
// Utilisé dans : ApercuPersonnages, ConfigurationPage, ContenuParametres, ContenuRegles, ContenuRegles.styles, ControleurDeTourActif, JournalEvenements, ListeJoueurs, PanneauCode, PanneauConnexion, PanneauJoueurs, PanneauPiste, PanneauRejoindre, TableauHonneur

import { Cadre, Bandeau, Titre, Aside, Contenu } from './Panneau.styles.js';

// Affiche la carte avec son bandeau (titre ou en-tête perso) pis son contenu.
// Props : titre, aside (petit texte à droite du titre), entete (bandeau perso au lieu du titre), teinte (couleur), enEvidence (ombre plus forte), children.
function Panneau({ titre, aside, entete, teinte, enEvidence = false, children, ...props }) {
  return (
    <Cadre $teinte={teinte} $enEvidence={enEvidence} {...props}>
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
