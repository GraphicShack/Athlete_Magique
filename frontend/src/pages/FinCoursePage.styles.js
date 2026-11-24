// Responsabilité : définir le style des blocs propres à cette page.
// Utilisé dans : FinCoursePage

import styled from 'styled-components';
import { Page } from '@/components/commun/ui/MiseEnPage.js';

// Sur ordi : remplit juste la hauteur de l'écran (moins les marges de l'app, 3rem), sans défiler.
// Le vide en bas (3rem) est pour les boutons Règles pis Paramètres.
export const Ecran = styled(Page)`
  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    gap: ${({ theme }) => theme.espace(2)};
    min-height: calc(100dvh - 3rem);
    padding-bottom: 3rem;

    @media (max-height: 760px) {
      padding-bottom: 0;
    }

    /* Titre un peu plus petit que sur les autres pages : il est à côté du logo. */
    h1 {
      font-size: clamp(2rem, 4vw, 3.25rem);
    }
  }
`;

// La phrase sous le titre ; cachée sur un ordi à petit écran (la place manque).
export const SousTitre = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) and (max-height: 780px) {
    display: none;
  }
`;

// Une colonne sur cell. Sur ordi, deux colonnes égales ; la rangée du haut prend toute la hauteur qui reste.
export const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(4)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    flex: 1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 1fr auto;
    padding-block: 0.85rem; /* juste la place du cadre des panneaux */
  }
`;

// La suite (prochaine course ou partie terminée), en dessous sur toute la largeur.
export const Suite = styled.div`
  grid-column: 1 / -1;

  /* Ordi très bas : pas de vide en dessous, donc on laisse plutôt la place des boutons à droite. */
  @media (min-width: ${({ theme }) => theme.ecrans.lg}) and (max-height: 760px) {
    margin-right: 11rem;
  }
`;
