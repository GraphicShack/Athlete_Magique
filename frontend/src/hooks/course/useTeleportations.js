// Responsabilité : fait disparaître pis réapparaître les pions téléportés (au lieu de les faire marcher).

import { useEffect, useMemo, useState } from 'react';
import { DUREE_FONDU } from '@/styles/animations/teleportation.js';
import { moinsDAnimations } from '@/utils/moinsDAnimations.js';

// Un joueur est téléporté quand son compteur « teleportations » change (comme « lancers » pour le dé).
// Renvoie les joueurs (un téléporté garde son ancienne case le temps de disparaître), fondus ({ j2: 'sortie' }), pis enFondu.
function useTeleportations(joueurs) {
  const [montres, setMontres] = useState(joueurs); // les joueurs tels que montrés la dernière fois
  const [revenus, setRevenus] = useState([]); // les id de ceux qui réapparaissent

  const joueurMontre = (joueur) => montres.find(({ id }) => id === joueur.id) ?? joueur;
  const estTeleporte = (joueur) => joueurMontre(joueur).teleportations !== joueur.teleportations;
  const teleportes = joueurs.filter(estTeleporte);
  const partis = teleportes.map(({ id }) => id);
  // Un texte (ex. « j2:1 »), pour que l'effet recommence juste s'il y a une nouvelle téléportation.
  const departs = teleportes.map(({ id, teleportations }) => `${id}:${teleportations}`).join();

  // Personne de parti : on retient ce qu'on montre.
  useEffect(() => {
    if (!departs) setMontres(joueurs);
  }, [joueurs, departs]);

  // 1. Ils disparaissent, pis on les met sur leur nouvelle case.
  useEffect(() => {
    if (!departs) return;
    const minuterie = setTimeout(
      () => {
        setMontres(joueurs);
        setRevenus(partis);
      },
      moinsDAnimations() ? 0 : DUREE_FONDU
    );
    return () => clearTimeout(minuterie);
  }, [departs]);

  // 2. Ils réapparaissent.
  useEffect(() => {
    if (revenus.length === 0) return;
    const minuterie = setTimeout(() => setRevenus([]), moinsDAnimations() ? 0 : DUREE_FONDU);
    return () => clearTimeout(minuterie);
  }, [revenus]);

  // useMemo : la même liste tant que rien change (sinon usePionsAnimes recommencerait sans arrêt).
  const aMontrer = useMemo(
    () => joueurs.map((joueur) => (estTeleporte(joueur) ? joueurMontre(joueur) : joueur)),
    [joueurs, montres]
  );

  return {
    joueurs: aMontrer,
    fondus: Object.fromEntries([...revenus.map((id) => [id, 'entree']), ...partis.map((id) => [id, 'sortie'])]),
    enFondu: partis.length > 0 || revenus.length > 0,
  };
}

export default useTeleportations;
