/*
 * IconeRoueDentee.jsx : l'icône en roue dentée du bouton des paramètres.
 *
 * Responsabilité : dessiner la roue en SVG. Un cercle en pointillés épais forme les dents,
 * un disque plein le corps, et un petit disque de la couleur du bouton (--fond-bouton) fait le trou.
 * Décorative : cachée aux lecteurs d'écran (le bouton a son propre nom).
 */
function IconeRoueDentee() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="3.34 3.34" />
      <circle cx="12" cy="12" r="7" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="var(--fond-bouton)" />
    </svg>
  );
}

export default IconeRoueDentee;
