// Responsabilité : définir le style des blocs propres à cette page.

import styled from 'styled-components';
import { Page } from '@/components/commun/ui/MiseEnPage.js';

// Le vide en bas (3rem) est pour les boutons Règles pis Paramètres.
export const Ecran = styled(Page)`
  @media ${({ theme }) => theme.medias.ordi} {
    gap: ${({ theme }) => theme.espace(2)};
    padding-bottom: 3rem;
  }
`;

// La phrase sous le titre.
export const SousTitre = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

// Une colonne sur cell. Sur ordi, deux colonnes égales ; la rangée du haut prend toute la hauteur qui reste.
export const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(4)};

  @media ${({ theme }) => theme.medias.ordi} {
    flex: 1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 1fr auto;
    padding-block: 0.85rem; /* juste la place du cadre des panneaux */
  }
`;

// La suite (prochaine course ou partie terminée), en dessous sur toute la largeur.
export const Suite = styled.div`
  grid-column: 1 / -1;
`;
