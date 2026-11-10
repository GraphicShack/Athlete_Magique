import { Outlet } from 'react-router-dom';
import AccesRegles from './components/regles/AccesRegles.jsx';

/**
 * Cadre commun à toutes les pages.
 * La page demandée s'affiche à l'endroit de <Outlet /> (voir routes.jsx).
 */
function App() {
  return (
    // La page occupe toute la hauteur de la fenêtre et peut remplir l'espace restant.
    <main className="container-xxl py-4 min-vh-100 d-flex flex-column">
      <Outlet />

      {/* Bouton « Règles » présent sur toutes les pages */}
      <AccesRegles />
    </main>
  );
}

export default App;
