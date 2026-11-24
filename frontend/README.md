# Interface d'Athlète Magique

L'interface est **juste du visuel**. Elle ne calcule aucune règle et ne garde aucune donnée.
Elle affiche ce qu'elle reçoit, et elle dit au serveur sur quoi le joueur a cliqué.

```
logique du jeu ──┐
                 ├──► serveur ◄──► interface
base de données ─┘
```

L'interface parle seulement au serveur. Les 3 sections disent d'où vient l'information.

## Comment elle reçoit

Le serveur parle, l'interface écoute.

| Façon | Pour quoi |
|---|---|
| **En direct** (Socket.IO) | ce qui change pendant qu'on joue : le salon, la sélection, la course, la fin de course |
| **À la demande** (API REST) | ce qu'on lit une fois : le tableau d'honneur, les comptes |

Les règles :

1. **Toujours l'état au complet**, pas juste ce qui a changé. Un message manqué est réparé par le suivant.
2. **À la connexion** (ou reconnexion), le serveur renvoie tout.
3. **`idMoi` est dans `salon:etat`, `selection:etat` et `partie:etat`** : le serveur les envoie donc à chaque joueur séparément.
4. **L'interface anime, elle ne décide pas.** Si un pion passe de 12 à 16, elle le fait avancer ; si le nombre de lancers augmente, elle fait rouler le dé.
5. **Le résultat du dé n'est pas dévoilé** : pendant que mon dé roule, l'ancien écran reste (boutons, journal, pions).
6. **Les bots attendent environ 1 seconde** entre deux actions, côté serveur, pour laisser le temps aux animations.

| Marque | Veut dire |
|---|---|
| Branché | l'interface l'attend déjà du serveur (essayé avec un faux serveur) |
| À faire | pas encore branché (les noms de champs sont proposés) |

---

## 1. Logique du jeu

Tout ce qui se passe pendant une course.

### La course `partie:etat` (branché)

Envoyée après chaque action, au complet.

| Champ | Exemple | À l'écran |
|---|---|---|
| `idMoi` | `'j1'` | qui je suis |
| `idActif` | `'j1'` | à qui c'est le tour ; si ce n'est pas moi : « Patience ! » |
| `course` | `{ numero: 1, nombreCourses: 3 }` | « Course 1 sur 3 » |
| `rochers` | `[7, 13, 22]` | les cases Rocher |
| `joueurs` | une liste, dans l'ordre de jeu | les cartes et les pions |
| `tour` | voir plus bas | le panneau du tour |
| `duel` | voir plus bas, ou `null` | la fenêtre du duel |
| `journal` | une liste, du plus ancien au plus récent | le journal |

Chaque joueur de la course :

| Champ | Exemple | À l'écran |
|---|---|---|
| `id` | `'j1'` | |
| `numero` | `1` | sa couleur (sa place dans le salon, 1 à 4) |
| `nom` | `'Zoé'` | son nom |
| `bot` | `false` | « (bot) » |
| `idPersonnage` | `'magicien'` | son image, son nom, son pouvoir |
| `position` | `12` | sa case (0 = Départ, plus de 30 = arrivé) |
| `etat` | `'tombe'` | `null`, `'tombe'` (couché) ou `'elimine'` (retiré de la piste) |
| `points` | `3` | ses points |

### Le tour `partie:etat.tour` (branché)

| Champ | Exemple | À l'écran |
|---|---|---|
| `numero` | `5` | change à chaque tour |
| `etape` | `'lancer'` | les étapes 1 à 4 : `'debut'`, `'lancer'`, `'deplacement'`, `'fin'` |
| `de` | `{ valeur: 4, lancers: 1 }` | le dé (`{ valeur: null, lancers: 0 }` avant de lancer) |
| `cases` | `6` | « avancer de 6 », bonus compris (`null` avant) |
| `pouvoirActif` | `true` | montre l'encadré du pouvoir |
| `actions` | `[{ type: 'LANCER' }]` | les boutons, le premier en rouge |

Les actions que le serveur peut permettre :

| `type` | Bouton |
|---|---|
| `COMMENCER` | Commencer le tour |
| `HYPNOTISER`, `PASSER_POUVOIR` | Téléporter un personnage, Ne pas l'utiliser |
| `RASSEMBLER` | Rassembler les personnages |
| `LANCER` | Lancer le dé |
| `RELANCER` avec `relance`, `relancesMax` | Relancer le dé (1 sur 2) |
| `GARDER` | Garder le 4 |
| `DOUBLER` | Doubler et trébucher |
| `ECHANGER` | Échanger de place |
| `AVANCER` | Confirmer : avancer de 6 (« Avancer de 6 » si un pouvoir est actif) |
| `FINIR_TOUR` | Fin du tour |

Quand le joueur clique, l'interface envoie `tour:action` avec `{ type }`, ex. `{ type: 'LANCER' }`. Le serveur tire le dé. Une action ou une étape inconnue affiche son nom, sans planter.

Encore à faire à l'écran :

