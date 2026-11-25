// Responsabilité : la page 404 (une adresse qui existe pas).

import EcranErreur from '@/components/erreur/EcranErreur.jsx';

function IntrouvablePage() {
  return (
    <EcranErreur
      titre="404"
      sousTitre="Cette page a trébuché"
      message="L'adresse n'existe pas, ou elle a glissé sur une Banana. Reviens à l'accueil pour continuer la course."
    />
  );
}

export default IntrouvablePage;
