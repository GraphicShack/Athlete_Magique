/*
 * FenetreModale.jsx : une fenêtre qui s'ouvre par-dessus la page actuelle, sans la remplacer
 * (règles, paramètres).
 *
 * Responsabilités :
 *   - ouvrir et fermer la fenêtre selon la prop « ouverte » ;
 *   - la fermer par le bouton ×, la touche Échap ou un clic à l'extérieur, en jouant l'animation ;
 *   - l'animer : elle grandit depuis le coin en bas à droite (où sont les boutons),
 *     le × arrive en tournant et le contenu apparaît en cascade.
 *
 * Elle utilise l'élément HTML <dialog> : le navigateur gère lui-même le focus dans la fenêtre
 * et le fond assombri.
 *
 * Props :
 *   ouverte  : true pour l'afficher
 *   onFermer : appelé quand la fenêtre est fermée
 *   titre    : titre affiché dans le bandeau
 *   teinte   : couleur du bandeau (voir theme.teintes), rouge des règles par défaut
 *   children : le contenu de la fenêtre
 */
import { useEffect, useId, useRef, useState } from 'react';
import { DUREE_FERMETURE, Dialogue, Cadre, EnTete, Titre, BoutonFermer, Corps } from './FenetreModale.styles.js';

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