| Information | Exemple proposé | |
|---|---|---|
| choisir une cible (Hypnotiste, Flip Flop) | `ciblesPossibles: ['j2', 'j3']` | À faire |
| 2 personnages par joueur, à 2 joueurs | | À faire |

### Le duel `partie:etat.duel` (branché)

`null` s'il n'y a pas de duel. Possible pendant le tour de n'importe qui.

| Champ | Exemple | À l'écran |
|---|---|---|
| `id` | `'d1'` | différent pour chaque duel |
| `idDuelliste` | `'j1'` | celui qui décide |
| `idCible` | `'j2'` | son adversaire |
| `valeurs` | `{ j1: 4, j2: 2 }` | les 2 dés (`null` pendant la question) |
| `gagnant` | `'j1'` | l'`id` du gagnant (`null` pendant la question) |

1. Le serveur envoie le duel avec `valeurs: null` : seul le Duelliste voit la question. Les boutons du tour sont grisés.
2. L'interface envoie `duel:repondre` avec `{ id, accepter: true }` (ou `false`).
3. Si c'est non, le serveur envoie `duel: null`.
4. Si c'est oui, le serveur lance les 2 dés et envoie `valeurs` et `gagnant`, sans bouger les pions. Tout le monde voit les dés.
5. Environ 5 secondes plus tard, il envoie `duel: null`, la nouvelle position du gagnant et l'événement `DUEL` du journal.

S'il y a plusieurs adversaires possibles, le serveur envoie un duel à la fois.

### Le journal `partie:etat.journal` (branché)

On envoie des données, l'interface écrit la phrase.

