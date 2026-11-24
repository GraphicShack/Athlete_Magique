// Responsabilité : la page qui va avec le statut du salon.

import CHEMINS from '@/chemins.js';

const PAGES = { selection: CHEMINS.selection, course: CHEMINS.course, fin: CHEMINS.finCourse };

// 'selection' → '/selection'. Les autres statuts ont pas de page à suivre : undefined.
export const pageDuStatut = (statut) => PAGES[statut];
