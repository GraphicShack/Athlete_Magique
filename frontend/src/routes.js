import CHEMINS from './chemins.js';
import AccueilPage from './pages/AccueilPage.jsx';
import ConfigurationPage from './pages/ConfigurationPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import ClassementPage from './pages/ClassementPage.jsx';
import ReglesPage from './pages/ReglesPage.jsx';

/**
 * Association de chaque adresse à sa page, utilisée par App.jsx.
 * Pour ajouter une page : son adresse dans chemins.js, puis une ligne ici.
 */
const PAGES = [
  { chemin: CHEMINS.accueil, Page: AccueilPage },
  { chemin: CHEMINS.configuration, Page: ConfigurationPage },
  { chemin: CHEMINS.course, Page: CoursePage },
  { chemin: CHEMINS.classement, Page: ClassementPage },
  { chemin: CHEMINS.regles, Page: ReglesPage },
];

export default PAGES;
