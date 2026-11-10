import { Routes, Route } from 'react-router-dom';
import PAGES from './routes.js';

function App() {
  return (
    // La page occupe toute la hauteur de la fenêtre et peut remplir l'espace restant.
    <main className="container-xxl py-4 min-vh-100 d-flex flex-column">
      <Routes>
        {PAGES.map(({ chemin, Page }) => (
          <Route key={chemin} path={chemin} element={<Page />} />
        ))}
      </Routes>
    </main>
  );
}

export default App;
