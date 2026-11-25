// Responsabilité : l'icône SVG de la roue dentée.

function IconeRoueDentee() {
  return (
    <svg viewBox="0 0 24 24" width="1.75rem" height="1.75rem" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="3.34 3.34" />
      <circle cx="12" cy="12" r="7" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="var(--fond-bouton)" />
    </svg>
  );
}

export default IconeRoueDentee;
