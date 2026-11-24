// Responsabilité : amène à l'écran de fin quand le serveur dit que la course est finie.

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { finRecue } from '@/services/serveur/finCourse.js';
import { partieRecue } from '@/services/serveur/partie.js';
import CHEMINS from '@/chemins.js';

function useSuivreFinCourse() {
  const naviguer = useNavigate();

  useEffect(() => {
    const suivre = () => {
      // Le serveur peut renvoyer la fin d'une vieille course (ex. reconnexion) : on l'ignore.
      const courseEnCours = partieRecue.lire()?.course.numero;
      if (finRecue.lire().numero === courseEnCours) naviguer(CHEMINS.finCourse, { viewTransition: true });
    };
    // abonner renvoie la fonction qui nous désabonne : React l'appelle en quittant la page.
    return finRecue.abonner(suivre);
  }, [naviguer]);
}

export default useSuivreFinCourse;
