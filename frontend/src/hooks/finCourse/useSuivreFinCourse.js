// Responsabilité : amène à l'écran de fin quand le serveur dit que la course est finie.

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { finRecue } from '@/services/serveur/finCourse.js';
import CHEMINS from '@/chemins.js';

function useSuivreFinCourse() {
  const naviguer = useNavigate();

  // abonner renvoie la fonction qui nous désabonne : React l'appelle en quittant la page.
  useEffect(() => finRecue.abonner(() => naviguer(CHEMINS.finCourse, { viewTransition: true })), [naviguer]);
}

export default useSuivreFinCourse;