| Champ | Exemple | Sert à |
|---|---|---|
| `id` | `'e4'` | |
| `tour` | `4` | « Tour 4 » |
| `course`, `etape` | `1`, `'fin'` | pas affichés pour l'instant |
| `type` | `'TREBUCHE'` | choisir la phrase (liste plus bas) |
| `acteur` | `'j3'` | qui (`null` si c'est la course) |
| `cible` | `'j1'` | l'autre joueur, ou `null` |
| `cause` | `{ genre: 'case', id: 'rocher' }` | « (rocher) » ; aussi `'etoile'`, ou `null` |
| | `{ genre: 'pouvoir', id: 'lievre' }` | « (pouvoir : Lièvre) » |
| `details` | `{ case: 13 }` | les chiffres de la phrase |

<details>
<summary>Les types d'événements et leurs détails</summary>

| `type` | `details` |
|---|---|
| `COURSE_DEBUT`, `COURSE_FIN` | `{ numero }` |
| `TOUR_DEBUT`, `TOUR_FIN`, `RELEVE`, `HYPNOSE`, `RASSEMBLEMENT`, `ECHANGE_DEMANDE` | `{}` |
| `DE_LANCE`, `DE_GARDE` | `{ valeur }` |
| `DE_RELANCE` | `{ valeur, relance, maximum }` |
| `DEPLACEMENT`, `RECUL` | `{ a, cases }` (`de`, la case de départ, n'est pas affichée) |
| `DEPLACEMENT_DOUBLE` | `{ cases }` |
| `TELEPORTATION` | `{ a }` |
| `TREBUCHE` | `{ case }` |
| `ECHANGE`, `ELIMINE` (avec `cible`) | `{}` |
| `DUEL` (avec `cible`) | `{ valeurActeur, valeurCible, gagnant }` (`'acteur'` ou `'cible'`) |
| `POINTS` | `{ points, raison }` |
| `ARRIVEE` | `{ rang }` |

Un type inconnu ne fait rien planter.

</details>

### La fin de course `course:fin` (branché)

| Champ | Exemple | À l'écran |
|---|---|---|
| `numero`, `nombreCourses` | `1`, `3` | « Course 1 sur 3 terminée » |
| `joueurs` | une liste, dans l'ordre du classement | les 2 tableaux |
| `ordreChoix` | `['Alec', 'Zoé']` | qui choisira en premier (`[]` à la fin) |

Chaque joueur de la fin de course :

| Champ | Exemple | À l'écran |
|---|---|---|
| `id`, `nom`, `bot`, `idPersonnage` | comme plus haut | son nom, son personnage |
| `numero` | `2` | sa couleur (sa place dans le salon, 1 à 4) |
| `place` | `1` | 1, 2, ou `null` s'il n'a pas fini |
| `pointsCourse` | `3` | points de sa place, cette course |
| `etoiles` | `1` | points des cases Étoile, cette course |
| `victoires` | `1` | ses 1res places dans la partie |
| `total` | `4` | ses points dans la partie |
| `rang` | `1` | son rang (pareil si égalité) |

---

## 2. Serveur

Qui est là, qui peut faire quoi, et les réponses aux clics.

### Pour se brancher

Côté serveur, permettre l'adresse de l'interface (CORS).

Pour lancer l'interface : `npm install`, puis `npm run dev`

### La réponse à chaque clic (branché)

Le serveur répond à chaque demande en moins de 5 secondes.

| Réponse | Forme | À l'écran |
|---|---|---|
| accepté | `callback()` | on continue |
| refusé | `callback({ erreur: { code, message } })` | le `message`, tel quel |
| rien | | « Le serveur ne répond pas. » |

### Le salon `salon:etat` (branché)

Envoyé après chaque changement, au complet.

| Champ | Exemple | À l'écran |
|---|---|---|
| `code` | `'KZ4P7Q'` | le code à donner aux amis |
| `placesMax` | `4` | 2, 3 ou 4 places |
| `idMoi` | `'j2'` | qui je suis (différent pour chaque joueur) |
| `idHote` | `'j1'` | l'hôte a plus de boutons |
| `statut` | `'attente'` | la page de tout le monde : `'attente'`, `'selection'`, `'course'` ou `'fin'` |
| `joueurs` | une liste de `{ id, nom, hote, bot, pret }` | les joueurs, « Hôte », « Bot », « Prêt » |

L'interface envoie :

| Envoyé | Données | |
|---|---|---|
| `salon:creer` | `{ pseudo }` | Branché |
| `salon:rejoindre` | `{ code, pseudo }` | Branché |
| `salon:places` | `{ placesMax }` | Branché |
| `salon:ajouterBot` | `{}` | Branché |
| `salon:retirer` | `{ idJoueur }` | Branché |
| `salon:lancer` | `{}` | Branché |
| `course:suivante` | `{}` | Branché |
| `salon:pret` | `{ pret: true }` | À faire |
| quitter le salon | | À faire |

### La sélection des personnages `selection:etat` (branché)

Envoyée avant chaque course, puis après chaque choix, au complet.

| Champ | Exemple | À l'écran |
|---|---|---|
| `idMoi` | `'j1'` | qui je suis |
| `idChoisit` | `'j2'` | qui choisit maintenant (`null` = tout le monde a choisi) |
| `course` | `{ numero: 1, nombreCourses: 3 }` | « Course 1 sur 3 » |
| `personnagesTires` | `['banana', 'lievre']` | les cartes à choisir (2 de plus que nécessaire) |
| `joueurs` | une liste de `{ id, nom, bot }` | l'ordre de choix |
| `choix` | une liste de `{ idJoueur, idPersonnage }` | « Pris par Angie », ou « Choisi » si c'est moi |

L'interface envoie `selection:choisir` avec `{ idPersonnage }`. Le serveur refuse si ce n'est pas mon tour ou si le personnage est pris.

### Les changements de page (branché)

C'est le `statut` du salon qui décide. Une seule règle : si le statut a une page et que je n'y suis pas, l'interface m'y amène. Un message manqué se répare donc tout seul.

| `statut` | Page | Le serveur envoie juste avant |
|---|---|---|
| `'attente'` | on reste où on est | |
| `'selection'` | choix des personnages | `selection:etat` |
| `'course'` | la course | `partie:etat` |
| `'fin'` | fin de course | `course:fin` |

### Les connexions

| Information | À l'écran | |
|---|---|---|
| je reçois de nouveau l'état au complet | l'écran reprend où j'étais | Branché |
| dire au serveur qui je suis quand je reviens | rien : l'interface n'envoie pas encore d'identifiant | À faire |
| un joueur s'est déconnecté | un message, ou un bot le remplace | À faire |

---

## 3. Base de données

Ce qui reste après une partie. L'interface le demande au serveur, jamais directement à la base.

### Le tableau d'honneur `GET /api/honneur?filtre=tous` (branché)

`filtre` : `tous`, `comptes` ou `invites`. Une liste, du meilleur score au moins bon.

| Champ | Exemple | À l'écran |
|---|---|---|
| `id` | `1` | |
| `rang` | `1` | le rang (pareil si égalité, recompté pour chaque filtre) |
| `pseudo` | `'Capucine'` | le nom |
| `type` | `'compte'` | « Compte » ou « Invité » (`'compte'` ou `'invite'`) |
| `score` | `12` | les points |
| `date` | `'2026-10-09T18:00:00Z'` | « 9 oct. » |
| `vous` | `true` | ma ligne en évidence, « (vous) » |

`vous` : l'interface ne dit pas encore au serveur qui demande la liste. À décider avec l'équipe.

### Les comptes (à faire)

| Envoyé (proposé) | Données | Réponse attendue |
|---|---|---|
| `POST /api/comptes` | `{ courriel, motDePasse, pseudo }` | `{ id, pseudo }` |
| `POST /api/connexion` | `{ courriel, motDePasse }` | `{ jeton, pseudo }` |

### Enregistrer un score

Rien à recevoir : le serveur l'enregistre lui-même à la fin de la 3e course. Le pseudo vient de `salon:creer`, de `salon:rejoindre` ou du compte.

### Ce qui n'est pas dans la base

Les 10 personnages (textes et images), la piste et le barème de points sont déjà dans l'interface.
Les personnages sont envoyés par leur id : `banana`, `lievre`, `centaure`, `flipflop`, `hypnotiste`, `partyanimal`, `magicien`, `scientifique`, `bouche`, `duelliste`.

---

Des exemples sont dans `src/data/exemples/`.
