/*
 * routes.jsx : le routeur de l'application (utilisé par main.jsx).
 *
 * Responsabilités :
 *   - associer chaque adresse (chemins.js) à sa page ;
 *   - afficher chaque page à l'intérieur du cadre commun App.
 *
 * Pour ajouter une page : son adresse dans chemins.js, puis une ligne dans PAGES.
 */
import { createBrowserRouter } from 'react-router-dom';
import CHEMINS from './chemins.js';
import App from './App.jsx';
import AccueilPage from './pages/AccueilPage.jsx';
import ConfigurationPage from './pages/ConfigurationPage.jsx';
import SelectionPage from './pages/SelectionPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import ClassementPage from './pages/ClassementPage.jsx';
import ReglesPage from './pages/ReglesPage.jsx';

// Une ligne par page : son adresse et le composant à afficher.
const PAGES = [
  { chemin: CHEMINS.accueil, Page: AccueilPage },
  { chemin: CHEMINS.configuration, Page: ConfigurationPage },
  { chemin: CHEMINS.selection, Page: SelectionPage },
  { chemin: CHEMINS.course, Page: CoursePage },
  { chemin: CHEMINS.classement, Page: ClassementPage },
  { chemin: CHEMINS.regles, Page: ReglesPage },
];

// App est la route « parente » : chaque page devient l'une de ses « enfants ».
// Ce type de routeur (createBrowserRouter) est nécessaire pour la transition « rideau »
// entre les pages (option viewTransition des liens).
const routeur = createBrowserRouter([
  {
    element: <App />,
    children: PAGES.map(({ chemin, Page }) => ({ path: chemin, element: <Page /> })),
  },
]);

export default routeur;
