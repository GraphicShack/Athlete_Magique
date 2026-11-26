// Responsabilité : choisit la musique de fond selon la page (celle de la course, ou celle des menus).
// Musiques, générées avec Suno (IA) : « Lobby Loop » (musique-menu.mp3), https://suno.com
// pis « Tabletop Derby » (musique-course.mp3), https://suno.com/song/d85647a2-b0a6-4daf-a5c5-8c4d8879b96e

import { useLocation } from 'react-router-dom';
import musiqueMenu from '@/assets/musique/musique-menu.mp3';
import musiqueCourse from '@/assets/musique/musique-course.mp3';
import CHEMINS from '@/chemins.js';
import Musique from './Musique.jsx';

// Props : active (réglage « Musique »), volume (0 à 100).
function MusiqueFond({ active, volume }) {
  const enCourse = useLocation().pathname === CHEMINS.course;

  return (
    <>
      <Musique source={musiqueMenu} joue={active && !enCourse} volume={volume} />
      <Musique source={musiqueCourse} joue={active && enCourse} volume={volume} />
    </>
  );
}

export default MusiqueFond;
