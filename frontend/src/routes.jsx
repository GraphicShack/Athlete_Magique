import { createBrowserRouter } from 'react-router-dom';
import CHEMINS from './chemins.js';
import App from './App.jsx';
import AccueilPage from './pages/AccueilPage.jsx';
import ConfigurationPage from './pages/ConfigurationPage.jsx';
import SelectionPage from './pages/SelectionPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import ClassementPage from './pages/ClassementPage.jsx';
import ReglesPage from './pages/ReglesPage.jsx';

/**
 * Association de chaque adresse à sa page.
 * Pour ajouter une page : son adresse dans chemins.js, puis une ligne ici.
 */
const PAGES = [
  { chemin: CHEMINS.accueil, Page: AccueilPage },
  { chemin: CHEMINS.configuration, Page: ConfigurationPage },
  { chemin: CHEMINS.selection, Page: SelectionPage },
  { chemin: CHEMINS.course, Page: CoursePage },
  { chemin: CHEMINS.classement, Page: ClassementPage },
  { chemin: CHEMINS.regles, Page: ReglesPage },
];

/*
 * Le routeur de l'application, utilisé par main.jsx.
 * App sert de « cadre » commun : chaque page s'affiche à l'intérieur (à l'endroit de son <Outlet />).
 * Ce type de routeur est nécessaire pour les transitions entre pages (option viewTransition des liens).
 */
const routeur = createBrowserRouter([
  {
    element: <App />,
    children: PAGES.map(({ chemin, Page }) => ({ path: chemin, element: <Page /> })),
  },
]);

export default routeur;
