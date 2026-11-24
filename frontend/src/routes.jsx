// Responsabilité : la liste des pages pis leurs adresses (le routeur).
// Utilisé dans : main

import { createBrowserRouter } from 'react-router-dom';
import CHEMINS from './chemins.js';
import App from './App.jsx';
import AccueilPage from './pages/AccueilPage.jsx';
import ConfigurationPage from './pages/ConfigurationPage.jsx';
import SelectionPage from './pages/SelectionPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import FinCoursePage from './pages/FinCoursePage.jsx';
import ClassementPage from './pages/ClassementPage.jsx';
import ReglesPage from './pages/ReglesPage.jsx';

// Une ligne par page : son adresse pis le composant à afficher.
const PAGES = [
  { chemin: CHEMINS.accueil, Page: AccueilPage },
  { chemin: CHEMINS.configuration, Page: ConfigurationPage },
  { chemin: CHEMINS.selection, Page: SelectionPage },
  { chemin: CHEMINS.course, Page: CoursePage },
  { chemin: CHEMINS.finCourse, Page: FinCoursePage },
  { chemin: CHEMINS.classement, Page: ClassementPage },
  { chemin: CHEMINS.regles, Page: ReglesPage },
];

// App est la route « parente » : chaque page devient l'une de ses « enfants ».
const routeur = createBrowserRouter([
  {
    element: <App />,
    children: PAGES.map(({ chemin, Page }) => ({ path: chemin, element: <Page /> })),
  },
]);

export default routeur;
