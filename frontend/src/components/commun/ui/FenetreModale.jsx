// Responsabilité : une fenêtre par-dessus la page (règles, paramètres), sans changer de page.
// Utilisé dans : AccesParametres, AccesRegles

import { useEffect, useId, useRef, useState } from 'react';
import { DUREE_FERMETURE, Dialogue, Cadre, EnTete, Titre, BoutonFermer, Corps } from './FenetreModale.styles.js';

// Ouvre ou ferme la fenêtre (avec anim) selon « ouverte ».
// Props : ouverte (true/false), onFermer (appelé pour fermer), titre, teinte (couleur du bandeau), children (le contenu).
function FenetreModale({ ouverte, onFermer, titre, teinte = 'regles', children }) {
  const dialogue = useRef(null); // l'élément <dialog> de la page
  const [enFermeture, setEnFermeture] = useState(false); // true pendant l'animation de fermeture
  const idTitre = useId(); // relie la fenêtre à son titre, pour les lecteurs d'écran

  // Ouvrir ou fermer le <dialog> quand la page change « ouverte ».
  useEffect(() => {
    const element = dialogue.current;
    if (ouverte && !element.open) element.showModal();
    if (!ouverte && element.open) element.close();
  }, [ouverte]);

  // Fermeture par le joueur : on joue l'animation, puis on ferme vraiment.
  function fermer() {
    if (enFermeture) return;
    setEnFermeture(true);
    setTimeout(() => {
      dialogue.current?.close(); // « ?. » : rien à fermer si la fenêtre a déjà quitté la page
      setEnFermeture(false);
      onFermer();
    }, DUREE_FERMETURE);
  }

  // Touche Échap : on remplace la fermeture immédiate du navigateur par la nôtre, animée.
  function surEchap(evenement) {
    evenement.preventDefault();
    fermer();
  }

  // Un clic sur le fond assombri (en dehors du cadre) ferme la fenêtre.
  function surClic(evenement) {
    if (evenement.target === dialogue.current) fermer();
  }

  return (
    <Dialogue
      ref={dialogue}
      $enFermeture={enFermeture}
      onCancel={surEchap}
      onClick={surClic}
      aria-labelledby={idTitre}
    >
      <Cadre>
        <EnTete $teinte={teinte}>
          <Titre id={idTitre}>{titre}</Titre>
          <BoutonFermer type="button" onClick={fermer} aria-label="Fermer">
            ×
          </BoutonFermer>
        </EnTete>
        <Corps>{children}</Corps>
      </Cadre>
    </Dialogue>
  );
}

export default FenetreModale;
