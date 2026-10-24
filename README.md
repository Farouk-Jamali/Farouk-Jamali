# Portfolio de Farouk Jamali

CV web : formation, expériences, compétences et projets en science des données. Étudiant en master MAS à l'Université Rennes 2.

## Technique

- React 19 : la page est pré-rendue en HTML à la construction, puis React reprend la main dans le navigateur.
- Tailwind CSS 4, icônes Lucide, police Inter.
- Site statique publié par GitHub Pages depuis le dossier `docs/` : aucun formulaire, aucune base de données, aucune clé d'API.
- Politique de sécurité (CSP) stricte : le navigateur ne charge que les fichiers du site et la police Inter.

## Organisation

| Fichier ou dossier | Contenu |
|---|---|
| `src/donnees.js` | Tout le texte du site : présentation, formation, expériences, compétences, projets, contact |
| `src/App.jsx` | Les composants React |
| `src/styles.css` | Couleurs, police et animations |
| `public/` | Photo et icône de l'onglet |
| `build.mjs` | Construction du site dans `docs/` |
| `docs/` | Le site publié, généré par `npm run build` |

## Modifier le site

Avec Node.js 20 ou plus récent :

```
npm install
npm run build
```

Après chaque modification dans `src/`, relancer `npm run build`, puis faire un commit et un push : GitHub Pages met le site à jour en une ou deux minutes.
